import React, { Component } from 'react';
import Swipeable from 'react-native-swipeable';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native';

import Checkbox from './Checkbox';
import IconButton from './IconButton';

class ListOfTodos extends Component {
    toggleComplete(item) {
        const newItem = {...item, isComplete: !item.isComplete };

        this.props.onItemUpdate(newItem);
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString(
            'en-CA',
            { month: 'short', day: 'numeric' },
        );
    }

    renderRow = ({ item }) => {
        const rightButtons = [
            <IconButton
                color="white"
                icon="trash-2"
                iconComponent={Feather}
                style={styles.rowButton}
                onPress={() => this.props.onItemDelete(item)}
            />,
        ];

        return (
            <Swipeable
                style={styles.row}
                rightButtons={rightButtons}
                contentContainerStyle={styles.rowInner}
            >
                <Checkbox
                    style={styles.checkox}
                    checked={item.isComplete}
                    onToggle={() => this.toggleComplete(item)}
                />

                <Text style={styles.text}>{item.text}</Text>

                <View style={styles.dueDateContainer}>
                    {!!item.due &&
                        <View style={styles.dueDateInner}>
                            <MaterialCommunityIcons
                                size={18}
                                color="#555"
                                name="calendar-clock"
                            />

                            <Text style={styles.dueDateText}>
                                {this.formatDate(item.due)}
                            </Text>
                        </View>
                    }
                </View>
            </Swipeable>
        );
    }

    render() {
        return (
            <FlatList
                data={this.props.todos}
                style={styles.flatList}
                renderItem={this.renderRow}
            />
        );
    }
}

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    },

    row: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    rowInner: {
        flexDirection: 'row',
        // alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 18,
        paddingHorizontal: 20,
    },

    checkox: {
        width: 40,
        // borderColor: 'red',
        // borderWidth: 1,
    },

    rowButton: {
        flex: 1,
        width: 80,
        backgroundColor: Platform.OS === 'ios' ? '#FF3824' : '#F44336',
    },

    text: {
        flex: 1,
        fontSize: 18,
        color: '#333',
        paddingTop: 8,
    },

    dueDateContainer: {
        width: 80,
        height: 30,
        paddingTop: 10,
    },

    dueDateInner: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    dueDateText: {
        marginStart: 4,
        fontSize: 12,
        fontWeight: '100',
        color: '#555',
    },
});

export default ListOfTodos;

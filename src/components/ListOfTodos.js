import React, { Component } from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native';

import Checkbox from './Checkbox';
import i18n from '../services/i18n';
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
        return (
            <View style={styles.row}>
                <Checkbox
                    style={styles.checkox}
                    checked={item.isComplete}
                    onToggle={() => this.toggleComplete(item)}
                />

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >
                    {item.text}
                </Text>

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

                <IconButton
                    icon="trash-2"
                    iconComponent={Feather}
                    style={styles.rowButton}
                    onPress={() => this.props.onItemDelete(item)}
                    color={Platform.OS === 'ios' ? '#FF3824' : '#F44336'}
                />
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    checkox: {
        width: 40,
    },

    rowButton: {
        borderColor: 'orange',
        borderWidth: 1,
    },

    text: {
        flex: 1,
        fontSize: 18,
        color: '#333',
        textAlign: 'left',
    },

    dueDateContainer: {
        width: 80,
        height: 30,
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

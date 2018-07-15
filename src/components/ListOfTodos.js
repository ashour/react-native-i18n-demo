import React, { Component } from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native';

import Checkbox from './Checkbox';
import IconButton from './IconButton';
import i18n, { t } from '../services/i18n';

class ListOfTodos extends Component {
    toggleComplete(item) {
        const newItem = {...item, isComplete: !item.isComplete };

        this.props.onItemUpdate(newItem);
    }

    renderRow = ({ item }) => {
        return (
            <View style={styles.row}>
                <Checkbox
                    style={styles.checkbox}
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
                                {formatDate(item.due)}
                            </Text>
                        </View>
                    }
                </View>

                <IconButton
                    icon="trash-2"
                    flipForRTL={false}
                    iconComponent={Feather}
                    style={styles.deleteButton}
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

/**
 * @param {Date} date
 * @returns {String}
 */
function formatDate(date) {
    if (date.getYear() === new Date().getYear()) {
        return t("ListOfTodos:dueDateShort", { date });
    }

    return t("ListOfTodos:dueDateFull", { date });
}

const styles = StyleSheet.create({
    flatList: {
        width: '100%',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        paddingStart: 20,
        paddingEnd: 10,
    },

    checkbox: {
        width: 40,
        ...i18n.select({
            rtl: { marginBottom: 4 },
        }),
    },

    deleteButton: {
        ...i18n.select({
            ltr: { marginBottom: 4 },
            rtl: { marginBottom: 6 },
        }),
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

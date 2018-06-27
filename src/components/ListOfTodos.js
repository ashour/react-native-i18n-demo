import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import Checkbox from './Checkbox';

class ListOfTodos extends Component {
    toggleComplete(item) {
        const newItem = {...item, isComplete: !item.isComplete };

        this.props.onItemUpdate(newItem);
    }

    renderRow = ({ item }) => {
        return (
            <View style={styles.row}>
                <Checkbox
                    style={styles.checkox}
                    checked={item.isComplete}
                    onToggle={() => this.toggleComplete(item)}
                />

                <Text style={styles.text}>{item.text}</Text>
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
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    checkox: {
        marginEnd: 4,
    },

    text: {
        fontSize: 18,
        color: '#333',
    }
});

export default ListOfTodos;

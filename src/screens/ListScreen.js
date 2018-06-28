import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import { t } from '../services/i18n';
import ListRepo from '../repos/ListRepo';
import ListHeaderStart from './ListHeaderStart';
import AddButton from '../components/AddButton';
import ListOfTodos from '../components/ListOfTodos';

class ListScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: t(`lists:${navigation.state.routeName}`),
            headerLeft: <ListHeaderStart navigation={navigation} />,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            isLoading: true,
        };

        this.didFocusSubscription = props.navigation.addListener(
            'willFocus',
            () => this.loadTodosWithIndicator(),
        );
    }

    componentWillUnmount() {
        this.didFocusSubscription.remove();
    }

    async loadTodosWithIndicator() {
        this.setState({ isLoading: true });

        const listName = this.props.navigation.state.routeName;

        const todos = await this.getKeyedTodosArray();

        this.setState({ todos, isLoading: false });
    }

    async getKeyedTodosArray() {
        const listName = this.props.navigation.state.routeName;

        return this.transformToKeyedArray(
            await ListRepo.with(listName).getTodos()
        );
    }

    refreshTodos = async () => {
        const todos = await this.getKeyedTodosArray();

        this.setState({ todos });
    }

    /**
     * @param {Object<string, { id: string }} todos
     * @return {Array<Object>}
     */
    transformToKeyedArray(todos) {
        return Object.keys(todos)
            .reverse().map(id => ({ ...todos[id], key: id }));
    }

    updateItem = async (item) => {
        await ListRepo.updateTodo(item);

        this.refreshTodos();
    }

    deleteItem = async (item) => {
        await ListRepo.deleteTodo(item);

        this.refreshTodos();
    }

    goToAddTodoScreen = () => {
        this.props.navigation.navigate('AddTodoScreen', {
            listName: this.props.navigation.state.routeName,
        });
    }

    renderContent() {
        if (this.state.todos.length === 0) {
            return (
                <Text style={styles.emptyListText}>
                    {t('ListScreen:empty')}
                </Text>
            );
        }

        return (
            <ListOfTodos
                todos={this.state.todos}
                onItemUpdate={this.updateItem}
                onItemDelete={this.deleteItem}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading
                    ?
                    <ActivityIndicator />
                    :
                    this.renderContent()
                }

                <AddButton
                    style={styles.addButton}
                    onPress={this.goToAddTodoScreen}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    emptyListText: {
        marginHorizontal: 30,
        fontSize: 16,
    },

    addButton: {
        position: 'absolute',
        bottom: 30,
        end: 30,
    },
});

export default ListScreen;

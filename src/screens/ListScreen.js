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

        const listName = props.navigation.state.routeName;

        this.repo = new ListRepo(listName);

        this.willFocusSubscription = props.navigation.addListener(
            'willFocus',
            () => this.loadTodosWithIndicator(),
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    async loadTodosWithIndicator() {
        this.setState({ isLoading: true });

        const todos = await this.getKeyedTodosArray();

        this.setState({ todos, isLoading: false });
    }

    async getKeyedTodosArray() {
        return this.transformToKeyedArray(
            await this.repo.getTodos()
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
        await this.repo.updateTodo(item);

        this.refreshTodos();
    }

    deleteItem = async (item) => {
        await this.repo.deleteTodo(item);

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
        fontSize: 16,
        marginHorizontal: 30,
    },

    addButton: {
        position: 'absolute',
        bottom: 30,
        end: 30,
    },
});

export default ListScreen;

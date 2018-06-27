import React, { Component } from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, Text } from 'react-native';

import ListHeaderLeft from './ListHeaderLeft';
import AddButton from '../components/AddButton';
import ListRepo from '../repos/ListRepo';

class ListScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.routeName,
        headerLeft: <ListHeaderLeft navigation={navigation} />,
    });

    constructor(props) {
        super(props);

        this.state = {
            todos: {},
            isLoading: true,
        };

        this.didFocusSubscription = props.navigation.addListener('willFocus', () => {
            this.fetchTodos();
        });
    }

    componentWillUnmount() {
        this.didFocusSubscription.remove();
    }

    async fetchTodos() {
        const todos = await ListRepo
            .with(this.props.navigation.state.routeName)
            .getTodos();

        this.setState({ todos, isLoading: false });
    }

    goToAddTodoScreen = () => {
        this.props.navigation.navigate('AddTodoScreen', {
            listName: this.props.navigation.state.routeName,
        });
    }

    renderTodos() {
        return Object.keys(this.state.todos).map(id => (
            <Text key={id}>{this.state.todos[id].text}</Text>
        ));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading
                    ?
                    <ActivityIndicator />
                    :
                    this.renderTodos()
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

    addButton: {
        position: 'absolute',
        bottom: 30,
        end: 30,
    },
});

export default ListScreen;

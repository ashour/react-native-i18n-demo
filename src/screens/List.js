import React, { Component } from 'react';
import { Button, View, StyleSheet } from 'react-native';

import ListHeaderLeft from './ListHeaderLeft';

class List extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.routeName,
        headerLeft: <ListHeaderLeft navigation={navigation} />,
    });

    addTodo = () => {
        this.props.navigation.navigate('AddTodo');
    }

    goToLists = () => {
        this.props.navigation.navigate('Lists');
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Add To-do" onPress={this.addTodo} />
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

    title: {
        fontSize: 20,
    },
});

export default List;

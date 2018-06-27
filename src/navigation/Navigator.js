import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import List from '../screens/List';
import AddTodo from '../screens/AddTodo';
import DrawerContent from './DrawerContent';

class Navigator extends Component {
    getListNavItems() {
        return this.props.lists.reduce((items, name) => {
            const stackNavigator = createStackNavigator({ [name]: List, AddTodo });

            return { ...items, [name]: stackNavigator };
        }, {});
    }

    render() {
        return React.createElement(createDrawerNavigator(this.getListNavItems(), {
            contentComponent: DrawerContent,
        }));
    }
}

export default Navigator;

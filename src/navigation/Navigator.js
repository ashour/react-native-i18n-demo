import React, { Component } from 'react';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import DrawerContent from './DrawerContent';
import ListScreen from '../screens/ListScreen';
import AddTodoScreen from '../screens/AddTodoScreen';

class Navigator extends Component {
    getListNavItems() {
        return this.props.lists.reduce((items, name) => {
            const stackNavigator = createStackNavigator({ [name]: ListScreen, AddTodoScreen });

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

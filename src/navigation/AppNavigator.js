import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import lists from '../config/lists';
import i18n, { t } from '../services/i18n';
import DrawerContent from './DrawerContent';
import ListScreen from '../screens/ListScreen';
import AddTodoScreen from '../screens/AddTodoScreen';

function getListNavItems() {
    return lists.reduce((items, name) => {
        const stackNavigator = createStackNavigator({
            [name]: ListScreen,
            AddTodoScreen,
        });

        stackNavigator.navigationOptions = ({ navigation }) => ({
            title: t(`lists:${navigation.state.routeName}`),
        });

        return { ...items, [name]: stackNavigator };
    }, {});
};

const AppNavigator = createDrawerNavigator(
    getListNavItems(),
    {
        contentComponent: DrawerContent,
        drawerPosition: i18n.isRTL ? 'right' : 'left',
    },
);

export default AppNavigator;

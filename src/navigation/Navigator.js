import {
    createDrawerNavigator,
    createStackNavigator,
} from 'react-navigation';
import React, { Component } from 'react';

import { t } from '../services/i18n';
import DrawerContent from './DrawerContent';
import ListScreen from '../screens/ListScreen';
import AddTodoScreen from '../screens/AddTodoScreen';

class Navigator extends Component {
    getListNavItems() {
        return this.props.lists.reduce((items, name) => {
            const stackNavigator = createStackNavigator({
                [name]: ListScreen,
                AddTodoScreen,
            });

            stackNavigator.navigationOptions = ({ navigation }) => ({
                title: t(`lists:${navigation.state.routeName}`),
            });

            return { ...items, [name]: stackNavigator };
        }, {});
    }

    render() {
        const RootNavigator = createDrawerNavigator(
            this.getListNavItems(),
            { contentComponent: DrawerContent },
        );

        return <RootNavigator />;
    }
}

export default Navigator;

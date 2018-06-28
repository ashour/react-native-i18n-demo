import React from 'react';
import { AsyncStorage, I18nManager } from 'react-native';

import Navigator from './src/navigation/Navigator';

export default class App extends React.Component {
    state = {
        lists: ['To-do', 'Groceries', 'Learning', 'Reading'],
        activeList: 'To-do',
    }

    componentDidMount() {
        // AsyncStorage.removeItem('To-do');
        I18nManager.forceRTL(false);
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({ lists: [...this.state.lists, 'Learning'] });
    //     }, 5000);
    // }

    render() { return <Navigator lists={this.state.lists} />; }
}

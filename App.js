import React from 'react';

import Navigator from './src/navigation/Navigator';

export default class App extends React.Component {
    state = {
        lists: ['To-do', 'Foo'],
        activeList: 'To-do',
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({ lists: [...this.state.lists, 'Learning'] });
    //     }, 5000);
    // }

    render() { return <Navigator lists={this.state.lists} />; }
}

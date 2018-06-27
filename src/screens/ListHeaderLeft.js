import React, { Component } from 'react';
import { Button } from 'react-native';

class ListHeaderLeft extends Component {
    openListsDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return <Button onPress={this.openListsDrawer} title="Lists" />;
    }
}

export default ListHeaderLeft;

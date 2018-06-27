import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import IconButton from '../components/IconButton';

class ListHeaderStart extends Component {
    openListsDrawer = () => {
        this.props.navigation.openDrawer();
    }

    render() {
        return (
            <IconButton
                style={styles.button}
                icon="format-list-bulleted"
                onPress={this.openListsDrawer}
            />
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginStart: 20,
    },
});

export default ListHeaderStart;

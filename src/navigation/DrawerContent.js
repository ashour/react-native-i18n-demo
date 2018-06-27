import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';

class DrawerContent extends React.Component {
    onItemPress = ({ route }) => {
        this.props.navigation.navigate(route.key);
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <Text style={styles.header}>Lists</Text>

                    <DrawerItems {...this.props} onItemPress={this.onItemPress} />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
    },
    header: {
        fontSize: 18,
        fontWeight: '100',
        marginStart: 8,
        marginBottom: 8,
    }
});

export default DrawerContent;
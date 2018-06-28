import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';

import { t } from '../services/i18n';

class DrawerContent extends Component {
    onItemPress = ({ route }) => {
        this.props.navigation.navigate(route.key);
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView
                    style={styles.container}
                    forceInset={{ top: 'always', horizontal: 'never' }}
                >
                    <Text style={styles.header}>{t('lists')}</Text>

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
        textAlign: 'left',
        marginStart: 16,
        marginBottom: 8,
    }
});

export default DrawerContent;
import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';

import { t } from '../services/i18n';

const DrawerContent = (props) => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
        >
            <Text style={styles.header}>{t('lists')}</Text>

            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);


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
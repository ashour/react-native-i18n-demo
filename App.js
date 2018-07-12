import Expo from 'expo';
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    I18nManager as RNI18nManager,
} from 'react-native';

import i18n from './src/services/i18n';
import Navigator from './src/navigation/Navigator';

export default class App extends Component {
    state = {
        isI18nInitialized: false,
        lists: ['to-do', 'groceries', 'learning', 'reading'],
    }

    componentDidMount() {
        i18n.init()
            .then(() => {
                const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';

                // RN doesn't always correctly identify native
                // locale directionality, so we force it here.
                if (i18n.dir !== RNDir) {
                    const isLocaleRTL = i18n.dir === 'RTL';

                    RNI18nManager.forceRTL(isLocaleRTL);

                    // RN won't set the layout direction if we
                    // don't restart the app's JavaScript.
                    Expo.Updates.reloadFromCache();
                }

                this.setState({ isI18nInitialized: true });
            })
            .catch((error) => console.warn(error));
    }

    render() {
        if (this.state.isI18nInitialized) {
            return <Navigator lists={this.state.lists} />;
        }

        return (
            <View style={styles.loadingScreen}>
                <ActivityIndicator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

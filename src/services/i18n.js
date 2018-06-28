import i18next from 'i18next';
import { I18nManager as RNI18nManager } from 'react-native';

import * as config from '../config/i18n';
import languageDetector from './util/language-detector';
import translationLoader from './util/translation-loader';

const i18n = {
    init: () => {
        return new Promise((resolve, reject) => {
            i18next
                .use(languageDetector)
                .use(translationLoader)
                .init({
                    fallbackLng: config.fallback,
                    ns: config.namespaces,
                    defaultNS: config.defaultNamespace,
                }, (error) => {
                    if (error) { return reject(error); }

                    return resolve();
                });
        });
    },

    t: (key) => i18next.t(key),

    get locale() { return i18next.language; },

    get dir() {
        return config.supportedLocales[this.locale].dir || 'LTR';
    },

    /**
     * @type {boolean}
     */
    get isRTL() {
        return RNI18nManager.isRTL;
    },

    select(map) {
        const key = this.isRTL ? 'rtl' : 'ltr';

        return map[key];
    }
};

export const t = i18n.t;

export default i18n;

import moment from 'moment';

import * as config from '../../config/i18n';

const date = {
    /**
     * Load library, setting its initial locale
     *
     * @param {string} locale
     * @return Promise
     */
    init(locale) {
        const language = config.supportedLocales[locale] ? locale : config.fallback;
        return new Promise((resolve, reject) => {
            config
                .supportedLocales[language]
                .momentLocaleLoader()
                .then(() => {
                    moment.locale(locale);

                    return resolve();
                })
                .catch(err => reject(err));
        })
    },

    /**
     * @param {Date} date
     * @param {string} format
     * @return {string}
     */
    format(date, format) {
        return moment(date).format(format);
    }
}

export default date;
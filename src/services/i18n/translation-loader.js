import * as config from '../../config/i18n';

const translationLoader = {
    type: 'backend',
    init: () => { },
    read: function (language, namespace, callback) {
        let resource, error = null;
        const lang = config.supportedLocales[language] ? language : config.fallback;

        try {
            resource = config
                .supportedLocales[lang]
                .translationFileLoader()[namespace];
        } catch (_error) { error = _error; }

        callback(error, resource);
    },
};

export default translationLoader;

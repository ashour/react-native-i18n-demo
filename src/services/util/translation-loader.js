import * as config from '../../config/i18n';

const translationLoader = {
    type: 'backend',
    init: () => {},
    read: function(language, namespace, callback) {
        let resource, error = null;

        try {
            resource = config.supportedLocales[language].translationFile[namespace];
        } catch (_error) { error = _error; }

        callback(error, resource);
    },
};

export default translationLoader;

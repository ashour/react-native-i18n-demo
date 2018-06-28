import Expo from 'expo';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        return Expo.DangerZone.Localization
            .getCurrentLocaleAsync()

            // We will get back a string like "en_US". We
            // return a string like "en" to match our language
            // files.
            .then((lng) => { callback(lng.split('_')[0]); })
    },
    init: () => {},
    cacheUserLanguage: () => {},
};

export default languageDetector;

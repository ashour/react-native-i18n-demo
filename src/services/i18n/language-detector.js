import * as Localization from "expo-localization";
import { fallback, supportedLocales } from "../../config/i18n";

const languageDetector = {
    type: "languageDetector",
    async: true,
    detect: callback => {
        // We will get back a string like "en-US". We
        // return a string like "en" to match our language
        // files.
        const systemLocale = Localization.locale.split("-")[0];

        const usedLocale =
            supportedLocales[systemLocale] === undefined
                ? fallback
                : systemLocale;

        callback(usedLocale);
    },
    init: () => {},
    cacheUserLanguage: () => {},
};

export default languageDetector;

export const fallback = "en";

export const supportedLocales = {
    en: {
        name: "English",
        dir: "LTR",
        translationFile: require('../lang/en.json'),
    },
    ar: {
        name: "عربي",
        dir: "RTL",
        translationFile: require('../lang/ar.json'),
    },
};

export const defaultNamespace = "common";

export const namespaces = [
    "common",
    "lists",
    "ListScreen",
    "AddTodoScreen",
];

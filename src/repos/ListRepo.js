import { AsyncStorage } from 'react-native';

import uuid from '../util/uuid';

/**
 * @var {string}
 */
let currentList = '';

const ListRepo = {
    /**
     * @param {string} list
     * @returns this
     */
    with(list) {
        currentList = list;

        return this;
    },

    /**
     * @returns {Object<string, {id: string, text: string, isComplete: boolean due: Date}>}
     */
    async getTodos() {
        guardAgainstUnspecifiedList();

        const todosJSONString = await AsyncStorage.getItem(currentList);

        return todosJSONString === null ? {} : JSON.parse(todosJSONString);
    },

    /**
     * @param {Object<string, {id: string, text: string, isComplete: boolean due: Date}>} newTodos
     */
    async saveTodos(newTodos) {
        guardAgainstUnspecifiedList();

        await AsyncStorage.setItem(currentList, JSON.stringify(newTodos));
    },

    /**
     * @param {Object} todo
     * @param {string} todo.text
     * @param {Date} todo.due
     */
    async addTodo(todo) {
        guardAgainstUnspecifiedList();

        const todos = await this.getTodos();

        const id = uuid().toString();

        const newTodos = {
            ...todos,
            [id]: { id, isComplete: false, ...todo },
        };

        this.saveTodos(newTodos);
    },

    /**
     * @param {Object} todo
     * @param {string} todo.text
     * @param {Date} todo.due
     * @param {boolean} todo.isComplete
     */
    async updateTodo(todo) {
        guardAgainstUnspecifiedList();

        const todos = await this.getTodos();

        const newTodos = { ...todos, [todo.id]: todo };

        this.saveTodos(newTodos);
    }
};

const guardAgainstUnspecifiedList = () => {
    if (!currentList) {
        throw new Error('A list must be specified with `with()` before operating on its to-dos.');
    }
};

export default ListRepo;

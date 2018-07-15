import { AsyncStorage } from 'react-native';

import uuid from '../util/uuid';

class ListRepo {
    list = ''

    /**
     * @param {string} list
     * @returns {ListRepo}
     */
    static with(list) {
        return new ListRepo(list);
    }

    /**
     * @param {string} list
     */
    constructor(list) {
        this.list = list;
    }

    /**
     * @returns {Object<string, {id: string, text: string, isComplete: boolean due: String}>}
     */
    async getTodos() {
        this.guardAgainstUnspecifiedList();

        const todosJSONString = await AsyncStorage.getItem(this.list);

        if (todosJSONString === null) return {};

        const parsed = JSON.parse(todosJSONString);

        return transformDueDateStringsToDateObjects(parsed);
    }

    /**
     * @param {Object<string, {id: string, text: string, isComplete: boolean due: Date}>} newTodos
     */
    async saveTodos(newTodos) {
        this.guardAgainstUnspecifiedList();

        await AsyncStorage.setItem(this.list, JSON.stringify(newTodos));
    }

    /**
     * @param {Object} todo
     * @param {string} todo.text
     * @param {Date} todo.due
     */
    async addTodo(todo) {
        this.guardAgainstUnspecifiedList();

        const todos = await this.getTodos();

        const id = uuid().toString();

        const newTodos = {
            ...todos,
            [id]: { id, isComplete: false, ...todo },
        };

        this.saveTodos(newTodos);
    }

    /**
     * @param {Object} todo
     * @param {string} todo.id
     * @param {string} todo.text
     * @param {Date} todo.due
     * @param {boolean} todo.isComplete
     */
    async updateTodo(todo) {
        this.guardAgainstUnspecifiedList();

        const todos = await this.getTodos();

        const newTodos = { ...todos, [todo.id]: todo };

        this.saveTodos(newTodos);
    }

    /**
     * @param {Object} todo
     * @param {string} todo.id
     */
    async deleteTodo(todo) {
        this.guardAgainstUnspecifiedList();

        const todos = await this.getTodos();

        const newTodos = { ...todos };

        delete newTodos[todo.id];

        this.saveTodos(newTodos);
    }

    guardAgainstUnspecifiedList() {
        if (!this.list) {
            throw new Error('A list must be specified ' +
                'before operating on its to-dos.');
        }
    }
};

/**
 * @param {Object<string, {id: string, text: string, isComplete: boolean due: String}>} list
 * @returns {Object<string, {id: string, text: string, isComplete: boolean due: Date}>}
 */
function transformDueDateStringsToDateObjects(list) {
    return Object.keys(list).reduce((transforming, id) => {
        const todo = { ...list[id] };

        if (todo.due) { todo.due = new Date(todo.due); }

        return { ...transforming, [id]: todo };
    }, {});
}

export default ListRepo;

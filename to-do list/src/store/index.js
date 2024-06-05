// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    ADD_TODO(state, todo) {
      state.todos.push(todo);
    },
    REMOVE_TODO(state, index) {
      state.todos.splice(index, 1);
    }
  },
  actions: {
    addTodo ({ commit }, todo) {
      commit('ADD_TODO', todo);
    },
    removeTodo ({ commit }, index) {
      commit('REMOVE_TODO', index);
    }
  },
  getters: {
    todos: state => state.todos
  }
});

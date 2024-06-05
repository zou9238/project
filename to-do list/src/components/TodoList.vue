<template>
  <h1 class="text-center mb-4">To-Do List</h1>
  <div class="container mt-5">
    <div class="row mt-3 mb-3">
      <div class="col-10">
        <input v-model="newTodo" @keyup.enter="AddTodo" class=" form-control" type="text" placeholder="添加新的待辦事項!" />
      </div>
      <div class="col-2">
        <button @click="AddTodo" class="btn btn-primary btn-block" type="button">加入</button>
      </div>
    </div>
    <ul class="list-group">
      <li v-for="(todo, index) in todos" :key="index" class="list-group-item d-flex justify-content-between align-items-center mb-2">
        <div v-if="editingIndex === index" class="flex-grow-1 ">
          <input v-model="editingText" @keyup.enter="saveEdit(index)" class="form-control" type="text" />
          <button @click="saveEdit(index)" class="btn btn-success btn-sm mr-1">保存</button>
          <button @click="cancelEdit" class="btn btn-secondary btn-sm">取消</button>
        </div>
        <div v-else class="flex-grow-1 d-flex justify-content-between">
          <span>{{ todo }}</span>
          <button @click="startEdit(index, todo)" class="btn btn-warning btn-sm mr-1">編輯</button>
          <button @click="RemoveTodo(index)" class="btn btn-danger btn-sm">刪除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      newTodo: '',
      editingIndex: null,
      editingText: ''
    };
  },
  computed: {
    ...mapGetters(['todos'])
  },
  methods: {
    ...mapActions(['addTodo', 'removeTodo']),
    AddTodo() {
      if (this.newTodo.trim() !== '') {
        this.addTodo(this.newTodo); 
        this.newTodo = '';
      }
    },
    RemoveTodo(index) {
      this.removeTodo(index);
    },
    startEdit(index, todo) {
      this.editingIndex = index;
      this.editingText = todo;
    },
    saveEdit(index) {
      if (this.editingText.trim() !== '') {
        this.todos.splice(index, 1, this.editingText);
        this.editingIndex = null;
        this.editingText = '';
      }
    },
    cancelEdit() {
      this.editingIndex = null;
      this.editingText = '';
    }
  }
};
</script>


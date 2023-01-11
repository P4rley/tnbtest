<script>
import { mapActions } from "pinia";
import { RouterLink } from "vue-router";
import { useTodoStore } from "../stores/todoStore";

export default {
  methods: { ...mapActions(useTodoStore, ["completeTodo", "deleteTodo"]) },
  props: ["todo"],
  components: { RouterLink },
};
</script>
<template>
  <div class="cardContainer">
    <div class="todoWrapper">
      <div class="inputWrapper">
        <input
          type="checkbox"
          :checked="todo.isComplete"
          @click="completeTodo(todo.id, todo.isComplete)"
        />
        <label for="" class="todo-label">{{ todo.title }}</label>
      </div>
      <p
        v-if="todo.isComplete"
        class="status"
        style="background-color: #4e944f; color: #e9efc0"
      >
        Completed
      </p>
      <p
        v-else
        class="status"
        style="background-color: #b73e3e; color: #ff9f9f"
      >
        Incomplete
      </p>
    </div>

    <p class="description">{{ todo.description }}</p>

    <div class="icon-wrapper">
      <div @click="deleteTodo(todo.id)">
        <img src="../assets/delete.svg" alt="" class="icon" />
      </div>
      <RouterLink
        v-if="!todo.isComplete"
        :to="{ name: 'editTodo', params: { id: todo.id } }"
        ><img src="../assets/edit.svg" alt="" class="icon"
      /></RouterLink>
    </div>
  </div>
</template>
<style scoped>
.cardContainer {
  margin: 1.5rem 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 5px;
}

.todoWrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inputWrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.status {
  padding: 0.5rem 0.7rem;
  border-radius: 40px;
  font-size: 10px;
}

.todo-label {
  margin: 0 1rem;
  color: #1a374d;
}

.description {
  font-size: 12px;
  font-weight: 400;
  margin: 1rem 0;
  color: #6998ab;
}

.icon-wrapper {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
.icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  cursor: pointer;
}
</style>

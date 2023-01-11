<script>
import { mapActions, mapWritableState } from "pinia";
import { useTodoStore } from "../stores/todoStore";
import { mapState } from "pinia";

export default {
  props: ["id"],
  methods: {
    ...mapActions(useTodoStore, ["addTodo", "editTodo"]),
  },
  computed: {
    ...mapState(useTodoStore, ["todos"]),
    ...mapWritableState(useTodoStore, ["todo"]),
  },
  created() {
    if (this.id) {
      this.todo = this.todos.find((el) => el.id === +this.id);
    } else {
      this.todo.title = "";
      this.todo.description = "";
    }
  },
};
</script>
<template>
  <form class="form-wrapper">
    <div class="group">
      <label for="">Title <span class="star">*</span></label>
      <input type="text" v-model="todo.title" required />
    </div>
    <div class="group">
      <label for="">Description <span class="star">*</span></label>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="todo.description"
        required
      ></textarea>
    </div>
    <input
      v-if="this.id"
      type="button"
      value="Submit"
      class="button"
      @click.prevent="editTodo(this.id, this.todo)"
    />
    <input
      v-else
      type="button"
      value="Submit"
      class="button"
      @click.prevent="addTodo(this.todo)"
    />
  </form>
</template>

<style scoped>
.form-wrapper {
  margin-top: 2rem;
}

.group {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.group label {
  font-size: 1.2rem;
  font-weight: 500;
}

.group input {
  border: 1px solid #406882;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.group textarea {
  border: 1px solid #406882;
  padding: 1rem;
  border-radius: 20px;
  resize: none;
  font-size: 0.8rem;
}

.button {
  border: 1px solid #1a374d;
  padding: 0.5rem 1rem;
  border-radius: 40px;
  background-color: transparent;
  color: #1a374d;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
}

.star {
  color: red;
  font-size: 10px;
}
.button:hover {
  background-color: #1a374d;
  color: #fff;
}
</style>

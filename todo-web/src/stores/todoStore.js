import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [
      {
        id: 1,
        title: "Makan Siang",
        description: "Beli nasi padang pakai ayam goreng",
        isComplete: true,
        createdAt: new Date("Wed Jan 11 2023 19:27:19 GMT+0700"),
      },
      {
        id: 2,
        title: "Lari",
        description: "Start lari pagi pada pukul 05.00",
        isComplete: false,
        createdAt: new Date(),
      },
    ],
    todo: {
      title: "",
      description: "",
    },
  }),
  actions: {
    completeTodo(id, status) {
      console.log(id, status);
      this.todos = this.todos.map((el) => {
        if (el.id === id) {
          if (!status) return { ...el, isComplete: true };
          if (status) return { ...el, isComplete: false };
        }
        return el;
      });
    },
    addTodo(data) {
      if (data.title !== "" || data.description !== "") {
        this.todos.push({
          id: this.todos.length + 1,
          ...data,
          isComplete: false,
          createdAt: new Date(),
        });

        this.todo.title = "";
        this.todo.description = "";

        this.router.push("/");
      }
    },
    editTodo(id, data) {
      this.todos = this.todos.map((el) => {
        if (el.id === +id) {
          return data;
        }
        return el;
      });

      this.router.push("/");
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((el) => el.id !== id);
    },
  },
});

<script>
import CardComponent from "../components/CardComponent.vue";
import { mapActions, mapWritableState } from "pinia";
import { useTodoStore } from "../stores/todoStore";
export default {
  data() {
    return {
      newTodos: [],
      selected: "",
      searchValue: "",
    };
  },
  methods: {
    ...mapActions(useTodoStore, ["fetchTodo"]),
    filter(event) {
      console.log(event.target.value);
      if (event.target.value === "all") {
        this.newTodos = this.todos;
      } else if (event.target.value === "completed") {
        this.newTodos = this.todos.filter((el) => el.isComplete === true);
      } else if (event.target.value === "incomplete") {
        this.newTodos = this.todos.filter((el) => el.isComplete === false);
      } else if (event.target.value === "asc") {
        this.newTodos = this.todos.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else if (event.target.value === "desc") {
        this.newTodos = this.newTodos = this.todos.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      } else if (event.target.value === "newest") {
        this.newTodos = this.newTodos = this.todos.sort(
          (a, b) => b.createdAt - a.createdAt
        );
      } else if (event.target.value === "oldest") {
        this.newTodos = this.newTodos = this.todos.sort(
          (a, b) => a.createdAt - b.createdAt
        );
      }
    },
    search() {
      if (this.searchValue === "") {
        this.newTodos = this.todos;
      } else {
        this.newTodos = this.todos.filter((el) =>
          el.title
            .replace(/^\s+|\s+$/gm, "")
            .toLowerCase()
            .includes(this.searchValue)
        );
      }
    },
    clear() {
      this.newTodos = this.todos;
      this.searchValue = "";
    },
  },
  computed: { ...mapWritableState(useTodoStore, ["todos"]) },
  components: { CardComponent },
  created() {
    this.newTodos = this.todos;
    console.log(this.newTodos);
  },
  watch: {
    todos(newData) {
      if (newData) {
        this.newTodos = newData;
      }
    },
  },
};
</script>

<template>
  <main>
    <div class="container">
      <div class="header">
        <h2>Todo</h2>
        <form action="" class="group" @submit.prevent="search">
          <input type="search" class="input" v-model="searchValue" />
          <input
            type="button"
            value="Search"
            class="button"
            @click.prevent="search"
          />
          <input
            type="button"
            class="clear"
            value="Clear"
            @click.prevent="clear"
          />
        </form>

        <RouterLink to="/add" class="link">Add Todo</RouterLink>
      </div>

      <select name="" id="" class="select" @change="filter($event)">
        <option value="all" selected>All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      <CardComponent
        v-for="(todo, index) in newTodos"
        :key="index"
        :todo="todo"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  margin-top: 5rem;
  align-items: flex-start;
  justify-content: center;
}

.container {
  padding: 1rem;
  border-radius: 10px;
  width: 600px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link {
  font-size: 14px;
  background-color: #406882;
  padding: 0.5rem 1rem;
  color: #dbf3ff;
  border-radius: 40px;
  transition: all 0.4s ease-in-out;
}

.link:hover {
  background-color: #dbf3ff;
  color: #406882;
}

.group .input {
  border: 1px solid #406882;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.button {
  border: 1px solid #1a374d;
  padding: 0.5rem 1rem;
  border-radius: 40px;
  background-color: #1a374d;
  color: #fff;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  font-size: 12px;
  margin: 0 0.5rem;
}

.select {
  margin-top: 2rem;
  padding: 0 1rem;
  border-radius: 5px;
  border: 2px solid #406882;
}

.clear {
  border: none;
  background-color: transparent;
  font-size: 10px;
  cursor: pointer;
}
</style>

<script>
import FormComponent from "../components/FormComponent.vue";

export default {
  data() {
    return {
      id: 0,
    };
  },
  components: { FormComponent },
  created() {
    this.id = this.$route.params.id;
  },
};
</script>
<template>
  <main class="formContainer">
    <div class="container">
      <div class="header">
        <h2 v-if="!this.id">Add Todo</h2>
        <h2 v-else>Edit Todo</h2>
        <RouterLink to="/" class="link">Todo List</RouterLink>
      </div>

      <FormComponent :id="id" />
    </div>
  </main>
</template>
<style scoped>
.formContainer {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5rem;
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
</style>

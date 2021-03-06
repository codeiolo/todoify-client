<template>
  <div>
    <TodoEdit v-if="editTodo" :todo="editTodo" @close="editTodo = null" />
    <TodoAdd :show="showTodoAdd" @close="showTodoAdd = !showTodoAdd" />
    <div v-if="todosToShow.length" class="todosList">
      <div class="todosList--header">
        <h2 v-if="title" class="todosList--header--title">
          {{ title }}
        </h2>
        <div class="todosList--header--tools">
          <l-button
            design="noStyle"
            title="Add new to-do"
            @click="showTodoAdd = !showTodoAdd"
          >
            <i class="icon-plus" />
          </l-button>
        </div>
      </div>
      <LList>
        <li v-for="todo in notDoneTodos" :key="todo._id">
          <ToolBox>
            <template v-slot:tools>
              <l-button design="noStyle" @click="toggleDone(todo)">
                <i class="icon-ok" />
              </l-button>
              <l-button design="noStyle" @click="openEdit(todo)">
                <i class="icon-pencil" />
              </l-button>
              <l-button
                :to="{ name: 'todos.delete', params: { todoId: todo._id } }"
                design="noStyle"
                style="color: red"
              >
                <i class="icon-trash" />
              </l-button>
            </template>
          </ToolBox>
          <div
            class="title"
            title="Click to mark done."
            @click="toggleDone(todo)"
          >
            {{ todo.title }}
          </div>
          <div v-if="showBadge" class="badge">
            <router-link
              v-if="todo.category"
              :to="{
                name: 'categories.item',
                params: { categoryId: todo.category }
              }"
            >
              {{ belongToCategory(todo.category) }}
            </router-link>
            <template v-else>
              {{ belongToCategory(todo.category) }}
            </template>
          </div>
        </li>
        <li v-if="doneTodos.length" class="doneTodos">
          <h3 class="subTitle">Done</h3>
        </li>
        <li v-for="todo in doneTodos" :key="todo._id" class="doneTodos">
          <ToolBox>
            <template v-slot:tools>
              <l-button design="noStyle" @click="toggleDone(todo)">
                <i class="icon-cancel" />
              </l-button>
              <l-button design="noStyle" @click="openEdit(todo)">
                <i class="icon-pencil" />
              </l-button>
              <l-button
                design="noStyle"
                :to="{ name: 'todos.delete', params: { todoId: todo._id } }"
                style="color: red"
              >
                <i class="icon-trash" />
              </l-button>
            </template>
          </ToolBox>
          <div
            class="title"
            title="Click to mark not done."
            @click="toggleDone(todo)"
          >
            {{ todo.title }}
          </div>
          <div v-if="showBadge" class="badge">
            <router-link
              v-if="todo.category"
              :to="{
                name: 'categories.item',
                params: { categoryId: todo.category }
              }"
            >
              {{ belongToCategory(todo.category) }}
            </router-link>
            <template v-else>
              {{ belongToCategory(todo.category) }}
            </template>
          </div>
        </li>
      </LList>
    </div>
    <NoListItemsFound v-else>
      <template v-slot:title>
        No to-do's found
      </template>
      <template v-slot:subtitle>
        <l-button
          design="success"
          style="margin: auto;"
          @click="showTodoAdd = !showTodoAdd"
        >
          <span class="label">Create one now</span>
          <i class="icon-plus" />
        </l-button>
      </template>
    </NoListItemsFound>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TodosList",
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    showBadge: {
      type: Boolean,
      required: false,
      default: false
    },
    filterByCategory: {
      type: String,
      required: false,
      default: null
    },
    limitTodos: {
      type: Number,
      required: false,
      default: 0
    }
  },

  data() {
    return {
      editTodo: null,
      showTodoAdd: false
    };
  },
  computed: {
    ...mapGetters({
      getTodos: "getTodos",
      getTodosByCategoryId: "getTodosByCategoryId",
      getCategoryById: "getCategoryById"
    }),
    todosToShow() {
      let todos = null;
      if (this.filterByCategory) {
        todos = this.getTodosByCategoryId(this.filterByCategory);
      } else {
        todos = this.getTodos;
      }

      return todos;
    },
    doneTodos() {
      let todos = this.todosToShow.filter(todo => todo.done);
      return this.limitTodos ? todos.slice(0, this.limitTodos) : todos;
    },
    notDoneTodos() {
      let todos = this.todosToShow.filter(todo => !todo.done);

      return this.limitTodos ? todos.slice(0, this.limitTodos) : todos;
    }
  },
  methods: {
    openEdit(todo) {
      this.editTodo = todo;
    },
    belongToCategory(id) {
      const category = this.getCategoryById(id);
      return category ? category.title : "Uncategorized";
    },
    toggleDone(todo) {
      todo.done = !todo.done;
      this.$store.dispatch("updateTodo", todo);
    }
  }
};
</script>

<style lang="scss" scoped>
.todosList {
  > .todosList--header {
    display: flex;
    align-items: center;
    padding: 16px 0;
    justify-content: space-between;

    > .todosList--header--title {
      font-weight: 300;
      margin: 0;
    }

    > .todosList--header--tools {
      display: flex;
      margin-left: auto;
    }
  }

  .doneTodos {
    background: darken($listItemBgColor, $amount: 3);
  }
}
</style>

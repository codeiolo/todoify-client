import TodosView from "@/views/TodosView";
import TodosListView from "@/views/todos/TodosListView";
import Store from "@/store/store";

export default [
  {
    path: "/todos",
    redirect: { name: "todos.list" },
    component: TodosView,
    children: [
      {
        path: "",
        name: "todos.list",
        component: TodosListView,
        meta: {
          title: `To-do's`
        }
      },
      {
        path: ":todoId/delete",
        name: "todos.delete",
        meta: {
          title: "Delete To-do"
        },
        beforeEnter: (to, from, next) => {
          if (confirm("Are you sure you want to delete this to-do?")) {
            Store.dispatch("deleteTodo", to.params.todoId);
          }
          next(false);
        }
      }
    ]
  }
];

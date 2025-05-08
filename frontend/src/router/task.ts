import DashboardLayout from "@/layouts/DashboardLayout.vue";

const TaskRouter = [
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Tasks",
        component: () =>
          import("@/app/task/interfaces/presentation/views/TaskView.vue"),
      },
      {
        path: "/tasks/:id/edit", // Sin el slash inicialedit',
        name: "tasks.edit",
        component: () =>
          import("@/app/task/interfaces/presentation/views/TaskEditView.vue"),
      },
    ],
  },
];

export default TaskRouter;

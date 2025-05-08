import LoginView from "@/app/auth/interfaces/presentation/views/LoginView.vue";
import RegisterView from "@/app/auth/interfaces/presentation/views/RegisterView.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import { RouteConfig } from "vue-router";

const AuthRouter: RouteConfig[] = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
      {
        path: "register",
        name: "register",
        component: RegisterView,
      },
    ],
  },
];

export default AuthRouter;

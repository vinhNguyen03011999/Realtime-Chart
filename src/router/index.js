import Vue from "vue";
import VueRouter from "vue-router";
import TaskBoard from "../views/TodoListPage";
import Chart from "../views/ChartPage";
import ApexChart from '../views/ApexChart';
import LoginForm from '../views/LoginForm';
import RegisterForm from '../views/RegisterForm'
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login function",
    component: LoginForm
  },
  {
    path: "/register",
    name: "register function",
    component: RegisterForm
  },
  {
    path: "/",
    name: "Task Board",
    component: TaskBoard
  },
  {
    path: "/chart",
    name: "Chart Task",
    component: Chart
  },
  {
    path: "/apexchart",
    name: "Chart Apex",
    component: ApexChart
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

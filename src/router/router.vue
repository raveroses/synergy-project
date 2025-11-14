<script>
import { createRouter, createWebHistory } from "vue-router";
import Setting from "../view/Setting.vue";
import Investment from "../view/Investment.vue";
import Signup from "../view/Signup.vue";
import Login from "../view/Login.vue";
// import App from "../view/App.vue";

const routes = [
  { path: "/setting", component: Setting },
  { path: "/investments", component: Investment },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
</script>

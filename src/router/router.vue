<script>
import { createRouter, createWebHistory } from "vue-router";
import Setting from "../view/Setting.vue";
// import App from "../view/App.vue";

const routes = [
  { path: "/setting", component: Setting },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
</script>

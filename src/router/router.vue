<script>
import { createRouter, createWebHistory } from "vue-router";
// import Investment from "../view/Investment.vue";
// import Status from "../view/Status.vue";
const routes = [
  // { path: "/investments", component: Investment },
  // { path: "/status", component: Status },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
</script>

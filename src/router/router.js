import { createRouter, createWebHistory } from "vue-router";
import Setting from "../view/Setting.vue";
import Investment from "../view/Investment.vue";
import Signup from "../view/Signup.vue";
import Login from "../view/Login.vue";
import Transfer from "../view/Transfer.vue";
import Billpayment from "../view/Billpayment.vue";
// import App from "../view/App.vue";

const routes = [
  { path: "/setting", component: Setting },
  { path: "/investments", component: Investment },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  { path: "/fund-transfer", component: Transfer },
  { path: "/bill-payment", component: Billpayment },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

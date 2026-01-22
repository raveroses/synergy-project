import { createRouter, createWebHistory } from "vue-router";
import Setting from "../view/Setting.vue";
import Investment from "../view/Investment.vue";
import Signup from "../view/Signup.vue";
import Login from "../view/Login.vue";
import Transfer from "../view/Transfer.vue";
import Billpayment from "../view/Billpayment.vue";
import Home from "../view/Home.vue";
import Saving from "../view/Saving.vue";
import Loan from "../view/Loan.vue";
import ResetPassword from "../view/ResetPassword.vue";
import UpdatePassword from "../view/UpdatePassword.vue";
import { supabase } from "../_supabase/supabase.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home", requiresAuth: true },
  },
  {
    path: "/savings",
    name: "Saving",
    component: Saving,
    meta: { title: "Saving", requiresAuth: true },
  },
  {
    path: "/loans",
    name: "loan",
    component: Loan,
    meta: { title: "Loan", requiresAuth: true },
  },
  {
    path: "/setting",
    name: "setting",
    component: Setting,
    meta: { title: "Setting", requiresAuth: true },
  },
  {
    path: "/investments",
    name: "Investment",
    component: Investment,
    meta: { title: "Investment", requiresAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: { title: "signup", requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "Login", requiresAuth: false },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: ResetPassword,
    meta: { title: "ResetPassword", requiresAuth: false },
  },
  {
    path: "/updatePassword",
    name: "updatePassword",
    component: UpdatePassword,
    meta: { title: "UpdatePassword", requiresAuth: false },
  },
  {
    path: "/fund-transfer",
    name: "fund-transfer",
    component: Transfer,
    meta: { title: "Fund Transfer", requiresAuth: true },
  },
  {
    path: "/bill-payment",
    name: "bill-payment",
    component: Billpayment,
    meta: { title: "Bill payment", requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const routeProtection = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
};

router.beforeEach(async (to, from, next) => {
  const session = await routeProtection();
  const isLoggedIn = !!session;

  if (to.meta.requiresAuth && !isLoggedIn) {
    if (to.name === "login") {
      return next();
    }
    return next({ name: "login" });
  }

  next();
});

export default router;

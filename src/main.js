import { createApp } from "vue";
import "./style.css";
import App from "./view/App.vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import router from "./router/router.js";
import { createPinia } from "pinia";
// import { useCreateClient } from "./_supabase/useCreateClient.js";
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ToastPlugin, {
  position: "top-right",
  duration: 3000,
});
app.use(LoadingPlugin);

// const authStore = useCreateClient();
// authStore.initAuth();

app.mount("#app");

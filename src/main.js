import { createApp } from "vue";
import "./style.css";
import App from "./view/App.vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import router from "./router/router.vue";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ToastPlugin, {
  position: "top-right",
  duration: 3000,
});
app.mount("#app");

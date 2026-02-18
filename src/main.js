import { createApp } from "vue";
import "./style.css";
import App from "./view/App.vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import router from "./router/router.js";
import { createPinia } from "pinia";
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
});
app.use(LoadingPlugin);

app.mount("#app");

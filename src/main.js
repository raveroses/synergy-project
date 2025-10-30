import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/router.vue";

createApp(App).use(router).mount("#app");

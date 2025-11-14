import { createApp } from "vue";
import "./style.css";
import App from "./view/App.vue";
import router from "./router/router.vue";

createApp(App).use(router).mount("#app");

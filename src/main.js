import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";

import App from "./App.vue";
import router from "./router";

import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./assets/main.css";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(createPinia());

app.mount("#app");

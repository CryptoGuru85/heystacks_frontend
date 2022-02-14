import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { store } from "./store";
import router from './router/router';
// import 'vite-plugin-svg-icons/register';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')

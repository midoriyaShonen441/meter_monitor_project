import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar';
import VueCookies from 'vue-cookies'
import store from './store';

const app = createApp(App)

app.use(router);
app.use(store);
app.use(VCalendar, {});
app.use(VueCookies, { expire: '1h'});

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config';
// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)
app.use(router)
app.mount('#app')
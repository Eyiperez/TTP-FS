import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAgYRrA2DiVkwydPwg5QXobBhJAXyZgtas",
    authDomain: "my-ttp-fs.firebaseapp.com",
    databaseURL: "https://my-ttp-fs.firebaseio.com",
    projectId: "my-ttp-fs",
    storageBucket: "my-ttp-fs.appspot.com",
    messagingSenderId: "153349555314",
    appId: "1:153349555314:web:da52bac4225b6664"
  };

app.initializeApp(config);

export default app;
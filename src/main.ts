import { Quasar } from "quasar";
import { createApp } from "vue";

// Import icon libraries
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

// Import Quasar css
import "quasar/dist/quasar.css";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

const myApp = createApp(App);

myApp.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  config: { dark: "auto" },
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");

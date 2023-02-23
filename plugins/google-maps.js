import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps"; // Import package
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyAXsl7deCMhvVBsVRJHGks_RJvJ59kEAI4",
        libraries: "places",
    },
});
// src/plugins/argon-kit.ts
import { PluginObject } from "vue";

// Polyfills for JS features used in the Dashboard but not supported in some browsers (mainly IE)
import "@/polyfills";
// Notifications plugin. Used on Notifications page
import Notifications from "@/components/NotificationPlugin";
// Validation plugin used to validate forms
import { configure, extend, localize } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/es.json"; // Importa los mensajes de validación

// A plugin file where you could register global components used across the app
import GlobalComponents from "./globalComponents";
// A plugin file where you could register global directives
import GlobalDirectives from "./globalDirectives";
// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from "@/components/SidebarPlugin";

// element-ui language configuration
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
locale.use(lang);

// vue-bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// asset imports
import "@/assets/scss/argon.scss";
import "@/assets/vendor/nucleo/css/nucleo.css";

// Register all VeeValidate rules and configure messages
Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule as keyof typeof rules],
    message: en.messages[rule as keyof typeof en.messages] || "Invalid input", // Asigna el mensaje
  });
});

// Set the locale for validation messages
localize("en", en);

const ArgonKitPlugin: PluginObject<any> = {
  install(VueInstance) {
    VueInstance.use(GlobalComponents);
    VueInstance.use(GlobalDirectives);
    VueInstance.use(SideBar);
    VueInstance.use(Notifications);
    VueInstance.use(BootstrapVue);
    VueInstance.use(IconsPlugin);
    configure({
      classes: {
        valid: "is-valid",
        invalid: "is-invalid",
        dirty: ["is-dirty", "is-dirty"],
      },
    });
  },
};

export default ArgonKitPlugin;

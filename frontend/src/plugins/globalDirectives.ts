import { PluginFunction } from "vue";
import clickOutside from "@/directives/click-ouside";

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */
const GlobalDirectives: { install: PluginFunction<undefined> } = {
  install(Vue) {
    Vue.directive("click-outside", clickOutside);
  },
};

export default GlobalDirectives;

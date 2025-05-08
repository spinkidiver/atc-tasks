import Vue, { PluginFunction } from "vue";
import Sidebar from "./SideBar.vue";
import SidebarItem from "./SidebarItem.vue";

interface SidebarLink {
  name?: string;
  path?: string;
  icon?: string;
  [key: string]: any;
}

interface SidebarStoreType {
  showSidebar: boolean;
  sidebarLinks: SidebarLink[];
  isMinimized: boolean;
  displaySidebar: (value: boolean) => void;
  toggleMinimize: () => void;
}

const SidebarStore: SidebarStoreType = {
  showSidebar: false,
  sidebarLinks: [],
  isMinimized: false,
  displaySidebar(value: boolean) {
    this.showSidebar = value;
  },
  toggleMinimize() {
    document.body.classList.toggle("sidebar-mini");

    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event("resize"));
    }, 180);

    setTimeout(() => {
      clearInterval(simulateWindowResize);
    }, 1000);

    this.isMinimized = !this.isMinimized;
  },
};

const SidebarPlugin: { install: PluginFunction<any> } = {
  install(Vue, options?: { sidebarLinks?: SidebarLink[] }) {
    if (options?.sidebarLinks) {
      SidebarStore.sidebarLinks = options.sidebarLinks;
    }

    const app = new Vue({
      data: {
        sidebarStore: SidebarStore,
      },
    });

    Vue.prototype.$sidebar = app.$data.sidebarStore;
    Vue.component("side-bar", Sidebar);
    Vue.component("sidebar-item", SidebarItem);
  },
};

export default SidebarPlugin;

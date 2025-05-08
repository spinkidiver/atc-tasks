// src/components/NotificationPlugin/index.ts
import Vue, { PluginObject } from "vue";
import Notifications from "./Notifications.vue";

interface NotificationOptions {
  message?: string;
  type?: string;
  timeout?: number;
  showClose?: boolean;
  closeOnClick?: boolean;
  verticalAlign?: string;
  horizontalAlign?: string;
  overlap?: boolean;
  timestamp?: Date;
  [key: string]: any;
}

interface NotificationStoreType {
  state: NotificationOptions[];
  settings: NotificationOptions;
  setOptions: (options: Partial<NotificationOptions>) => void;
  removeNotification: (timestamp: Date) => void;
  addNotification: (notification: NotificationOptions | string) => void;
  notify: (notification: NotificationOptions | NotificationOptions[]) => void;
}

const NotificationStore: NotificationStoreType = {
  state: [],
  settings: {
    overlap: false,
    verticalAlign: "top",
    horizontalAlign: "right",
    type: "info",
    timeout: 5000,
    closeOnClick: true,
    showClose: true,
  },
  setOptions(options) {
    this.settings = Object.assign(this.settings, options);
  },
  removeNotification(timestamp) {
    const indexToDelete = this.state.findIndex(
      (n) => n.timestamp?.getTime() === timestamp.getTime()
    );
    if (indexToDelete !== -1) {
      this.state.splice(indexToDelete, 1);
    }
  },
  addNotification(notification) {
    if (typeof notification === "string") {
      notification = { message: notification };
    }
    const ts = new Date();
    ts.setMilliseconds(ts.getMilliseconds() + this.state.length);
    notification.timestamp = ts;

    notification = Object.assign({}, this.settings, notification);
    this.state.push(notification);
  },
  notify(notification) {
    if (Array.isArray(notification)) {
      notification.forEach((n) => this.addNotification(n));
    } else {
      this.addNotification(notification);
    }
  },
};

const NotificationsPlugin: PluginObject<Partial<NotificationOptions>> = {
  install(VueInstance, options) {
    const app = new Vue({
      data: {
        notificationStore: NotificationStore,
      },
      methods: {
        notify(notification: NotificationOptions | NotificationOptions[]) {
          this.notificationStore.notify(notification);
        },
      },
    });

    VueInstance.prototype.$notify = (
      notification: NotificationOptions | NotificationOptions[]
    ) => app.notify(notification);

    VueInstance.prototype.$notifications = NotificationStore;
    VueInstance.component("Notifications", Notifications);

    if (options) {
      NotificationStore.setOptions(options);
    }
  },
};

export default NotificationsPlugin;

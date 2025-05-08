import Vue from "vue";
import Vuex from "vuex";
import { UserRepositoryImpl } from "@/app/user/infrastructure/repositories/UserRepositoryImpl";
import { GetProfileUsecase } from "@/app/user/usecases/GetProfileUsecase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mainLayout: "app",
    user: null,
    isAuthenticated: false,
    selectedTask: (() => {
      const task = localStorage.getItem("selectedTask");
      return task ? JSON.parse(task) : null;
    })(),
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    selectedTask(state) {
      return state.selectedTask;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setSelectedTask(state, task) {
      state.selectedTask = task;
      localStorage.setItem("selectedTask", JSON.stringify(task));
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const userRepository = new UserRepositoryImpl();
        const getProfile = new GetProfileUsecase(userRepository);

        const data = await getProfile.execute();
        console.log(data);
        commit("setUser", data);
        commit("setAuthenticated", true);
      } catch (err) {
        commit("setUser", null);
        commit("setAuthenticated", false);
      }
    },
  },
  modules: {},
});

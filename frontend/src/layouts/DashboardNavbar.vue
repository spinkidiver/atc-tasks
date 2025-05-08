<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top navbar-expand"
    :class="{ 'navbar-dark': type === 'default' }"
  >
    <a
      href="#"
      aria-current="page"
      class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block active router-link-active"
    >
      <!-- {{ $route.name }} -->
    </a>
    <!-- Navbar links -->
    <b-navbar-nav class="align-items-center ml-md-auto">
      <!-- This item dont have <b-nav-item> because item have data-action/data-target on tag <a>, wich we cant add -->
      <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main"
        >
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
    </b-navbar-nav>
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
      <b-form
        class="navbar-search form-inline mr-sm-3"
        :class="{
          'navbar-search-dark': type === 'default',
          'navbar-search-light': type === 'light',
        }"
        id="navbar-search-main"
      >
      </b-form>
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <b-media no-body class="align-items-center">
            <b-media-body class="ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">{{
                user?.name
              }}</span>
            </b-media-body>
          </b-media>
        </a>

        <template>
          <b-dropdown-item href="#!">
            <a
              href="javascript:void(0);"
              @click.prevent="logout()"
              class="dropdown-item"
            >
              <i class="ni ni-user-run"></i>
              <span>Logout</span></a
            >
          </b-dropdown-item>
        </template>
      </base-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import { BaseNav, Modal } from "@/components";
import { AuthRepositoryImpl } from "@/app/auth/infrastructure/repositories/AuthRepositoryImpl";
import { LogoutUsecase } from "@/app/auth/usecases";
export default {
  components: {
    // CollapseTransition,
    BaseNav,
    // Modal,
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description:
        "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    user() {
      return this.$store.getters.user;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",
    };
  },
  mounted() {
    this.fetchUser();

    if (!this.user) {
      setTimeout(() => {
        if (!this.user) {
          this.$router.replace("/auth/login");
        }
      }, 500);
    }
  },
  watch: {
    user(newUser) {
      if (!newUser) {
        this.$router.replace("/auth/login");
      }
    },
  },
  methods: {
    fetchUser() {
      this.$store.dispatch("fetchUser");
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    async logout() {
      try {
        let userRepository = new AuthRepositoryImpl();
        let logout = new LogoutUsecase(userRepository);

        await logout.execute();
        this.$router.replace("/auth/login"); // Redirigir si no está autenticado
      } catch (err) {
        this.$router.replace("/auth/login"); // Redirigir si no está autenticado
      }
    },
  },
};
</script>

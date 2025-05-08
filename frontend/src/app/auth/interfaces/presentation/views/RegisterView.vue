<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Create an account</h1>
              <p class="text-lead text-white">
                Use these awesome forms to login or create new account in your
                project for free.
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-alert v-model="errorMessage.length" variant="danger" dismissible>
            {{ errorMessage }}
          </b-alert></b-col
        ></b-row
      >
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Sign up with credentials</small>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    placeholder="Name"
                    name="Name"
                    :rules="{ required: true }"
                    v-model="registerRequest.name"
                    :external-error="backendErrors.name"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    v-model="registerRequest.email"
                    :external-error="backendErrors.email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="password"
                    type="password"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    v-model="registerRequest.password"
                  >
                  </base-input>
                  <div class="text-muted font-italic">
                    <small
                      >password strength:
                      <span class="text-success font-weight-700"
                        >strong</span
                      ></small
                    >
                  </div>

                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4"
                      >Create account</b-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { RegisterRequest } from "@/app/auth/interfaces/dtos/RegisterRequest";
import { RegisterUsecase } from "@/app/auth/usecases";
import { AuthRepositoryImpl } from "@/app/auth/infrastructure/repositories/AuthRepositoryImpl";

export default {
  name: "register",
  data() {
    return {
      errorMessage: "",
      registerRequest: new RegisterRequest(),
      backendErrors: {
        name: "",
        lastname: "",
        identification: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const authRepository = new AuthRepositoryImpl();
        const registerUsecase = new RegisterUsecase(authRepository);

        const user = await registerUsecase.execute(this.registerRequest);
        this.$router.push("/");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors;
          // Limpia errores anteriores
          Object.keys(this.backendErrors).forEach((key) => {
            this.backendErrors[key] = "";
          });

          Object.entries(errors).forEach(([field, messages]) => {
            if (
              Object.prototype.hasOwnProperty.call(this.backendErrors, field)
            ) {
              this.backendErrors[field] = messages.join(", ");
            }
          });

          console.error(error.message);
          this.errorMessage = error.message;
        }
      }
    },
  },
};
</script>

<style></style>

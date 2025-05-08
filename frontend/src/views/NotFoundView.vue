<template>
  <div>
    <!-- Page content -->
    <section class="py-6">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="6" class="px-5">
              <h1 class="text-light">Ooops!</h1>
              <p class="text-lead">Page not found.</p>

              <router-link to="/dashboard" class="font-weight-bold mt-5"
                >Back to dashboard</router-link
              >
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  name: "not-found",
};
</script>

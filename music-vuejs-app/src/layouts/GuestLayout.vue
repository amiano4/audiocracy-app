<template>
  <div class="full-container flex center column">
    <main>
      <router-view />
    </main>
    <footer class="text-dark">
      <small>&copy; 2025 Almario Miano. All Rights Reserved</small>
    </footer>
  </div>
</template>

<script lang="ts"></script>

<style lang="scss">
main {
  flex-grow: 1;
}

footer {
  padding: 1rem;
}

.form-footer-nav-link {
  font-size: 0.875rem;
  margin-top: 2rem;
  text-align: center;
}
</style>

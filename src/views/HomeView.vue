<template>
  <main class="home-container">
    <div class="home-header">
      <h1>Bienvenido a Doonamis</h1>
      <h2>Tabla de gestion de usuarios</h2>
    </div>
    <div class="users-table">
      <UsersTable />
    </div>
  </main>
</template>

<script setup lang="ts">
import UsersTable from '@/components/UsersTable.vue'

</script>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  padding: 2rem;
  background-color: #f4f8fb;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .home-header {
    text-align: center;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    h1 {
      font-size: clamp(1.5rem, 2vw, 2rem);
      font-weight: 700;
      color: #333;
      margin-bottom: 0.25rem;
    }

    h2 {
      font-size: 1rem;
      font-weight: 400;
      color: #7a7a7a;
    }
  }

  .users-table {
    width: 100%;
    background-color: #ffffff;
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  }
}

</style>
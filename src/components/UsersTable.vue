<template>
    <div class="users-table-container">
        <div class="add-users-from-csv-input">
            <AddUsersFromCsvInput @usersUpdated="fetchUsers" />
        </div>
        <p v-if="errorFetchingUsers.status" class="error-message">{{ errorFetchingUsers.message }}</p>
        <table v-if="!errorFetchingUsers.status && users.length > 0">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.address }}</td>
                <td>
                    <button class="delete-button" @click="deleteUser(user.id)">Eliminar</button>
                </td>
                </tr>
            </tbody>
        </table>  
        <p v-else-if="!errorFetchingUsers.status && users.length === 0">No hay usuarios</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { UsersService } from '@/services/users.service'
import AddUsersFromCsvInput from '@/components/AddUsersFromCsvInput.vue'
import type { User } from '@/dtos/user.dto'

const usersService = new UsersService()
const users = ref<User[]>([])
const errorFetchingUsers = ref({
    status: false,
    message: ''
})
onMounted(() => {
    fetchUsers()
})

const fetchUsers = () => {
  usersService.getUsers().then((response) => {
    users.value = response.data
  }).catch(() => {
    errorFetchingUsers.value.status = true
    errorFetchingUsers.value.message = 'No se han podido recuperar los usuarios'
  })
}

const deleteUser = (id: number) => {
  usersService.deleteUser(id).then(() => {
    fetchUsers()
  })
}

</script>

<style scoped lang="scss">
.users-table-container {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  overflow-x: auto;

  .add-users-from-csv-input {
    margin-bottom: 1.5rem;
  }

  .error-message {
    background-color: #ffe5e5;
    color: #d9534f;
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
    min-width: 600px;

    thead {
      background-color: #f4f8fb;

      th {
        text-align: left;
        font-weight: 600;
        color: #444;
        border-bottom: 1px solid #e0e0e0;
      }
    }

    tbody {
      tr {
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #f9f9f9;
        }
      }

      td {
        padding: 0.75rem 1rem;
        color: #333;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }

  .delete-button {
    background-color: #f87171;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    font-size: 0.85rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ef4444;
    }
  }

  p {
    font-size: 0.95rem;
    color: #666;
    text-align: center;
    margin-top: 1rem;
  }
}
</style>
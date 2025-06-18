<template>
  <main class="home-container">
    <div class="home-header">
      <h1>Bienvenido a Doonamis</h1>
      <h2>Tabla de gestion de usuarios</h2>
    </div>
    <div class="file-upload">
      <label for="csvFile" class="upload-label">
        Arrastra o selecciona un archivo CSV
        <input 
          type="file" 
          id="csvFile"
          accept=".csv"
          @change="handleFileUpload"
          max="1"
          class="file-input"
        />
      </label>
      <p v-if="uploadError.status" class="error-message">
        {{ uploadError.message }}
      </p>
    </div>
    <div class="users-table">
      <table>
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
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { UsersService } from '@/services/users.service'

interface User {
  id: number
  name: string
  last_name: string
  email: string
  phone: string
  address: string
}

const usersService = new UsersService()

const users = ref<User[]>([])
const uploadError = ref({
  status: false,
  message: ''
})

const getUsers = () => {
  usersService.getUsers().then((response) => {
    users.value = response.data
  })
}

const deleteUser = (id: number) => {
  usersService.deleteUser(id).then(() => {
    getUsers()
  })
}

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if(file) {
    const formData = new FormData()
    formData.append('file', file)
    usersService.uploadUsers(formData).then(() => {
      getUsers()
    }).catch((error) => {
      uploadError.value.status = true
      uploadError.value.message = error.response.data.message
    })
  }
}

onMounted(() => {
  getUsers()
})
</script>

<style scoped lang="scss">
.home-container {
  height: 100%;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  gap: 20px;
  .home-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      font-weight: 600;
      color: #ff6c0e;
    }
  }
  .file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .upload-label {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .error-message {
      color: red;
    }
  }
  .users-table {
    width: 100%;
    max-width: 100%;
    table {
      align-items: center;
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #000;
      th, td {
        border: 1px solid #000;
        text-align: center;
        width: fit-content;
      }
      th {
        background-color: #f0f0f0;
      }
    }
  }
}
</style>
<template>
    <div class="file-upload">
      <label for="csvFile" class="upload-label">
        Arrastra o selecciona un archivo CSV
        <input 
          type="file" 
          id="csvFile"
          accept=".csv"
          max="1"
          class="file-input"
          @change="handleFileUpload"
          />
      </label>
      <p v-if="uploadError.status" class="error-message">
        {{ uploadError.message }}
      </p>
      <p v-if="uploadSuccess.status" class="success-message">
        {{ uploadSuccess.message }}
      </p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UsersService } from '@/services/users.service'

const usersService = new UsersService()

const uploadError = ref({
status: false,
message: ''
})
const uploadSuccess = ref({
    status: false,
    message: ''
})

const emit = defineEmits(['usersUpdated'])

const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if(file) {
        const formData = new FormData()
        formData.append('file', file)
        usersService.uploadUsers(formData).then(() => {
            uploadSuccess.value.status = true
            uploadSuccess.value.message = 'Los usuarios se han sincronizado correctamente'
            uploadError.value.status = false
            emit('usersUpdated')
        }).catch((error) => {
            uploadError.value.status = true
            uploadError.value.message = 'No se han podido subir los usuarios'
            if(error.response.status === 400) {
                uploadError.value.message = error.response.data.message
            }
        })
    }
}
</script>

<style scoped lang="scss">
.file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .upload-label {
    background-color: #ffffff;
    border: 2px dashed #a0d8ef;
    color: #333;
    font-weight: 500;
    padding: 1.25rem 2rem;
    border-radius: 1rem;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    width: 100%;
    max-width: 400px;

    &:hover {
      background-color: #f0faff;
      border-color: #7acbe8;
    }

    .file-input {
      display: none;
    }
  }

  .error-message {
    background-color: #ffe5e5;
    color: #d9534f;
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    text-align: center;
  }
  .success-message {
    background-color: #dff0d8;
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    text-align: center;
  }
}
</style>
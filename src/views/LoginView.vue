<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-header">
                <h1>Iniciar Sesión</h1>
            </div>
            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input 
                        type="email" 
                        id="email" 
                        v-model="loginData.email" 
                        placeholder="tu@email.com"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        v-model="loginData.password" 
                        placeholder="Tu contraseña"
                        required
                    />
                </div>
                <div class="error-message" v-if="authError.status">
                    <p>{{ authError.message }}</p>
                </div>
                <button type="submit" class="login-button">Iniciar Sesión</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthService } from '@/services/auth.service'
import { useRouter } from 'vue-router'
import type { LoginDto } from '@/dtos/auth.dto'

const authService = new AuthService()
const router = useRouter()

const loginData = ref<LoginDto>({
    email: '',
    password: ''
})
const authError = ref({
    status: false,
    message: ''
})

const handleLogin = async () => {
    authService.login(loginData.value).then((response) => {
        localStorage.setItem('doonamis_token', response.data.access_token)
        router.push('/')
    }).catch((error) => {
        authError.value.status = true
        authError.value.message = 'Ups... algo salió mal, por favor intentalo de nuevo.'
        if (error.response.status === 401) {
            authError.value.status = true
            authError.value.message = 'Credenciales incorrectas'
            return
        }
    })
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;

  .login-box {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    transition: all 0.3s ease;
  }

  .login-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;

    h1 {
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 700;
      color: #333;
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-weight: 500;
        color: #4a4a4a;
        font-size: 0.95rem;
      }

      input {
        padding: 0.75rem;
        border-radius: 0.75rem;
        border: 1px solid #dcdcdc;
        font-size: 1rem;
        transition: border-color 0.2s ease;

        &:focus {
          outline: none;
          border-color: #a0d8ef;
          box-shadow: 0 0 0 2px rgba(160, 216, 239, 0.3);
        }
      }
    }

    .error-message {
      color: #dc3545;
      font-size: 0.85rem;
      font-weight: 500;
      text-align: center;
      background-color: #ffe5e5;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
    }

    .login-button {
      background-color: #ff6c0e;
      color: #fff;
      padding: 0.75rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 0.75rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #e45e05;
      }
    }
  }
}
</style>
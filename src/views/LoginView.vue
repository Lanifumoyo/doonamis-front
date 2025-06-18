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
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    
    .login-box {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        width: 80%;
    }

    .login-header {
        display: flex;
        justify-content: center;
        align-items: center;
        h1 {
            font-size: 24px;
            font-weight: 600;
            color: #333;
        }
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        
        .error-message {
            color: #dc3545;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
            label {
                font-weight: 600;
                color: #333;
            }
            input {
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
            }
        }
        .login-button {
            background-color: #ff6c0e;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            border: none;
        }
    }
}

</style>
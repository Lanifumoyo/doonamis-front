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
                        v-model="email" 
                        placeholder="tu@email.com"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        v-model="password" 
                        placeholder="Tu contraseña"
                        required
                    />
                </div>
                <div class="error-message" v-if="authError">
                    <p>Credenciales incorrectas</p>
                </div>
                <div class="form-options">
                    <label class="remember-me">
                        <input type="checkbox" v-model="rememberMe" />
                        <span>Recordarme</span>
                    </label>
                    <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
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

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const authError = ref(false)
const authService = new AuthService()
const router = useRouter()

const handleLogin = async () => {
    authService.login(email.value, password.value).then((response) => {
        localStorage.setItem('doonamis_token', response.data.access_token)
        router.push('/')
    }).catch((error) => {
        if (error.response.status === 401) {
            authError.value = true
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
    
    .login-box {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        width: 50%;
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
        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .remember-me {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .forgot-password {
                font-size: 14px;
                color: #333;
                text-decoration: none;
                cursor: pointer;
            }
        }
        .login-button {
            background-color: #ffc107;
            color: #fff;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            border: none;
        }
    }
}

</style>
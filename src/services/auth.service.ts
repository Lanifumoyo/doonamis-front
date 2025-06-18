import type { LoginDto } from '@/dtos/auth.dto';
import axios from 'axios';

export class AuthService {
    private readonly apiUrl = import.meta.env.VITE_API_URL;

    async login(loginData: LoginDto) {
        return await axios.post(`${this.apiUrl}/api/v1/auth/login`, loginData);
    }
}
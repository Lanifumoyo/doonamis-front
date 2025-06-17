import axios from 'axios';

export class AuthService {
    private readonly apiUrl = import.meta.env.VITE_API_URL;

    async login(email: string, password: string) {
        return await axios.post(`${this.apiUrl}/api/v1/auth/login`, { email, password });
    }
}
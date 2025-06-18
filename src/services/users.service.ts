import Api from '@/services/api.service'

export class UsersService {
    async getUsers() {
        return await Api.get(`/api/v1/users`);
    }

    async deleteUser(id: number) {
        return await Api.delete(`/api/v1/users/${id}`);
    }

    async uploadUsers(formData: FormData) {
        return await Api.post(`/api/v1/users/upload-from-csv`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}
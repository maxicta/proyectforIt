interface RegisterUserResponse {
    success: boolean;
    user: {
        id: string;
        email: string;
        name: string;
        phone: string;
        createdAt: string;
    };
}
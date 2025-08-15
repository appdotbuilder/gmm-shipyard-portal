import { type LoginInput, type AuthResponse } from '../schema';

export async function login(input: LoginInput): Promise<AuthResponse> {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is authenticating users and returning user data with JWT token.
    // Should validate email/password, check if user is active, and generate a JWT token.
    return Promise.resolve({
        user: {
            id: 1,
            email: input.email,
            password_hash: 'dummy_hash',
            role: 'EMPLOYEE',
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        },
        token: 'dummy_jwt_token'
    } as AuthResponse);
}
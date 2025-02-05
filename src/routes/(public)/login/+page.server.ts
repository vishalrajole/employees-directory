import { redirect } from '@sveltejs/kit';
import {
	API_ENDPOINT,
	API_KEY,
	HTTP_STATUS,
	REFRESH_TOKEN,
	REFRESH_TOKEN_EXPIRES,
	TOKEN
} from '$lib/constants/auth';
import type { Actions } from './$types';

interface LoginActionResponse {
	success: boolean;
	email: string;
	password: string;
	errors: {
		email: string;
		password: string;
		message: string;
	};
}
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		let response: LoginActionResponse = {
			success: true,
			email: email,
			password: password,
			errors: {
				email: '',
				password: '',
				message: ''
			}
		};
		if (!email) {
			response.success = false;
			response.errors.email = 'Email is required';
		}
		if (!password) {
			response.success = false;
			response.errors.password = 'Password is required';
		}

		if (!response.success) {
			return response;
		}

		const signInResponse = await fetch(`${API_ENDPOINT}auth/sign-in`, {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-API-KEY': API_KEY
			}),

			body: JSON.stringify({ email, password })
		});
		if (signInResponse.status !== HTTP_STATUS.OK) {
			response.success = false;
			response.errors.email = '';
			response.errors.password = '';
			response.errors.message = 'Invalid credentials';
			return response;
		}

		let signInResponseData = await signInResponse.json();

		cookies.set(TOKEN, signInResponseData.token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: signInResponseData.expiresIn
		});

		cookies.set(REFRESH_TOKEN, signInResponseData.refreshToken, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: REFRESH_TOKEN_EXPIRES
		});
		if (response.success) {
			throw redirect(HTTP_STATUS.SEE_OTHER, '/employees');
		}
	}
} satisfies Actions;

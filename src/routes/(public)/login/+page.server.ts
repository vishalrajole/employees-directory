import { redirect } from '@sveltejs/kit';
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

		const signInResponse = await fetch('https://cms-api.doinstruct-test.com/auth/sign-in', {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-API-KEY': 'qEf_nbRNoUJYidPpUc0knTZ2fi2un4fveGGZSQTI8j4'
			}),

			body: JSON.stringify({ email, password })
		});
		if (signInResponse.status !== 200) {
			response.success = false;
			response.errors.email = '';
			response.errors.password = '';
			response.errors.message = 'Invalid credentials';
			return response;
		}

		let signInResponseData = await signInResponse.json();

		cookies.set('token', signInResponseData.token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: signInResponseData.expiresIn
		});
		if (response.success) {
			throw redirect(303, '/employees');
		}
	}
} satisfies Actions;

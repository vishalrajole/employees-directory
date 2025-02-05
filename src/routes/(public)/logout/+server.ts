import { json } from '@sveltejs/kit';
import { PRIVATE_API_ENDPOINT, PRIVATE_API_KEY } from '$env/static/private';
import { API_ENDPOINT, API_KEY, HTTP_STATUS, REFRESH_TOKEN, TOKEN } from '$lib/constants/auth';

export const POST = async ({ cookies, fetch }) => {
	try {
		const token = cookies.get(TOKEN);
		const refreshToken = cookies.get(REFRESH_TOKEN);

		let response;
		if (token) {
			response = await fetch(`${API_ENDPOINT}/auth/sign-out`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-API-KEY': API_KEY
				},
				body: JSON.stringify({ refreshToken })
			});
		}

		console.log('response in server', response);

		if (response && response.status !== HTTP_STATUS.NO_CONTENT) {
			return json({ success: false });
		}

		cookies.delete(TOKEN, { path: '/' });
		cookies.delete(REFRESH_TOKEN, { path: '/' });

		return json({ success: true });
	} catch (error: any) {
		return json({ error: error.message }, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
	}
};

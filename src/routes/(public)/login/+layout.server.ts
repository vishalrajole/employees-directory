import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	if (cookies.get('token')) {
		throw redirect(303, '/employees');
	}
};

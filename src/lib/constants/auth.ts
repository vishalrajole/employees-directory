import { PRIVATE_API_ENDPOINT, PRIVATE_API_KEY } from '$env/static/private';

export const REFRESH_TOKEN = 'refresh_token';
export const TOKEN = 'token';
export const REFRESH_TOKEN_EXPIRES = 1000 * 60 * 60 * 24 * 1; // 1 days
export const API_ENDPOINT = PRIVATE_API_ENDPOINT;
export const API_KEY = PRIVATE_API_KEY;

export const HTTP_STATUS = {
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
	SEE_OTHER: 303,
	NO_CONTENT: 204
};

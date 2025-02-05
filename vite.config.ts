import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()]
	// server: {
	// 	proxy: {
	// 		'/auth': {
	// 			// target: 'https://cms-api.doinstruct.com/',
	// 			target: 'https://cms-api.doinstruct-test.com/',
	// 			changeOrigin: true,
	// 			secure: false
	// 		},
	// 		'/employees': {
	// 			// target: 'https://cms-api.doinstruct.com/',
	// 			target: 'https://cms-api.doinstruct-test.com/',
	// 			changeOrigin: true,
	// 			secure: false
	// 		}
	// 	}
	// }
});

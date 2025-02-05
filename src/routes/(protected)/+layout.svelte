<script lang="ts">
	import { goto } from '$app/navigation';

	async function logout() {
		try {
			const response = await fetch('/logout', { method: 'POST' });

			if (response.ok) {
				goto('/login');
			}
		} catch (error) {
			console.error('Error logging out:', error);
		}
	}
</script>

<header class="topbar">
	<div class="logo">doInstruct</div>
	<button class="logout-btn" on:click={logout}>Logout</button>
</header>

<main class="content">
	<slot />
</main>

<style>
	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #16161c;
		color: white;
		height: 48px;
		position: sticky;
		top: 0;
		z-index: 1000;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.logout-btn {
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		font-size: 1rem;
	}

	.logout-btn:hover {
		text-decoration: underline;
	}

	.content {
		padding: 1rem;
	}
</style>

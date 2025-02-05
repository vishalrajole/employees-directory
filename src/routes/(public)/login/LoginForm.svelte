<script lang="ts">
	interface LoginFormProps {
		form: ActionData;
	}
	import { Input, Button } from '$components';
	import type { ActionData } from './$types';

	let { form }: LoginFormProps = $props();
</script>

<div>
	<h2>Login</h2>
	<form method="POST">
		<Input name="email" placeholder="Email" value={form?.email || ''} />
		{#if form && form.errors?.email}
			<p class="error">{form.errors.email}</p>
		{/if}

		<Input name="password" placeholder="Password" type="password" value={form?.password || ''} />
		{#if form && form.errors?.password}
			<p class="error">{form.errors.password}</p>
		{/if}

		{#if form && form.errors?.message}
			<p class="error">{form.errors.message}</p>
		{/if}
		<Button variant="primary" type="submit">Login</Button>
	</form>
</div>

<style>
	.error {
		color: red;
	}
</style>

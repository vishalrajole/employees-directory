<script lang="ts">
	import { writable } from 'svelte/store';

	interface InputProps {
		type?: string;
		placeholder?: string;
		value?: string;
		name?: string;
	}

	let { type = 'text', placeholder, name, value }: InputProps = $props();

	let error = writable('');
</script>

<main>
	<input {type} {name} {placeholder} bind:value />
	<p style="color: red;">{$error}</p>
</main>

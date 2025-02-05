<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		children: Snippet;
		variant?: 'primary' | 'secondary';
		onclick?: (event: MouseEvent) => void;
		type?: 'button' | 'submit';
	}
	let { children, variant = 'primary', onclick, ...props }: ButtonProps = $props();

	const buttonVariants = {
		primary: 'bg-blue-500 text-white hover:bg-blue-700',
		secondary: 'bg-gray-500 text-white hover:bg-gray-700'
	};

	let buttonClass = buttonVariants[variant] || buttonVariants.primary;
</script>

<button
	{...props}
	{onclick}
	class={`rounded-md px-4 py-2 transition-all duration-200 ${buttonClass}`}
>
	{@render children()}
</button>

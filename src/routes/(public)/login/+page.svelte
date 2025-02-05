<script lang="ts">
	import logo from '$assets/doInstruct.png';
	import LoginForm from './LoginForm.svelte';

	let { form } = $props();
</script>

<div class="container">
	<img src={logo} alt="Logo" />

	<LoginForm {form} />
</div>

<style>
	.container {
		max-width: 300px;
		margin: auto;
		text-align: center;
	}
</style>

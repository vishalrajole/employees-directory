<script lang="ts">
	import { onMount } from 'svelte';
	import Employee from './Employee.svelte';
	import { writable } from 'svelte/store';
	import { authToken } from '$lib/store';

	const employees: any = writable([]);
	let token: any;
	authToken.subscribe((value) => (token = value)); // Get the token

	console.log(token);
	const fetchEmployees = async () => {
		try {
			const res = await fetch('/employees?limit=5&offset=0', {
				headers: {
					'Content-Type': 'application/json',
					'X-API-KEY': 'qEf_nbRNoUJYidPpUc0knTZ2fi2un4fveGGZSQTI8j4',
					Authorization: `${token}`
				}
			});
			if (!res.ok) throw new Error('Failed to fetch employees');
			const data = await res.json();
			employees.set(data.rows);
		} catch (error) {
			console.error(error);
		}
	};

	onMount(fetchEmployees);
</script>

<div class="employees-container">
	<p>List of Employees</p>

	{#if $employees.length > 0}
		{#each $employees as emp}
			<Employee {emp} />
		{/each}
	{:else}
		<p>No employees added</p>
	{/if}
</div>

<style>
	.employees-container {
		max-width: 400px;
		margin: auto;
		text-align: center;
	}
</style>

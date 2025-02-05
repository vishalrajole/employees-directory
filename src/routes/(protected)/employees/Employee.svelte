<script lang="ts">
	export let emp: { firstName: string; lastName: string; active: boolean };
</script>

<div class="employee-card">
	<p>First name: {emp.firstName}</p>
	<p>Last name: {emp.lastName}</p>
	<p>Active: {emp.active ? 'Active' : 'Inactive'}</p>
</div>

<style>
	.employee-card {
		border: 1px solid #ddd;
		padding: 10px;
		margin: 5px;
		border-radius: 5px;
		background-color: #f9f9f9;
	}
</style>

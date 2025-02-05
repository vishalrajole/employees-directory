<script lang="ts">
	import { authToken } from '$lib/store';
	import { onDestroy, onMount } from 'svelte';
	import { faker } from '@faker-js/faker';
	import Employees from './Employees.svelte';
	import type { Employee, ImportStatus } from '../../../~types/Employees';

	let numberInput = '';
	let employees: Employee[] = [];

	let importStatus: ImportStatus | null = null;
	let importId: string | null = null;
	let pollingInterval: ReturnType<typeof setTimeout> | null = null;

	function generateEmployee() {
		return {
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			active: faker.datatype.boolean(),
			language: faker.helpers.arrayElement(['en']),
			employeeKey: faker.string.uuid()
		};
	}

	const fetchEmployees = async () => {
		if (!numberInput) return;

		let token: any;
		authToken.subscribe((value) => (token = value));

		try {
			const payload: { rows: Employee[] } = {
				rows: []
			};

			for (let i = 0; i < parseInt(numberInput); i++) {
				payload.rows.push(generateEmployee());
			}

			const response = await fetch(`/employees/bulk/import?number=${numberInput}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-API-KEY': 'qEf_nbRNoUJYidPpUc0knTZ2fi2un4fveGGZSQTI8j4',
					Authorization: `${token}`
				},
				body: JSON.stringify(payload)
			});

			// make a new request to know the status of bulk emport with endpoint `/employees/bulk/${response.id}`

			if (!response.ok) throw new Error('Failed to fetch');

			let responseData = await response.json();

			importId = responseData.id;
			startPolling(); // Start polling for status
		} catch (error) {
			console.error('Error fetching employees:', error);
		}

		async function checkImportStatus() {
			if (!importId) return;

			const response = await fetch(`/employees/bulk/${importId}`, {
				headers: {
					'X-API-KEY': 'qEf_nbRNoUJYidPpUc0knTZ2fi2un4fveGGZSQTI8j4',
					Authorization: `${token}`
				}
			});
			const data = await response.json();

			importStatus = data.status;

			console.log('Import Status:', importStatus);

			// Stop polling if import is finished
			if (
				importStatus === 'passed' ||
				importStatus === 'failed' ||
				importStatus === 'partly passed'
			) {
				stopPolling();
			}
			if (importStatus === 'passed') {
				// fetch list of employees
			}
		}

		function startPolling() {
			stopPolling(); // Ensure no duplicate intervals
			pollingInterval = setInterval(checkImportStatus, 5000); // Poll every 5 seconds
		}

		function stopPolling() {
			if (pollingInterval) {
				clearInterval(pollingInterval);
				pollingInterval = null;
			}
		}

		// Cleanup when component is destroyed
		onDestroy(() => stopPolling());
	};
</script>

<h1>Enter a Number</h1>
<div class="container">
	<form>
		<input type="number" bind:value={numberInput} placeholder="Enter number" />
		<button on:click={fetchEmployees}>Submit</button>
	</form>

	<Employees />
</div>

<style>
	.container {
		max-width: 400px;
		margin: auto;
		text-align: center;
	}

	input {
		padding: 8px;
		margin-right: 8px;
		width: 100px;
	}

	button {
		padding: 8px 16px;
		cursor: pointer;
	}

	table {
		margin-top: 20px;
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
	}

	th {
		background-color: #f4f4f4;
	}
</style>

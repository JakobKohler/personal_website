<script>
	import Clock from '../Clock/Clock.svelte';
	import Marquee from '../Marquee/Marquee.svelte';

	let { title, data } = $props();
</script>

<div class="departure-board-wrapper">
	<div class="board-header">
		<div class="clock-container">
			<Clock />
		</div>
		<h1 class="title">
			{title}
		</h1>
	</div>
	<table class="board-table">
		<thead>
			<tr>
				<th class="col-time">Departure</th>
				<th class="col-time">Arrival</th>
				<th class="col-station">Station</th>
				<th class="col-description">Via</th>
				<th class="col-track">Track</th>
			</tr>
		</thead>
		<tbody>
			{#each data as station, index (index)}
				<tr>
					<td class="col-time">{station.time}</td>
					<td class="col-time">{station.timeEnd}</td>
					<td class="col-station">{station.destination}</td>

					<td class="col-description">
						<div class="station-description">
							<Marquee text={station.via} />
							{#if station.delay}
								<span class="delay">
									{station.delay}
								</span>
							{/if}
						</div>
					</td>
					<td class="col-track">{station.track}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Bitcount+Single:wght@100..900&display=swap');

	.departure-board-wrapper {
		background-color: var(--db-blue);
		color: var(--db-text-light);
		border-radius: 8px;
		font-family: 'Bitcount Single', sans-serif;

	}

	.board-header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}

	.clock-container{
		justify-self: start;
		padding: .5em;
		height: 80%;
	}

	.title {
		justify-self: center;
		font-size: 1.5em;
		font-weight: 400;
	}

	.board-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1em;

		th {
			background-color: var(--db-yellow);
			text-align: left;
			padding: 0.5rem;
			color: var(--db-text-dark);
			font-weight: 500;
		}

		td {
			padding: .7em .5em;
			border-bottom: 1px solid var(--db-line-blue);
		}
	}

	.col-time,
	.col-track,
	.col-station {
		width: 1%;
		white-space: nowrap;
	}

	.col-station {
		width: 20%;
	}

	.col-time {
		background-color: var(--db-text-light);
		color: var(--db-blue);
	}

	.col-description {
		width: auto;
		max-width: 0;
	}

	.delay {
		color: var(--db-yellow);
		font-style: italic;
	}
</style>

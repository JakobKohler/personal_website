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
			{#each data as station}
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
	@import url('https://fonts.googleapis.com/css2?family=Geist+Pixel&display=swap');
	.departure-board-wrapper {
		--color-db-blue: #000080;
		--color-db-yellow: #ffff00;

		--color-text-light: #ffffff;
		--color-text-dark: #000000;
		--color-border: #1a1a80;
	}

	.departure-board-wrapper {
		background-color: var(--color-db-blue);
		color: var(--color-text-light);
		border-radius: 8px;
		font-family: 'Geist Pixel', sans-serif;
	}

	.board-header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}

	.clock-container{
		justify-self: start;
		padding: .5em;
	}

	.title {
		justify-self: center;
	}

	.board-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1.5em;

		th {
			background-color: var(--color-db-yellow);
			text-align: left;
			padding: 0.5rem;

			color: var(--color-text-dark);
		}

		td {
			padding: .7em .5em;
			border-bottom: 1px solid var(--color-border);
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
		background-color: white;
		color: var(--color-db-blue);
	}

	.col-description {
		width: auto;
		max-width: 0;
	}

	.delay {
		color: var(--color-db-yellow);
		font-style: italic;
	}
</style>

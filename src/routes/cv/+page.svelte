<script lang="ts">
	import TrainStationSign from './TrainStationSign.svelte';
	import { formatEducation, formatWork } from '$lib/utils/cv-transformers';
	import DepartureBoard from '../../lib/components/DepartureBoard/DepartureBoard.svelte';

	let { data } = $props();

	let educationStations = $derived(formatEducation(data?.cv?.education));
	let workStations = $derived(formatWork(data?.cv?.work));
</script>

<svelte:head>
    <title>Schasch - CV</title>
    <meta name="description" content="My CV" />
</svelte:head>

<div class="station-environment">
	<div class="ceiling-beam"></div>

	<div class="hanging-mount">
		<div class="cable-wrapper">
			<div class="cable"></div>
			<div class="cable"></div>
		</div>
		<div class="sign-casing">
			<TrainStationSign title="Jakob Kohler" />
		</div>
	</div>

	<div class="board-pole">
		<div class="board-casing">
			<div class="mounting-bracket left"></div>
			<div class="mounting-bracket right"></div>
			<DepartureBoard title="Stations in Education" data={educationStations} />
		</div>

		<div class="pillar mid-pillar"></div>

		<div class="board-casing">
			<div class="mounting-bracket left"></div>
			<div class="mounting-bracket right"></div>
			<DepartureBoard title="Stations in Professional Experience" data={workStations} />
		</div>

		<div class="pillar bottom-pillar"></div>
	</div>
	<div class="image-credit">
		Background by <a href="https://moyie.xyz">Moyie</a>
	</div>
</div>

<style lang="scss">
	.station-environment {
		background-image: url('/background_trains.png');
		background-size:cover;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow-x: hidden;
		position: relative;
	}

	.ceiling-beam {
		width: 100%;
		height: 20px;
		background: linear-gradient(to bottom, #111, #333, #111);
		border-bottom: 2px solid #000;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.8);
	}

	.hanging-mount {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 800px;
		margin-bottom: 4rem;
	}

	.cable-wrapper {
		display: flex;
		justify-content: space-between;
		width: 60%;
		height: 50px;
	}

	.cable {
		width: 6px;
		background: linear-gradient(to right, #444, #888 30%, #333 80%, #222);
		box-shadow: 2px 0 5px rgba(0, 0, 0, 0.6);
	}

	.sign-casing {
		width: 100%;
		background-color: #091345;
		border: 4px solid #2a2a2a;
		border-radius: 4px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
	}

	.board-pole {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 1100px;
		flex: 1;
	}

	.pillar {
		width: 120px;
		background: linear-gradient(to right, #1a1a1a, #3a3a3a 40%, #222 70%, #111);
		box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.9);
		border-left: 2px solid #444;
		border-right: 2px solid #000;
	}

	.mid-pillar {
		height: 80px;
	}
	.bottom-pillar {
		min-height: 80px;
		flex: 1;
	}

	.board-casing {
		position: relative;
		width: 95%;
		background-color: #0a0a0a;
		border: 8px solid #2c2c2e;
		border-radius: 8px;
		padding: 8px;
		box-shadow:
			0 25px 50px rgba(0, 0, 0, 0.8),
			inset 0 0 20px rgba(0, 0, 0, 0.9);

		min-width: 700px;
	}

	.mounting-bracket {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 12px;
		height: 100px;
		background: linear-gradient(to right, #333, #555, #222);
		border-radius: 3px;
		border: 1px solid #111;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
	}

	.mounting-bracket.left {
		left: -14px;
	}
	.mounting-bracket.right {
		right: -14px;
	}

	.image-credit {
		position: absolute;
		font-family: sans-serif;
		font-weight: 600;
		bottom: 10px;
		right: 10px;
		color: white;
		padding: 6px 12px;
		border-radius: 4px;
		font-size: 12px;
		opacity: .75;

		a {
			text-decoration: none;
			color: var(--db-blue)
		}
	}
</style>

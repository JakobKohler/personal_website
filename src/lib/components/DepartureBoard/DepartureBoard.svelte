<script>
	import Marquee from '../Marquee/Marquee.svelte';

	let { title } = $props();
</script>

<div class="departure-board-wrapper">
	<div class="board-header">
		<h1>{title}</h1>
	</div>
	<table class="board-table">
		<thead>
			<tr>
				<th class="col-time">Zeit</th>
				<th class="col-station">Station</th>
				<th class="col-description">Über</th>
				<th class="col-track">Gleis</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="col-time">08/2022 - today</td>
				<td class="col-station">Hochschule Karlsruhe</td>
				<td class="col-description">
					<div class="station-description">
						<Marquee
							text="Studium der Informatik -"
						/>
					</div>
				</td>
				<td class="col-track">5</td>
			</tr>
		</tbody>
	</table>
</div>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Geist+Pixel&display=swap');
	.departure-board-wrapper {
		background-color: #000080;
		color: white;
		border-radius: 8px;
		font-family: 'Geist Pixel', sans-serif;
		font-size: 1.25em;
	}

	.board-header {
		display: flex;
		justify-content: center;
	}

	.board-table {
        width: 100%;
        border-collapse: collapse;
        
        th {
            background-color: #ffff00;
            text-align: left;
            padding: 0.5rem;
            font-size: 1.2rem;
            color: black;
        }

        td {
            padding: 0.5rem;
            border-bottom: 1px solid #1a1a80;
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
        color: black;
    }

    .col-description {
        width: auto; 
        max-width: 0; 
    }
</style>

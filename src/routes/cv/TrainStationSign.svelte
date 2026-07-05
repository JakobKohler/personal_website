<script lang="ts">
	let { title } = $props();
</script>

<div class="sign-board">
	<div class="top-row">
		<h1 class="station-name">{title}</h1>
        <div class="badge">CV</div>
	</div>

	<div class="bottom-row">
		<div class="col left-col">
        			<a
				href="mailto:schasch@disroot.org"
				class="exit-arrow left"
				style="text-decoration: none; color: inherit;"
			>
				<img src="db-exit.svg" alt="Exit Icon" />
			</a>
            <div class="exit-info">
				<div class="exit-letter">MAIL</div>
				<div class="exit-text-group">
					<div><span class="exit-word">Ausgang</span><span class="exit-en">Exit</span></div>
					<div>E-Mail</div>
				</div>
			</div>
        </div>

		<div class="col right-col">
			<div class="exit-info">
				<div class="exit-letter">GH</div>
				<div class="exit-text-group">
					<div><span class="exit-word">Ausgang</span><span class="exit-en">Exit</span></div>
					<div>GitHub</div>
				</div>
			</div>
			<a
				href="https://github.com/JakobKohler"
				target="_blank"
				rel="noopener noreferrer"
				class="exit-arrow right"
				style="text-decoration: none; color: inherit;"
			>
				<img src="db-exit.svg" alt="Exit Icon" />
			</a>
		</div>
	</div>
</div>

<style lang="scss">
	.sign-board {
		font-family: 'TeX Gyre Heros';
		background-color: var(--db-blue);
		color: var(--db-text-light);
		width: 100%;
		border: 5px solid var(--db-text-light);
		box-sizing: border-box;
		overflow: hidden;
	}

	.top-row {
		display: flex;
		align-items: center;
		padding: 0.6em 1.2em;
		gap: 10px;
	}

	.station-name {
		font-size: 3em;
		font-weight: bold;
		margin: 0;
		letter-spacing: -2px;
	}

	.badge {
		background-color: var(--db-green);
		color: white;
		font-size: 1em;
		font-weight: 700;
		padding: .2em 1em;
		border-radius: 50px;
		letter-spacing: 2px;
		margin-top: 25px;
        margin-left: 10px;
	}

	.bottom-row {
		display: flex;
		border-top: 3px solid var(--db-line-blue);
		height: 10vh;
	}

	.col {
		display: flex;
		align-items: center;
		padding: 0 30px;
	}

	.left-col {
		flex: 1;
		border-right: 3px solid var(--db-line-blue);
		gap: 10px;
		justify-content: flex-start;
	}

	.right-col {
		flex: 1;
		gap: 10px;
		justify-content: flex-end;
	}

	.exit-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: 5px;
	}

	.exit-letter {
		background-color: var(--db-text-light);
		color: var(--db-blue);
		font-weight: bold;
		font-size: 0.6em;
		padding: 0.1em 1em;
		border-radius: 20px;
		align-self: flex-start;
		margin-bottom: 5px;
	}

	.right-col .exit-letter {
		align-self: flex-end;
	}

	.exit-text-group {
		font-size: 0.9em;
		line-height: 1.2;
		font-weight: 500;
	}

	.right-col .exit-text-group {
		text-align: right;
	}

	.exit-word {
		font-weight: bold;
	}

	.exit-en {
		font-style: italic;
		font-weight: normal;
		margin-left: 5px;
	}

	.exit-arrow {
		width: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

    .exit-arrow.left {
        img {
            transform: scaleX(-1);
        }
    }
</style>

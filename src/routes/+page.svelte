<script>
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Schasch</title>
	<meta name="description" content="Personal page" />
</svelte:head>

<div class="page-wrapper">
	<main class="container">
		<div class="content">
			<h1>Welcome</h1>
			<p>This page is currently under construction</p>

			<a href={resolve('/cv')} class="cv-button">
				Check out my CV
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="5" y1="12" x2="19" y2="12"></line>
					<polyline points="12 5 19 12 12 19"></polyline>
				</svg>
			</a>
		</div>
	</main>
</div>
<!-- Idea, traffic style -->
<style>
	.page-wrapper {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.container {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	}

	.content {
		max-width: 900px;
	}

	h1 {
		font-size: 4rem;
		margin-bottom: 0.5rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	p {
		font-size: 1.25rem;
		color: #a0a0a0;
		margin-bottom: 2.5rem;
		line-height: 1.6;
	}

	.cv-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--text-dark);
		color: var(--bg-light);
		padding: 0.85rem 1.75rem;
		border-radius: 8px;
		text-decoration: none;
		font-weight: 600;
		font-size: 1.1rem;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.cv-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
	}
</style>

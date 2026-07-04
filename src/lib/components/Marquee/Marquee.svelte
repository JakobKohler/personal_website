<script lang="ts">
	let { text = '' } = $props();

	let containerRef: HTMLDivElement;
	let isOverflowing = $state(false);
  let animationDuration = $state(24);

	$effect(() => {
		if (!containerRef) return;

		const checkOverflow = () => {
			if (isOverflowing) {
				isOverflowing = containerRef.scrollWidth / 2 > containerRef.clientWidth;
			} else {
				isOverflowing = containerRef.scrollWidth > containerRef.clientWidth;
			}
		};

    animationDuration = containerRef.scrollWidth / 70

		checkOverflow();

		const observer = new ResizeObserver(() => {
			checkOverflow();
		});

		observer.observe(containerRef);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="marquee-window" bind:this={containerRef} style="--animation-duration: {animationDuration}s;">
	<div class="marquee-track" class:is-scrolling={isOverflowing}>
		<span class="marquee-text">{text}</span>

		{#if isOverflowing}
			<span class="marquee-text" aria-hidden="true">+++ {text} +++</span>
		{/if}
	</div>
</div>

<style>
	.marquee-window {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}

	.marquee-track {
		display: inline-block;
	}

	.is-scrolling {
		animation: seamless-scroll var(--animation-duration) linear infinite;
	}

	.marquee-text {
		display: inline-block;
	}

	.is-scrolling .marquee-text {
		padding-right: 0;
	}

	@keyframes seamless-scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>

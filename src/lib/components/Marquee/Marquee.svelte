<script lang="ts">
  let { text = '' } = $props();

  let containerRef: HTMLDivElement; 
  let isOverflowing = $state(false);

  $effect(() => {
    if (!containerRef) return;

    const checkOverflow = () => {
      isOverflowing = containerRef.scrollWidth > containerRef.clientWidth;
    };

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

<div class="marquee-window" bind:this={containerRef}>
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
    animation: seamless-scroll 15s linear infinite;
  }

  .marquee-text {
    display: inline-block;
  }

  .is-scrolling .marquee-text {
    padding-right: 0; 
  }

  @keyframes seamless-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>
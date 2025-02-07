<style>
  @import './index.css';
</style>

<div class="background" id="background"></div>
    <div class="content">
        <h1>Under Construction</h1>
        <p>This page is currently being built. Please check back later.</p>
        <p>In the meantime, you can find a replacement <a href="https://startpage.schasch.xyz">here</a>.</p>
    </div>

    <script>
        import { onMount } from 'svelte';

        onMount(() => {
            const background = document.getElementById('background');

            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                background.style.transform = `translate(-${x / 15}%, -${y / 15}%)`;
            });
        });
    </script>
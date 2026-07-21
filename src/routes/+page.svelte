<script lang="ts">
	import { resolve } from '$app/paths';

	type Star = {
        x: number;
        y: number;
        r: number;
        baseAlpha: number;
        twinkleRange: number;
        speed: number;
        phase: number;
    };

    type ShootingStar = {
        x: number;
        y: number;
        dx: number;
        dy: number;
        trailLength: number;
        duration: number;
        elapsed: number;
    };

    let canvasRef: HTMLCanvasElement;

    $effect(() => {
        if (!canvasRef) return;

        const ctx = canvasRef.getContext('2d');
        if (!ctx) return;

        let stars: Star[] = [];
        let shootingStars: ShootingStar[] = [];
        let lastFrameTime = 0;
        let nextSpawnIn = 0;
        let animationFrameId: number;

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const config = {
            starCount: 230,
            minSpawnDelay: 4000,
            maxSpawnDelay: 9000,
            minDuration: 700,
            maxDuration: 1100,
            trailLength: 180
        };

        function scheduleNextSpawn() {
            nextSpawnIn = config.minSpawnDelay + Math.random() * (config.maxSpawnDelay - config.minSpawnDelay);
        }

        function resize() {
            if (!canvasRef) return;
            canvasRef.width = window.innerWidth;
            canvasRef.height = window.innerHeight;
            buildStars();
            shootingStars = [];
            scheduleNextSpawn();
        }

        function buildStars() {
            if (!canvasRef) return;
            stars = Array.from({ length: config.starCount }, () => ({
                x: Math.random() * canvasRef.width,
                y: Math.random() * canvasRef.height,
                r: Math.random() * 1.2 + 0.2,
                baseAlpha: Math.random() * 0.55 + 0.2,
                twinkleRange: Math.random() * 0.35 + 0.08,
                speed: Math.random() * 0.9 + 0.25,
                phase: Math.random() * Math.PI * 2
            }));
        }

        function spawnShootingStar() {
            if (!canvasRef) return;
            const travel = Math.min(Math.max(canvasRef.width * 0.28, 140), 260);
            const duration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);
            shootingStars = [
                {
                    x: Math.random() * canvasRef.width * 0.65,
                    y: Math.random() * canvasRef.height * 0.35,
                    dx: travel,
                    dy: travel * (Math.random() * 0.35 + 0.45),
                    trailLength: config.trailLength + Math.random() * 60,
                    duration,
                    elapsed: 0
                }
            ];
        }

        function updateShootingStars(deltaMs: number) {
            if (motionQuery.matches) {
                shootingStars = [];
                return;
            }

            nextSpawnIn -= deltaMs;
            if (shootingStars.length === 0 && nextSpawnIn <= 0) {
                spawnShootingStar();
                scheduleNextSpawn();
            }

            shootingStars = shootingStars.filter((star) => {
                star.elapsed += deltaMs;
                return star.elapsed < star.duration;
            });
        }

        function drawStars(now: number) {
            if (!ctx) return;
            stars.forEach((star) => {
                const alpha = Math.max(
                    0.12,
                    Math.min(1, star.baseAlpha + Math.sin(now * 0.0012 * star.speed + star.phase) * star.twinkleRange)
                );

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(40,55%,68%,${alpha})`;
                ctx.fill();
            });
        }

        function drawShootingStars() {
            if (!ctx) return;
            shootingStars.forEach((star) => {
                const progress = star.elapsed / star.duration;
                const x = star.x + star.dx * progress;
                const y = star.y + star.dy * progress;
                const tailX = x - star.trailLength * 0.92;
                const tailY = y - star.trailLength * 0.48;
                const gradient = ctx.createLinearGradient(x, y, tailX, tailY);
                const alpha = (1 - progress) * 0.9;

                gradient.addColorStop(0, `hsla(43, 95%, 78%, ${alpha})`);
                gradient.addColorStop(0.35, `hsla(40, 90%, 72%, ${alpha * 0.55})`);
                gradient.addColorStop(1, 'hsla(40, 90%, 72%, 0)');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(x, y, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(45, 100%, 88%, ${Math.max(alpha, 0.2)})`;
                ctx.fill();
            });
        }

        function draw(now: number) {
            if (!ctx || !canvasRef) return;
            const deltaMs = lastFrameTime ? Math.min(now - lastFrameTime, 32) : 16;
            lastFrameTime = now;

            updateShootingStars(deltaMs);
            ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
            drawStars(now);
            drawShootingStars();
            
            animationFrameId = requestAnimationFrame(draw); 
        }

        const handleMotionChange = () => {
            shootingStars = [];
            scheduleNextSpawn();
        };

        window.addEventListener('resize', resize);
        motionQuery.addEventListener('change', handleMotionChange);
        resize();
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', resize);
            motionQuery.removeEventListener('change', handleMotionChange);
            cancelAnimationFrame(animationFrameId);
        };
    });
</script>

<svelte:head>
	<title>Schasch</title>
	<meta name="description" content="Personal page" />
</svelte:head>
<canvas id="stars" bind:this={canvasRef}></canvas>
<div class="page-wrapper">
    <main class="container">
        <div class="content">
            <h1>Jakob's Stuff</h1>
            <p class="subtitle">🚧 This website is under construction 🚧</p>

            <div class="action-section">
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
        </div>
    </main>
</div>

<style>
    :root {
        --text-light: #f3f4f6;
        --text-muted: #9ca3af;
        --text-dark: #111827;
        --bg-light: #f9fafb;
        --accent: rgb(212, 175, 55);
    }

    .page-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        color: var(--text-light, #f3f4f6);
        align-items: center;
        justify-content: center;
		font-family: Roboto, sans-serif;
    }

    .container {
        width: 100%;
        max-width: 650px; 
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: rgba(34, 34, 34, 0.274);
        border-radius: 20px;
        padding: 3rem 2rem;
        box-shadow: 0 5px 120px rgba(151, 129, 29, 0.062);
        backdrop-filter: blur(2px);
		border: 2px solid rgba(80, 80, 80, 0.274);
    }

    .content {
        width: 100%;
    }

    h1 {
        font-size: 2.5rem;
        margin-bottom: 0.25rem;
        font-weight: 900;
        letter-spacing: 0.05em;
    }

    .subtitle {
        font-size: 1.1rem;
        color: var(--text-muted, #9ca3af);
        margin-bottom: 2rem;
		font-style: italic;
    }

    section {
        margin-bottom: 2rem;
    }

    h2 {
        font-size: 1.2rem;
        color: var(--accent);
        margin-bottom: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .info-section p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin: 0;
    }

    .tags {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        justify-content: center;
    }

    .tags li {
        background-color: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.4rem 1rem;
        border-radius: 999px;
        font-size: 0.95rem;
        transition: border-color 0.2s ease;
    }

    .links-grid {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .links-grid a {
        color: var(--text-light);
        text-decoration: none;
        font-weight: 500;
        border-bottom: 2px solid transparent;
        padding-bottom: 2px;
        transition: all 0.2s ease;
    }

    .links-grid a:hover {
        color: var(--accent);
        border-bottom-color: var(--accent);
    }

    .action-section {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .cv-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--accent);
        color: var(--text-dark);
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
    }

    canvas {
        display: block;
        width: 100vw;
        height: 100vh;
        background-color: #000;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    }

    @media (max-width: 480px) {
        .container {
            padding: 2rem 1.5rem;
        }
        h1 {
            font-size: 2rem;
        }
    }
</style>

<!-- Idea, traffic style -->
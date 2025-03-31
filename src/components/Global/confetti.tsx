import { useEffect, useRef } from "react";

const Confetti = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let W = window.innerWidth;
    let H = window.innerHeight;
    const maxConfettis = 150;
    const particles: any[] = [];

    const possibleColors = [
        "DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue",
        "Gold", "Violet", "PaleGreen", "SteelBlue", "SandyBrown",
        "Chocolate", "Crimson"
    ];

    function randomFromTo(from: number, to: number) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    class ConfettiParticle {
        x: number;
        y: number;
        r: number;
        d: number;
        color: string;
        tilt: number;
        tiltAngleIncremental: number;
        tiltAngle: number;

        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H - H;
            this.r = randomFromTo(11, 33);
            this.d = Math.random() * maxConfettis + 11;
            this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
            this.tilt = Math.floor(Math.random() * 33) - 11;
            this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
            this.tiltAngle = 0;
        }

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + this.r / 3, this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
            ctx.stroke();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = W;
        canvas.height = H;

        for (let i = 0; i < maxConfettis; i++) {
            particles.push(new ConfettiParticle());
        }

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            for (let i = 0; i < maxConfettis; i++) {
                particles[i].draw(ctx);
            }

            for (let i = 0; i < maxConfettis; i++) {
                const particle = particles[i];

                particle.tiltAngle += particle.tiltAngleIncremental;
                particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
                particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

                if (particle.y > H) {
                    particle.x = Math.random() * W;
                    particle.y = -30;
                    particle.tilt = Math.floor(Math.random() * 10) - 20;
                }
            }

            requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        };

        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" />;
};

export default Confetti;
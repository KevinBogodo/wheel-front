import React, { useRef, useEffect, useState } from 'react';
import SpinButton from './spin-button';
import './SpinWheel.css';

interface SpinWheelProps {
  winningNumber: number;
  className?: string;
  start: boolean
  setStart: (state: boolean) => void;
}

interface Segment {
  number: number;
  color: string;
}

const SpinWheel: React.FC<SpinWheelProps> = ({ winningNumber, className, start, setStart }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [winner, setWinner] = useState<number | null>(winningNumber);
  const [winnerColor, setWinnerColor] = useState<string | null>('radial-gradient(circle, #f9e547 0%, #e7d323 40%, #b6a71d 100%)');
  const [isSpinning, setIsSpinning] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 800 });

  console.log("winningNumber: ", winningNumber);
  
  // Fonction pour ajuster la taille du canvas en fonction du conteneur
  const resizeCanvas = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      
      // On garde un aspect carré pour le canvas
      setCanvasSize({
        width: containerWidth,
        height: containerWidth
      });
    }
  };

  // Ajouter un écouteur de redimensionnement
  useEffect(() => {
    resizeCanvas(); // Taille initiale
    
    const handleResize = () => {
      resizeCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redessiner le canvas lorsque sa taille change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Mettre à jour les dimensions du canvas
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    
    // Redessiner la roue avec la nouvelle taille
    const initialRotation = getInitialRotation(winningNumber);
    drawWheel(ctx, initialRotation);
  }, [canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set winner immediately when component mounts
    setWinner(winningNumber);
    setWinnerColor(getColorForSegment(winningNumber));
    
    // Initial rotation to position winning number at the pointer
    const initialRotation = getInitialRotation(winningNumber);
    drawWheel(ctx, initialRotation);
  }, []);

  // Standard European roulette wheel sequence (clockwise)
  const wheelSequence = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
  ];

  // Create segments using the correct sequence
  const segments: Segment[] = wheelSequence.map(num => ({
    number: num,
    color: getColorForSegment(num)
  }));

  // Function to determine the color based on the number
  function getColorForSegment(num: number): string {
    if (num === 0) {
      return "#00AA33"; // Green for 0
    }
    
    // Red numbers in European roulette: 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? "#CC0000" : "#000000"; // Red or Black
  }

  // Find the index of the winning number
  const getWinningIndex = (winNum: number) => {
    return segments.findIndex(seg => seg.number === winNum);
  };

  // Calculate initial rotation to position winning number at the top
  const getInitialRotation = (winNum: number) => {
    const numSegments = segments.length;
    const angleStep = 2 * Math.PI / numSegments;
    const winningIndex = getWinningIndex(winNum);
    
    if (winningIndex === -1) return 0;
    
    // Position so the winning segment is at the top (Math.PI/2 is the top)
    return Math.PI/2 - (winningIndex * angleStep + angleStep / 2);
  };

  // Draw wheel shadow - REDUCED
  const drawWheelShadow = (ctx: CanvasRenderingContext2D, radius: number, borderWidth: number) => {
    ctx.save();
    
    // Create a more subtle shadow around the wheel
    // Similar to but softer than: box-shadow: 0px 0px 40px 10px rgba(9, 9, 9, 0.921);
    const shadowSize = 25; // Reduced from 40 to 25
    const totalRadius = radius + borderWidth + shadowSize;
    
    // Create a radial gradient for the shadow
    const shadowGradient = ctx.createRadialGradient(
      0, 0, radius + borderWidth - 5, // Inner radius just inside the border
      0, 0, totalRadius // Outer radius includes shadow
    );
    
    shadowGradient.addColorStop(0, 'rgba(9, 9, 9, 0.5)'); // Reduced opacity from 0.921 to 0.5
    shadowGradient.addColorStop(0.4, 'rgba(9, 9, 9, 0.3)'); // Reduced opacity
    shadowGradient.addColorStop(0.8, 'rgba(9, 9, 9, 0.1)'); // Reduced opacity
    shadowGradient.addColorStop(1, 'rgba(9, 9, 9, 0)'); // Fade to transparent
    
    // Draw the shadow as a ring around the wheel
    ctx.beginPath();
    ctx.arc(0, 0, totalRadius, 0, 2 * Math.PI);
    ctx.arc(0, 0, radius + borderWidth - 5, 0, 2 * Math.PI, true); // Cut out the inside
    ctx.fillStyle = shadowGradient;
    ctx.fill();
    
    ctx.restore();
  };

  // Draw gold border
  const drawGoldBorder = (ctx: CanvasRenderingContext2D, radius: number) => {
    const borderWidth = radius * 0.05; // Width of the gold border proportional to radius
    
    ctx.save();
    
    // Draw the wheel shadow first (behind everything)
    drawWheelShadow(ctx, radius, borderWidth);
    
    // Gold border with gradient similar to winnerCircle
    const goldGradient = ctx.createRadialGradient(
      0, 0, radius,
      0, 0, radius + borderWidth
    );
    goldGradient.addColorStop(0, '#f9e547');
    goldGradient.addColorStop(0.4, '#e7d323');
    goldGradient.addColorStop(1, '#b6a71d');
    
    ctx.beginPath();
    ctx.arc(0, 0, radius + borderWidth, 0, 2 * Math.PI);
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = goldGradient;
    ctx.fill();
    
    // Add thin border
    ctx.beginPath();
    ctx.arc(0, 0, radius + borderWidth, 0, 2 * Math.PI);
    ctx.lineWidth = radius * 0.01; // Proportional line width
    ctx.strokeStyle = '#d4b923';
    ctx.stroke();
    
    // Inner border
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.lineWidth = radius * 0.01; // Proportional line width
    ctx.strokeStyle = '#d4b923';
    ctx.stroke();
    
    // Add inner highlights
    const innerHighlight = ctx.createRadialGradient(
      0, 0, radius,
      0, 0, radius + borderWidth
    );
    innerHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    innerHighlight.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
    innerHighlight.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
    
    ctx.beginPath();
    ctx.arc(0, 0, radius + borderWidth, 0, 2 * Math.PI);
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = innerHighlight;
    ctx.fill();
    
    ctx.restore();
  };

  // Draw the wheel
  const drawWheel = (ctx: CanvasRenderingContext2D, rotationAngle: number = 0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const numSegments = segments.length;
    const angleStep = 2 * Math.PI / numSegments;
    const radius = (Math.min(canvas.width, canvas.height) / 2) - (canvas.width * 0.04); // Proportional

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);

    // Draw gold border first (behind the wheel)
    // drawGoldBorder(ctx, radius);

    // Draw the segments
    for (let i = 0; i < numSegments; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angleStep * i + rotationAngle, angleStep * (i + 1) + rotationAngle);
      ctx.lineTo(0, 0);
      ctx.fillStyle = segments[i].color;
      ctx.lineWidth = canvas.width * 0.001; // Proportional line width
      ctx.fill();
      ctx.stroke();
    }

    // Add the numbers with responsive font size
    const fontSize = Math.max(canvas.width * 0.035, 12); // Min font size of 12px
    
    for (let i = 0; i < numSegments; i++) {
      const angle = angleStep * i + rotationAngle + angleStep / 2;
      const textRadius = radius - (radius * 0.07); // Proportional text placement
      const x = Math.cos(angle) * textRadius;
      const y = Math.sin(angle) * textRadius;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI/2); // Rotate text to be readable from outside
      ctx.fillStyle = "white";
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(segments[i].number.toString(), 0, 0);
      ctx.restore();
    }

    // Draw inner rim
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.lineWidth = canvas.width * 0.003; // Proportional line width
    // ctx.strokeStyle = "#DDD";
    // ctx.stroke();

    ctx.restore();
  };

  // Draw the initial wheel with proper positioning
  useEffect(() => {
    // Set winner immediately when component mounts
    setWinner(winningNumber);
    setWinnerColor(getColorForSegment(winningNumber));
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    
    // Initial rotation to position winning number at the pointer
    const initialRotation = getInitialRotation(winningNumber);
    drawWheel(ctx, initialRotation);
  }, [winningNumber]);  // Redraw when winningNumber changes

  // Function to animate the wheel
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    setWinnerColor('radial-gradient(circle, #f9e547 0%, #e7d323 40%, #b6a71d 100%)');
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find the index of the winning number
    const winningIndex = getWinningIndex(winningNumber);
    if (winningIndex === -1) {
      console.error(`Winning number ${winningNumber} not found in wheel segments`);
      setIsSpinning(false);
      return;
    }
    
    const numSegments = segments.length;
    const angleStep = 2 * Math.PI / numSegments;
    
    // Animation parameters
    const totalRotation = 2 * Math.PI * (Math.floor(Math.random() * 5) + 5);
    const totalDuration = 18000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / totalDuration, 1);
      
      // Ease-out function for natural slowing down
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      
      // Calculate current rotation
      const currentRotation = totalRotation * easedProgress;
      
      // Adjust rotation so the winning segment arrives precisely at the top
      const preciseFinalRotation = currentRotation -
          (winningIndex * angleStep + angleStep / 2 - Math.PI / 2);
      
      // Draw the wheel
      drawWheel(ctx, preciseFinalRotation);

      // Continue animation or stop
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setWinner(winningNumber);
        setWinnerColor(getColorForSegment(winningNumber));
        setIsSpinning(false);
        setStart(false);
      }
    };

    // Start animation
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (start) {
        spinWheel();
    }
  }, [start]);
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[800px] mx-auto ${className || ''}`}
    >
      {/* Image de la roue en arrière-plan */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-contain"
        style={{ 
          backgroundImage: 'url(/wheel01.png)',
          width: '120%', 
          height: '120%', 
          left: '-10%', 
          top: '-10%',
          zIndex: 0 
        }}
      ></div>
      
      
      {/* Canvas centré */}
      <canvas 
        ref={canvasRef} 
        id="wheel" 
        className="relative w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Pointeur avec taille responsive */}
      <div 
        id="pointer" 
        style={{
          zIndex: 10,
          fontSize: `calc(${Math.min(canvasSize.width, canvasSize.height)}px * 0.04)`
        }}
      ></div>
     
      
      {/* Conteneur pour wheel02.png qui entoure le winnerCircle */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          zIndex: 998,
          width: '25%',
          height: '25%',
          backgroundImage: 'url(/wheel02.png)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Cercle du gagnant avec taille responsive */}
        <div 
          // id="winnerCircle" 
          style={{ 
            zIndex: 999,
            width: '94%',
            height: '95%',
            fontSize: `calc(${Math.min(canvasSize.width, canvasSize.height)}px * 0.12)`,
            // backgroundColor: winnerColor || 'radial-gradient(circle, #f9e547 0%, #e7d323 40%, #b6a71d 100%)',
            background: winnerColor || 'radial-gradient(circle, #f9e547 0%, #e7d323 40%, #b6a71d 100%)',

            borderRadius: '50%',
            // border: '4px solid #d4b923',
            boxShadow: `
              0px 0px 20px 10px rgba(28, 28, 28, 0.8),
              inset 0px 0px 10px 5px rgba(255, 255, 255, 0.3)
            `,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff', // texte blanc sur fond noir
            textShadow: '0px 1px 2px rgba(255, 255, 255, 0.5)',
            transition: 'all 0.2s ease-in-out',
          }}
          className='animate-pop_in'
        >
          {winner !== null ? winner : ''}
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
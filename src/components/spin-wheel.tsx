import React, { useRef, useEffect, useState } from 'react';
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

    // Draw the segments
    for (let i = 0; i < numSegments; i++) {
  const startAngle = angleStep * i + rotationAngle;
  const endAngle = angleStep * (i + 1) + rotationAngle;
  const segment = segments[i];
  
  // Segment principal
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, radius, startAngle, endAngle);
  ctx.lineTo(0, 0);
  ctx.fillStyle = segment.color;
  ctx.fill();
  
  // Gradient interne pour créer de la profondeur avec ombre subtile
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, radius, startAngle, endAngle);
  ctx.lineTo(0, 0);
  
  const depthGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
  depthGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)'); // Centre légèrement plus clair
  depthGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)'); // Milieu transparent
  depthGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)'); // Bord avec ombre légère
  
  ctx.fillStyle = depthGradient;
  ctx.fill();
  
  // Bordure dorée métallique
  ctx.lineWidth = canvas.width * 0.002;
  ctx.strokeStyle = '#ffd700';
  ctx.shadowColor = 'rgba(255, 215, 0, 0.3)';
  ctx.shadowBlur = 3;
  ctx.stroke();
  
  // Réinitialiser les effets d'ombre
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
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
      className={`relative w-full aspect-square max-w-[1000px] mx-auto ${className || ''}`}
    >
      {/* Bordure gold métallique casino */}
      <div className="relative w-full h-full">
        {/* Bordure extérieure avec effet gold métallique */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(
              from 0deg,
              #FFD700 0deg,
              #FFA500 30deg,
              #FFD700 60deg,
              #B8860B 90deg,
              #FFD700 120deg,
              #FFA500 150deg,
              #FFD700 180deg,
              #B8860B 210deg,
              #FFD700 240deg,
              #FFA500 270deg,
              #FFD700 300deg,
              #B8860B 330deg,
              #FFD700 360deg
            )`,
            boxShadow: `
              0 0 20px rgba(255, 215, 0, 0.6),
              0 0 40px rgba(255, 215, 0, 0.4),
              0 0 60px rgba(255, 215, 0, 0.2),
              inset 0 0 20px rgba(255, 215, 0, 0.3)
            `,
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
            padding: '1%'
          }}
        >
            {/* Canvas container avec bordure finale */}
            <div 
              className="w-full h-full rounded-full"
            >
              <canvas 
                ref={canvasRef} 
                id="wheel" 
                className="relative w-full h-full"
                style={{ 
                  zIndex: 1,
                  borderRadius: '50%',
                  boxShadow: `
                    inset 0 0 20px rgba(0, 0, 0, 0.8),
                    0 0 10px rgba(255, 215, 0, 0.3)
                  `
                }}
              />
            </div>
          </div>
      </div>

      {/* Pointeur avec taille responsive */}
      {/* Pointeur premium avec taille responsive */}
      <div 
        id="pointer" 
        style={{
          zIndex: 10,
          fontSize: `calc(${Math.min(canvasSize.width, canvasSize.height)}px * 0.04)`
        }}
      ></div>

      <style jsx>{`
        /* Style du pointeur premium */
        #pointer {
          position: absolute;
          left: 50%;
          margin-top: -6%;
          transform: translateX(-50%); 
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-bottom: 40px solid #ffd700;
          box-shadow
          z-index: 10;
          
          /* Effet 3D subtil */
          filter: 
            drop-shadow(0 10px 10px rgba(0, 0, 0, 0.5))
            drop-shadow(0 0 11px rgba(255, 215, 0, 0.3));
        }
        
        /* Contour doré pour définir la forme */
        #pointer::after {
          content: '';
          position: absolute;
          left: -22px;
          top: -2px;
          width: 0;
          height: 0;
          border-left: 22px solid transparent;
          border-right: 22px solid transparent;
          border-bottom: 44px solid rgba(255, 215, 0, 0.2);
          z-index: -1;
        }
      `}</style>
     
      {/* Conteneur luxueux pour wheel02.png qui entoure le winnerCircle */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ 
          zIndex: 998,
          width: '25%',
          height: '25%',
          backgroundImage: `url('${import.meta.env.BASE_URL}wheel02.jpg')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))',
          animation: 'pulse 2s infinite alternate'
        }}
      >
        {/* Cercle du gagnant avec design casino premium */}
        <div 
          style={{ 
            zIndex: 999,
            width: '94%',
            height: '95%',
            fontSize: `calc(${Math.min(canvasSize.width, canvasSize.height)}px * 0.12)`,
            background: winnerColor || `
              radial-gradient(circle at 30% 30%, #fff 0%, #ffd700 20%, #ffb300 40%, #ff8c00 60%, #cc6600 80%, #994400 100%),
              linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%, rgba(0, 0, 0, 0.2) 100%)
            `,
            borderRadius: '50%',
            boxShadow: `
              0 0 0 3px #ffd700,
              0 0 0 6px rgba(255, 215, 0, 0.3),
              0 0 40px 15px rgba(255, 215, 0, 0.6),
              inset 0 0 0 2px rgba(255, 255, 255, 0.4),
              inset 0 0 20px 5px rgba(255, 255, 255, 0.2),
              inset 0 -10px 20px 0px rgba(0, 0, 0, 0.3)
            `,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textShadow: `
              0 0 10px rgba(255, 215, 0, 0.8),
              0 0 20px rgba(255, 215, 0, 0.6),
              0 0 30px rgba(255, 215, 0, 0.4),
              2px 2px 4px rgba(0, 0, 0, 0.8)
            `,
            fontWeight: 'bold',
            fontFamily: 'serif',
            letterSpacing: '0.05em',
            position: 'relative',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            animation: winner !== null ? 'winnerReveal 0.8s ease-out forwards, winnerGlow 1.5s ease-in-out infinite alternate 0.8s' : 'none',
            transform: winner !== null ? 'scale(1.1)' : 'scale(1)',
            opacity: 1
          }}
          className={winner !== null ? 'animate-winner-entrance' : ''}
        >
          {/* Effet de particules dorées qui apparaissent avec le gagnant */}
          {winner !== null && (
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `
                  radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.8) 0%, transparent 10%),
                  radial-gradient(circle at 80% 30%, rgba(255, 215, 0, 0.6) 0%, transparent 8%),
                  radial-gradient(circle at 60% 80%, rgba(255, 215, 0, 0.7) 0%, transparent 12%),
                  radial-gradient(circle at 30% 70%, rgba(255, 215, 0, 0.5) 0%, transparent 6%)
                `,
                animation: 'sparkle 2s ease-in-out infinite alternate',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />
          )}
          
          {/* Contenu du gagnant avec animation spectaculaire */}
          <span style={{ 
            position: 'relative', 
            zIndex: 1,
            transform: winner !== null ? 'scale(1) rotateY(0deg)' : 'scale(0.5) rotateY(180deg)',
            opacity: winner !== null ? 1 : 0,
            transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            display: 'inline-block'
          }}>
            {winner !== null ? winner : ''}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes winnerReveal {
          0% {
            transform: scale(0.3) rotate(-180deg);
            opacity: 0;
            box-shadow: 
              0 0 0 0px #ffd700,
              0 0 0 0px rgba(255, 215, 0, 0.3),
              0 0 0px 0px rgba(255, 215, 0, 0.6);
          }
          50% {
            transform: scale(1.3) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.1) rotate(0deg);
            opacity: 1;
            box-shadow: 
              0 0 0 3px #ffd700,
              0 0 0 6px rgba(255, 215, 0, 0.3),
              0 0 40px 15px rgba(255, 215, 0, 0.6),
              inset 0 0 0 2px rgba(255, 255, 255, 0.4),
              inset 0 0 20px 5px rgba(255, 255, 255, 0.2),
              inset 0 -10px 20px 0px rgba(0, 0, 0, 0.3);
          }
        }
        
        @keyframes winnerGlow {
          0% {
            box-shadow: 
              0 0 0 3px #ffd700,
              0 0 0 6px rgba(255, 215, 0, 0.3),
              0 0 40px 15px rgba(255, 215, 0, 0.6),
              inset 0 0 0 2px rgba(255, 255, 255, 0.4),
              inset 0 0 20px 5px rgba(255, 255, 255, 0.2),
              inset 0 -10px 20px 0px rgba(0, 0, 0, 0.3);
          }
          100% {
            box-shadow: 
              0 0 0 3px #ffd700,
              0 0 0 6px rgba(255, 215, 0, 0.6),
              0 0 60px 25px rgba(255, 215, 0, 0.8),
              inset 0 0 0 2px rgba(255, 255, 255, 0.6),
              inset 0 0 30px 10px rgba(255, 255, 255, 0.3),
              inset 0 -10px 20px 0px rgba(0, 0, 0, 0.3);
          }
        }
        
        @keyframes sparkle {
          0% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
        
        @keyframes shimmer {
          0% {
            opacity: 0;
            transform: translateX(-100%) rotate(45deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(200%) rotate(45deg);
          }
        }
        
        @keyframes pulse {
          0% {
            filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.4));
          }
          100% {
            filter: drop-shadow(0 0 50px rgba(255, 215, 0, 0.7));
          }
        }
      `}</style>
    </div>
  );
};

export default SpinWheel;
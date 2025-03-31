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
  const [winner, setWinner] = useState<number | null>(winningNumber);
  const [isSpinning, setIsSpinning] = useState(false);

  console.log("winningNumber: ", winningNumber);
  

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
    const radius = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(radius, radius);

    // Draw the segments
    for (let i = 0; i < numSegments; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angleStep * i + rotationAngle, angleStep * (i + 1) + rotationAngle);
      ctx.lineTo(0, 0);
      ctx.fillStyle = segments[i].color;
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
    }

    // Add the numbers
    for (let i = 0; i < numSegments; i++) {
      const angle = angleStep * i + rotationAngle + angleStep / 2;
      const textRadius = radius - 40;
      const x = Math.cos(angle) * textRadius;
      const y = Math.sin(angle) * textRadius;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI/2); // Rotate text to be readable from outside
      ctx.fillStyle = "white";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(segments[i].number.toString(), 0, 0);
      ctx.restore();
    }

    // Draw outer rim
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#DDD";
    ctx.stroke();

    ctx.restore();
  };

  // Draw the initial wheel with proper positioning
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set winner immediately when component mounts
    setWinner(winningNumber);
    
    // Initial rotation to position winning number at the pointer
    const initialRotation = getInitialRotation(winningNumber);
    drawWheel(ctx, initialRotation);
  }, [winningNumber]);  // Redraw when winningNumber changes

  // Function to animate the wheel
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    
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
    <div className={`spin-wheel-container ${className || ''}`}>
      <canvas ref={canvasRef} id="wheel" width={700} height={700} />
      <div id="pointer"></div>
      <div id="winnerCircle">{winner !== null ? winner : ''}</div>
    </div>
  );
};

export default SpinWheel;
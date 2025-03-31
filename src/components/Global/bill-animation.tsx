import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

import k5 from '@/assets/images/10k.png';

type props = {
  setIsJackpot: (status: boolean) => void
}

const BillAnimation = ({setIsJackpot}: props) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsJackpot(false);
        setIsVisible(true);
      }, 15000);
    }, 30000);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const billWidth = 90;
  const billHeight = 40;
  const columns = Math.floor(dimensions.width / billWidth);
  const rows = Math.floor(dimensions.height / billHeight);
  const totalBills = columns * rows;
  return (
    <div className="fixed inset-0 flex justify-center items-start z-[48]" style={{ top: '10%', left: '5%' }}>
      <motion.div
        ref={containerRef}
        className="relative flex flex-wrap"
        // style={{ width: "50vw", height: "50vh" }}
        style={{ width: "70vw", height: "45vh", gridTemplateColumns: `repeat(${columns}, ${billWidth}px)`, gridTemplateRows: `repeat(${rows}, ${billHeight}px)` }}
        initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
        animate={isVisible ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(50% 50% 50% 50%)" }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
          {Array.from({ length: totalBills }, (_, i) => {
          const row = Math.floor(i / columns);
          const direction = row % 2 === 0 ? 1 : -1;

          return (
            <motion.img
              key={i}
              src={k5}
              alt="Billet"
              className="m-0"
              style={{ width: billWidth, height: billHeight }}
              animate={{ x: [0, direction * 100, 0] }}
              transition={{
                duration: 20,
                delay: (i % columns) * 0.2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default BillAnimation;
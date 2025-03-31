import { useState, useEffect } from "react";

type FloatingImageProps = {
  src: string;
  size?: number; // Taille de base de l'image
  animationSpeed?: number; // Durée de l'animation en ms
};

const FloatingImage = ({ src, size = 150, animationSpeed = 1000 }: FloatingImageProps) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.3 : 1));
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [animationSpeed]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 rounded-full border-0"
    >
      <div
        className="transition-transform duration-500 ease-in-out shadow-2xl rounded-full border-0"
        style={{
          width: size,
          height: size,
          transform: `scale(${scale})`,
        }}
      >
        <img
          src={src}
          alt="Floating"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default FloatingImage;
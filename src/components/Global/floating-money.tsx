import { useEffect, useRef } from "react";

const BILL_IMAGES = [
  "/bills/01.png",
  "/bills/02.png",
  "/bills/03.png",
  "/bills/04.png",
  "/bills/05.png",
  "/bills/06.png",
  "/bills/07.png",
  "/bills/08.png",
  "/bills/09.png",
  "/bills/10.png",
  "/bills/11.png",
  "/bills/12.png",
];

const MAX_BILLS = 300; // Nombre max de billets affichés

const FallingMoney = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bills: any[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Fonction pour générer des billets
    function createBill() {
      const bill = {
        x: Math.random() * W,
        y: Math.random() * H - H,
        rotation: Math.random() * 360,
        speed: Math.random() * 2 + 1,
        image: new Image(),
        loaded: false, // Déclare une propriété 'loaded' pour vérifier si l'image est prête
      };

      // Ajouter un gestionnaire 'onload' pour vérifier quand l'image est prête
      bill.image.src = BILL_IMAGES[Math.floor(Math.random() * BILL_IMAGES.length)];
      bill.image.onload = () => {
        bill.loaded = true;
      };

      return bill;
    }

    // Remplir le tableau des billets
    for (let i = 0; i < MAX_BILLS; i++) {
      const bill = createBill();
      bills.push(bill);
    }
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      bills.forEach((bill) => {
        if (bill.loaded) { // Vérifier si l'image est prête avant de la dessiner
          bill.y += bill.speed;
          bill.rotation += 0.5;

          if (bill.y > H) {
            bill.y = -50;
            bill.x = Math.random() * W;
          }

          ctx.save();
          ctx.translate(bill.x, bill.y);
          ctx.rotate((bill.rotation * Math.PI) / 180);
          ctx.drawImage(bill.image, -25, -25, 50, 50);
          ctx.restore();
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    const resizeHandler = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-49" />;
};

export default FallingMoney;

import { useEffect } from 'react'
import { api } from "@/config";
import io from "socket.io-client";
const socket = io(`${api.SOCKET_URL}`);

type Props = {
    time: number,
    setTime: (value: number) => void,
}

const MainTimer = ({ time, setTime }: Props) => {
    
    useEffect(() => {
      socket.on("countdown", (data: any) => {
        setTime(data.remainingTime);
      });
  
      return () => {
        socket.off('countdown');
      };
    },[]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Calculer le pourcentage de progression (120 secondes = 2 minutes)
    const maxTime = 120;
    const progress = Math.max(0, Math.min(100, (time / maxTime) * 100));
    
    // Angle de progression pour le dégradé conique (0% = 0deg, 100% = 360deg)
    const progressAngle = (progress / 100) * 360;

    return (
        <div className="relative w-4/5 h-2/5 m-auto">
            {/* Arrière-plan flou avec effet de profondeur */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30 backdrop-blur-xl rounded-3xl shadow-2xl"></div>
            
            {/* Bordure progressive */}
            <div 
                className="absolute inset-0 rounded-3xl p-1"
                style={{
                    background: `conic-gradient(from 0deg, #FFD700 0deg, #FFD700 ${progressAngle}deg, transparent ${progressAngle}deg, transparent 360deg)`,
                }}
            >
                {/* Contenu principal avec effet de verre amélioré */}
                <div className="relative w-full h-full bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* Gradient overlay pour plus de profondeur */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-3xl"></div>
                    
                    {/* Reflets intérieurs pour l'effet de verre */}
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-3xl"></div>
                    <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/15 to-transparent rounded-l-3xl"></div>
                    
                    {/* Texture de verre subtile */}
                    <div className="absolute inset-0 opacity-30 rounded-3xl" style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)'
                    }}></div>
                    
                    {/* Texte avec ombre portée */}
                    <h5 className="relative z-10 text-6xl font-bold text-black drop-shadow-2xl tracking-wide">
                        {formatTime(time)}
                    </h5>
                </div>
            </div>
            
            {/* Reflets extérieurs pour l'effet de verre */}
            <div className="absolute -top-2 -left-2 w-20 h-20 bg-white/20 rounded-full blur-xl"></div>
            <div className="absolute -top-1 -right-1 w-12 h-12 bg-white/15 rounded-full blur-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-400/20 rounded-full blur-xl"></div>
            
            {/* Effet de brillance animé */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-45 animate-pulse"></div>
            </div>
        </div>
    );
}

export default MainTimer
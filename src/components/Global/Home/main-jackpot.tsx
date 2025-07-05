import { useEffect } from 'react'

import piece from '@/assets/images/piece.png';

const formatNumberWithComma = (num: any) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};

type Props = {
    jackpot: any,
}

const MainJackpot = ({ jackpot = { amount: 1250000 } }: Props) => {
    
  return (
    <div className='m-auto w-full mx-2 h-1/3 p-[1%] relative overflow-hidden rounded-xl shadow-2xl'
         style={{
           background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 193, 7, 0.25) 25%, rgba(255, 215, 0, 0.1) 50%, rgba(218, 165, 32, 0.2) 75%, rgba(255, 215, 0, 0.15) 100%)',
           backdropFilter: 'blur(20px)',
           border: '1px solid rgba(255, 215, 0, 0.3)',
           boxShadow: '0 8px 32px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
         }}> 
      
      {/* Effet de brillance animé */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.4) 50%, transparent 70%)',
          animation: 'shine 3s infinite linear'
        }}
      />
      
      {/* Particules dorées flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-70"
          style={{
            left: '10%',
            top: '20%',
            animation: 'float 4s infinite ease-in-out'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
          style={{
            left: '80%',
            top: '60%',
            animation: 'float 3s infinite ease-in-out 1s'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-yellow-200 rounded-full opacity-80"
          style={{
            left: '60%',
            top: '30%',
            animation: 'float 5s infinite ease-in-out 2s'
          }}
        />
      </div>

      <div className="flex items-center justify-between h-full overflow-hidden relative z-10">
        <img 
          src={piece} 
          className="w-16 h-16 flex-shrink-0 ml-4 filter drop-shadow-lg"
          style={{
            animation: 'pulse 2s infinite ease-in-out'
          }}
          alt="Pièce" 
        />
        <h5 
          className="text-center text-4xl font-bold truncate flex-1 mr-4"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #FFFF00 50%, #DAA520 75%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))'
          }}
        >
          {formatNumberWithComma(jackpot.amount)} / {formatNumberWithComma(300000)}  <span className='text-sm p-0 m-0'>XAF</span>
        </h5>
      </div>

      {/* Styles CSS pour les animations */}
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  )
}

export default MainJackpot
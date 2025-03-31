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

  return (
    <h5 className="m-auto p-2 w-3/5 h-1/3 bg-gray-300 text-center place-content-center justify-center shadow-gray-900 shadow text-6xl text-black font-semibold">
      {formatTime(time)}
    </h5>
  )
}

export default MainTimer
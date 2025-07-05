import { useEffect } from 'react'
import { api } from "@/config";
import io from "socket.io-client";
const socket = io(`${api.SOCKET_URL}`);


type Props = {
    drawNumber: number,
    setDrawNumber: (value: number) => void,
}

const MainDrawNumber = ({ drawNumber, setDrawNumber}: Props) => {

    useEffect(() => {
        socket.on("number", (data: any) => {
          setDrawNumber(data);
        });
    
        return () => {
          socket.off('number');
        };
    },[]);
    
  return (
    <h5 className="m-auto p-auto w-5/6 h-1/3 bg-gray-300 text-center place-content-center justify-center shadow-gray-900 text-4xl text-white font-semibold p-[1%] items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg">
      <span className='text-4xl p-0 m-0'>DRAW No:</span> #{drawNumber}
    </h5>
  )
}

export default MainDrawNumber
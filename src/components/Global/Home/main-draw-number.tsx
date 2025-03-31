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
    <h5 className="m-auto px-2 w-5/6 h-1/3 bg-gray-300 text-center place-content-center justify-center shadow-gray-900 shadow text-4xl text-black font-semibold">
      #{drawNumber}
    </h5>
  )
}

export default MainDrawNumber
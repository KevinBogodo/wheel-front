import io from "socket.io-client";

import { Card } from '@/components/ui/card'
import { useCallback, useEffect, useState } from "react";
import { getDrawData } from "@/helper/backend_helper";
import { api } from "@/config";

const socket = io(`${api.SOCKET_URL}`);

const HeaderSession = () => {
    const cashDesk = localStorage.getItem('cashDesk');
    const startingMinutes = 2;
    const startingSeconds = startingMinutes * 60;
    const [time, setTime] = useState(-1);
    const [drawNumber, setDrawNumber] = useState(0);

    const getInitData = async () => {
        try {
          const data:any = await getDrawData();
          if (data) {
            const row = data?.data?.openDraw[0];
            setDrawNumber(row.numbers);
          }
        } catch (error) {
          console.error("Error fetching draw data:", error);
        }
    };

    useEffect(() => {
        getInitData();
    }, []);

    const formatTime = useCallback((time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    },[]);

    useEffect(() => {
        socket.on("countdown", (data: any) => {
            setTime(data.remainingTime);
        });

        return () => {
            socket.off('countdown');
        };
    },[]);

    useEffect(() => {
        socket.on("open_draw", (data: any) => {
          setDrawNumber(data?.nexDrawNumber);
        });
    
        return () => {
          socket.off('open_draw');
        };
    },[]);

    return (
        <Card className=' inline-flex w-full m-2 content-center shadow-md border'>
            <div className='m-2 w-1/5 h-3/4 text-center content-center border rounded-md px-3' >
                <p className={
                    (time >= 60 
                        ? 'text-green-600'
                        : time >= 30 
                            ? 'text-orange-600'
                            : 'text-red-600'
                    )+' scroll-m-20 text-2xl font-semibold tracking-tight'}>
                    { time > -1 ? formatTime(time) : formatTime(startingSeconds) }
                </p>
            </div>
            <div className='m-2 w-2/5 h-3/4 text-center content-center border rounded-md px-3' >
                <p className='scroll-m-20 text-xl font-normal tracking-tight'>
                    {cashDesk}
                </p>
            </div>
            <div className='m-2 w-2/5 h-3/4 text-center content-center border rounded-md px-3' >
                <p className='scroll-m-20 text-xl font-semibold tracking-tight'>
                    <span className="text-lg font-normal">Tirage n°: </span>{drawNumber}
                </p>
            </div>
        </Card>
    )
}

export default HeaderSession
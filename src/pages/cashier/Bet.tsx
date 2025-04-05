import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useReactToPrint } from 'react-to-print';

import { toast } from 'react-toastify';
import { getDrawData } from '@/helper/backend_helper';
import { api } from '@/config';

import HeaderSession from '@/components/App/bet/header-session';
import PanelNumber from '@/components/App/bet/panel-number';
import PanelPreview from '@/components/App/bet/panel-preview';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getLatestBet, placeBet, placeCashBackBet } from '@/slice/thunks';
import { createSelector } from '@reduxjs/toolkit';
import LatestBet from '@/components/App/bet/latest-bet';
import ScanTicketBar from '@/components/App/bet/scan-ticket-bar';
import { Separator } from '@/components/ui/separator';
import BetTicket from '@/components/App/bet/bet-ticket';
import AppContent from '@/components/Global/app-content';
import ShortcutNumber from '@/components/App/bet/shortcut-number';
import CashBack from '@/components/App/bet/cash-back';
import { Button } from '@/components/ui/button';

const socket = io(`${api.SOCKET_URL}`);

const Bet: React.FC = () => {
  const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const dispatch:AppDispatch = useDispatch();
  const startingMinutes = 2;
  const startingSeconds = startingMinutes * 60;
  const [time, setTime] = useState(startingSeconds);
  const [betNumbers, setBetNumber] = useState<number[]>([]);
  const [odds, setOdds] = useState<number[]>([]);
  const [oddsSum, setOddsSum] = useState<number>(0);
  const [disableAdd, setDisableAdd] = useState<boolean>(false);
  const [openDraw, setOpneDraw] = useState<{drawId: string, nexDrawNumber: number}>();
  const [currentBet, setCurrentBet] = useState({});
  const [tickets, setTickets] = useState<string[]>([]);
  const [printCashBack, setPrintCashBack] = useState<boolean>(false);
  
  const selectAplicationState = (state:RootState) => state.Application;
  const ApplicationProperties = createSelector(
    selectAplicationState,
    (app) => ({
      bet: app.bet,
      lastBets: app.lastBets,
      placeBetSuccess: app.placeBetSuccess,
      error: app.error
    })
  );
  const { bet, lastBets, placeBetSuccess, error } = useSelector(ApplicationProperties);


  const getInitData = async () => {
    try {
      const data:any = await getDrawData();
      if (data) {
        const row = data?.data?.openDraw[0];
        setOpneDraw({
            drawId: row?.id,
            nexDrawNumber: row?.numbers
        })
      }
    } catch (error) {
      toast.error('Echec de connexion serveur', { autoClose: 10000 });
    }
  };

  const loadLastTicket = useCallback(() => {
      dispatch(getLatestBet())
  },[])

  const saveBet = useCallback(() => {
    console.log("tickets", betNumbers);

    if (betNumbers.length > 0) {
      const objNumbers = betNumbers.reduce((acc, value, index) => {
        acc[`no${index + 1}`] = value;
        return acc;
      }, {} as Record<string, number>);
  
      const objOdds = odds.reduce((acc, value, index) => {
        acc[`rt${index + 1}`] = value;
        return acc;
      }, {} as Record<string, number>);
  
      let param = {
        draw: openDraw?.drawId || '',
        body: {...objNumbers, ...objOdds, 'amount': oddsSum*100}
      };
      dispatch(placeBet(param));
    }
  },[betNumbers, odds, openDraw, oddsSum]);

  const saveCashBackBet = () => {

    if (betNumbers.length > 0) {
      const objNumbers = betNumbers.reduce((acc, value, index) => {
        acc[`no${index + 1}`] = value;
        return acc;
      }, {} as Record<string, number>);
  
      const objOdds = odds.reduce((acc, value, index) => {
        acc[`rt${index + 1}`] = value;
        return acc;
      }, {} as Record<string, number>);

      let param = {
        draw: openDraw?.drawId || '',
        body: {
          bet: {...objNumbers, ...objOdds, 'amount': 0},
          tickets: tickets
        }
      };
      dispatch(placeCashBackBet(param));
    }
  };

  const getOddsSum = useCallback(() => {
    return odds?.reduce((prevSum, currentVal) => {
      return prevSum + currentVal;
    },0) || 0;
  },[odds])

  const editBet = useCallback((number: number, action: 'add' | 'sub') => {
    const currentBet = [...betNumbers || []];
    const currentOdds = [...odds || []];

    if ((action === 'add') && (getOddsSum() < 5)) {
      if (currentBet.includes(number)) {
        const betIndex = currentBet.indexOf(number);
        currentOdds[betIndex]++
      } else {
        currentBet.push(number);
        currentOdds.push(1);
      }
    } else if(action === 'sub') {
      const betIndex = currentBet.indexOf(number);
      if (betIndex !== -1) {
        currentOdds[betIndex]--;
        if (currentOdds[betIndex] <= 0) {
          currentBet.splice(betIndex, 1);
          currentOdds.splice(betIndex, 1);
        }
      }
    };

    setBetNumber(currentBet);
    setOdds(currentOdds);
  },[betNumbers, odds]);

  const selectFiveNumbers = (numbers: number[]) => {
    setBetNumber(numbers);
    setOdds([1,1,1,1,1]);
  }

  const rePrintBet = (bet: any) => {
    if (bet && bet.id) {
      setCurrentBet(bet);
      printFn()
    }
  }

  const handleClearBet = useCallback(() => {
    setBetNumber([]);
    setOdds([]);
  },[]);

  const printFn = useReactToPrint({
    content: () => ticketRef.current,
    documentTitle: 'CAMER_GAME_TICKET',
    copyStyles: true,
    onBeforeGetContent: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 100);
      });
    },
    onAfterPrint: () => {
      handleClearBet();
      loadLastTicket();
    },
  });

  useEffect(() => {
    getInitData();
    loadLastTicket();
  },[]);

  useEffect(() => {
    socket.on('countdown', (data: any) => {
        setTime(data.remainingTime);
    });

    return () => {
        socket.off('countdown');
    };
  },[]);

  useEffect(() => {
    socket.on('open_draw', (data: any) => {
        setOpneDraw(data);
    });

    return () => {
      socket.off('open_draw');
    }
  },[]);

  useEffect(() => {
    console.log(tickets);
    
    if (tickets.length === 10) {
      setPrintCashBack(true);
    }
  },[tickets]);

  useEffect(() => {
      const sum:number = getOddsSum();
      if (sum >= 5) {
        setDisableAdd(true);
      } else {
        setDisableAdd(false);
      }
      setOddsSum(sum);
  },[odds]);

  useEffect(() => {
    if (placeBetSuccess && !error) {
      setCurrentBet(bet);
      setPrintCashBack(false);
      setTickets([]);
      printFn();
    }
  },[placeBetSuccess, bet]);

  return (
    <AppContent className='flex fex-col w-full h-full mx-0'>
      {/* Left */}
      <AppContent className='flex-[2] w-full h-full'>
        <AppContent className='flex w-full h-[11%]'>
          <HeaderSession />
        </AppContent>
        <AppContent className='flex w-full h-[60%]'>
          <AppContent className='flex flex-row w-full h-full'>
            <PanelNumber
              disableAdd={disableAdd}
              editBet={editBet}
              isDisabled={(time <= 5)? true : false}
              />
            <ShortcutNumber setBetNumber={setBetNumber} setOdds={setOdds} />
          </AppContent>
        </AppContent>
        <AppContent className='flex flex-col w-full h-[25%] border'>
          {/* Odd - Even */}
          <AppContent className='flex flex-row w-full'>
              <p>COLOURS: </p>
          </AppContent>

          {/* Low - High */}
          <AppContent className='flex flex-row w-full'>
          </AppContent>

          {/* Dozens */}
          <AppContent className='flex flex-row w-full'>
          </AppContent>

        </AppContent>
      </AppContent>

      {/* Right */}
      {currentUserRole === 'cashier' &&
        <AppContent className='flex-[1] flex-col w-full h-full bg-accent'>
          <AppContent className='flex flex-col w-full h-[60%] mb-2'>
            <PanelPreview
              editBet={editBet}
              odds={odds || []}
              oddsSum={oddsSum}
              saveBet={saveBet}
              handleClearBet={handleClearBet}
              betNumbers={betNumbers || []}
              isDisabled={(time <= 5)? true : false}
            />
            <ScanTicketBar />
            <Separator className='my-5'/>
            <Separator className='my-5'/>
          </AppContent>
          {lastBets.length > 0 && <AppContent className='w-full [40%] p-2'>
            <LatestBet lastBets={lastBets} rePrintBet={rePrintBet} />
          </AppContent>}
          <CashBack tickets={tickets} printCashBack={printCashBack} setTickets={setTickets} saveCashBackBet={saveCashBackBet}/>
        </AppContent>
      }

      <div ref={ticketRef} className='w-[300px] hidden print:block'>
        <BetTicket currentBet={currentBet} />
      </div>
    </AppContent>
  )
}

export default Bet
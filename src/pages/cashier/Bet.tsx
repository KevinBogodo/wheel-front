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
import { getLatestBet, placeBet } from '@/slice/thunks';
import { createSelector } from '@reduxjs/toolkit';
import LatestBet from '@/components/App/bet/latest-bet';
import ScanTicketBar from '@/components/App/bet/scan-ticket-bar';
import { Separator } from '@/components/ui/separator';
import BetTicket from '@/components/App/bet/bet-ticket';
import AppContent from '@/components/Global/app-content';
import ShortcutNumber from '@/components/App/bet/shortcut-number';
// import CashBack from '@/components/App/bet/cash-back';
// import { Button } from '@/components/ui/button';
// import NumberBord from '@/components/App/bet/number-bord';
import ExtrabetButton from '@/components/App/bet/extrabet-button';

const socket = io(`${api.SOCKET_URL}`);

const Bet: React.FC = () => {
  const currentUserRole = JSON.parse(localStorage.getItem('role') || '');
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const dispatch:AppDispatch = useDispatch();
  const startingMinutes = 2;
  const startingSeconds = startingMinutes * 60;
  const [time, setTime] = useState(startingSeconds);
  const [betNumbers, setBetNumber] = useState<number[]>([]);
  const [stack, setStack] = useState<number>(250);
  const [choice, setChoice] = useState<any>({});
  const [odds, setOdds] = useState<number[]>([]);
  const [oddsSum, setOddsSum] = useState<number>(0);
  const [disableAdd, setDisableAdd] = useState<boolean>(false);
  const [openDraw, setOpneDraw] = useState<{drawId: string, nexDrawNumber: number}>();
  const [currentBet, setCurrentBet] = useState({});
  const [tickets, setTickets] = useState<string[]>([]);
  // const [printCashBack, setPrintCashBack] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState<number>(0);
  
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

    if (betNumbers.length > 0 || (choice && choice.label)) {
      const objNumbers = betNumbers.reduce((acc, value, index) => {
        acc[`no${index + 1}`] = value;
        return acc;
      }, {} as Record<string, number>);
  
      const objOdds = odds.reduce((acc, index) => {
        acc[`rt${index + 1}`] = 36;
        return acc;
      }, {} as Record<string, number>);

      let body: Record<string, any> = {
        betAmount: betAmount,
        rate: stack,
        amount: oddsSum*stack,
        isRed: false,
        isBlack: false,
        isGreen: false,
        isOdd: false,
        isEven: false,
        isDown: false,
        isUp: false,
        isDownBlack: false,
        isDownRed: false,
        isUpBlack: false,
        isUpRed: false,
        isFirst: false,
        isSecond: false,
        isThird: false,
      }

      switch (choice?.label) {
        case 'Black':
          body.isBlack = true;
          break;
        case 'Red':
          body.isRed = true;
          break;
        case 'Green':
          body.isGreen = true; // Green
          break;
        case '1-12':
          body.isFirst = true; // 1-12
          break;
        case '13-24':
          body.isSecond = true; // 13-24
          break;
        case '25-36':
          body.isThird = true; // 25-36
          break;
        case 'Low': // 1-18
          body.isDown = true; // 1-18
          break;
        case 'High': // 19-36
          body.isUp = true; // 19-36
          break;
        case 'Odd': // Odd
          body.isOdd = true; // Odd
          break;
        case 'Even': // Even
          body.isEven = true; // Even
          break;
        default:
          break;
      }

      let param = {
        draw: openDraw?.drawId || '',
        body: {...body, ...objNumbers, ...objOdds}
      };
      
      dispatch(placeBet(param));
    }
  },[betNumbers, odds, openDraw, oddsSum, choice, betAmount, stack]);

  // const saveCashBackBet = () => {

  //   if (betNumbers.length > 0) {
  //     const objNumbers = betNumbers.reduce((acc, value, index) => {
  //       acc[`no${index + 1}`] = value;
  //       return acc;
  //     }, {} as Record<string, number>);
  
  //     const objOdds = odds.reduce((acc, value, index) => {
  //       acc[`rt${index + 1}`] = value;
  //       return acc;
  //     }, {} as Record<string, number>);

  //     let param = {
  //       draw: openDraw?.drawId || '',
  //       body: {
  //         bet: {...objNumbers, ...objOdds, 'amount': 0},
  //         tickets: tickets
  //       }
  //     };
  //     dispatch(placeCashBackBet(param));
  //   }
  // };

  const getOddsSum = useCallback(() => {
    return odds?.reduce((prevSum, currentVal) => {
      return prevSum + currentVal;
    },0) || 0;
  },[odds])

  const editBet = useCallback((number: number, action: 'add' | 'sub', value?: string) => {
    
    if (value) {
      setChoice(value);
    } else {
      const currentBet = [...betNumbers || []];
      const currentOdds = [...odds || []];

      if ((action === 'add') && (getOddsSum() < 5)) {
        if (currentBet.includes(number)) {
          const betIndex = currentBet.indexOf(number);
          currentOdds[betIndex]
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
    }

  },[betNumbers, choice]);

  // const selectFiveNumbers = (numbers: number[]) => {
  //   setBetNumber(numbers);
  //   setOdds([1,1,1,1,1]);
  // }

  const rePrintBet = (bet: any) => {
    if (bet && bet.id) {
      setCurrentBet(bet);
      printFn()
    }
  }

  const handleClearBet = useCallback(() => {
    setBetNumber([]);
    setChoice({});
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
    if (tickets.length === 10) {
      // setPrintCashBack(true);
    }
  },[tickets]);

  useEffect(() => {
      const number:number = getOddsSum();
      if (number >= 8) {
        setDisableAdd(true);
      } else {
        setDisableAdd(false);
      }
      let sum = (number*36)+(choice?.value || 0)
      setOddsSum(sum);
  },[odds,choice]);

  useEffect(() => {
    const val = betNumbers.length+((choice && choice.label) ? 1 : 0);
    setBetAmount(val*stack)
  }, [choice, betNumbers, stack]);

  useEffect(() => {
    if (placeBetSuccess && !error) {
      setCurrentBet(bet);
      // setPrintCashBack(false);
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

        <AppContent className='flex w-full h-[65%]'>
          <AppContent className='flex flex-row w-full h-full'>
            <PanelNumber
              disableAdd={disableAdd}
              editBet={editBet}
              isDisabled={(time <= 5)? true : false}
              />
            <ShortcutNumber setBetNumber={setBetNumber} setOdds={setOdds} />
          </AppContent>
        </AppContent>

        <AppContent className='flex flex-col w-full border py-[1%]'>

          {/* Odd - Even */}
          <AppContent className='flex flex-row w-full content-center items-center'>
              <p className='font-bold text-md px-2 w-[15%]' style={{ color: 'black' }}>COULEURS: </p>
              <ExtrabetButton
                value={{label:'Black', value: 2}}
                bgColor='black'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                Noir
              </ExtrabetButton>
              <ExtrabetButton
                value={{label:'Red', value: 2}}
                bgColor='#ef4444'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center  border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                Rouge
              </ExtrabetButton>
              <ExtrabetButton
                value={{label:'Green', value: 36}}
                bgColor='#16a34a'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                Vert
              </ExtrabetButton>
          </AppContent>

          {/* Dozens */}
          <AppContent className='flex flex-row w-full mt-[1%] content-center items-center'>
              <p className='font-bold text-md px-2 w-[15%]' style={{ color: 'black' }}>DOZENS: </p>
              <ExtrabetButton
                value={{label:'1-12', value: 3}}
                bgColor='#64748b'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                1-12
              </ExtrabetButton>
              <ExtrabetButton
                value={{label:'13-24', value: 3}}
                bgColor='#64748b'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                13-24
              </ExtrabetButton>
              <ExtrabetButton
                value={{label:'25-36', value: 3}}
                bgColor='#64748b'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                25-36
              </ExtrabetButton>
          </AppContent>

          <AppContent className='flex flex-row w-full mt-[1%] content-center items-center'>
              <ExtrabetButton
                value={{label:'Low', value: 2}}
                bgColor='#64748b'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                Low
              </ExtrabetButton>
              <ExtrabetButton
                value={{label:'High', value: 2}}
                bgColor='#64748b'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                High
              </ExtrabetButton>
              <ExtrabetButton
                value={{label:'Odd', value: 2}}
                bgColor='#64748b'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                Impair
              </ExtrabetButton>
              <ExtrabetButton
                value={{label:'Even', value: 2}}
                bgColor='#64748b'
                textColor='white'
                className='w-[15%] p-[1%] rounded-sm mx-[1%] font-semibold flex items-center text-white justify-center border-gray-800 shadow-inner shadow-gray-800'
                disableAdd={(time <= 5)? true : false}
                editBet={editBet}
              >
                Pair
              </ExtrabetButton>
          </AppContent>

        </AppContent>
      </AppContent>

      {/* Right */}
      {currentUserRole === 'cashier' &&
        <AppContent className='flex-[1] flex-col w-full h-auto bg-accent'>
          <AppContent className='flex flex-col w-full h-[60%] mb-2'>
            <PanelPreview
              setStack={setStack}
              stack={stack}
              odds={odds || []}
              oddsSum={oddsSum}
              saveBet={saveBet}
              handleClearBet={handleClearBet}
              choice={choice}
              betNumbers={betNumbers || []}
              betAmount={betAmount}
              isDisabled={(time <= 5)? true : false}
            />
            <ScanTicketBar />
            <Separator className='my-5'/>
          </AppContent>
          {lastBets.length > 0 && <AppContent className='w-full [40%] p-2'>
            <LatestBet lastBets={lastBets} rePrintBet={rePrintBet} />
          </AppContent>}
          {/* <CashBack tickets={tickets} printCashBack={printCashBack} setTickets={setTickets} saveCashBackBet={saveCashBackBet}/> */}
        </AppContent>
      }

      <div ref={ticketRef} className='w-[300px] hidden print:block'>
        <BetTicket currentBet={currentBet} openDraw={openDraw} />
      </div>
    </AppContent>
  )
}

export default Bet
import { useCallback, useEffect, useState } from 'react';

import { AppDispatch, RootState } from '@/store';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { 
  resetReducer, 
  getCurentCashDeskOp, 
  getClosedCashdesks, 
  openCashDesk, 
  closeCashDesk, 
  logoutUser } from '@/slice/thunks';

// import Footer from './Footer'
import Header from './Header'
import AppSidebar from './appSideBar'
import withRouter from '@/components/common/withRouter'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cashdesk, cashDeskOp, user } from '@/helper/global_interface';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Ban, LaptopMinimalCheck, LockOpen, LogOut } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type props = {
  children: React.ReactNode
}

const Index = ({children}:props) => {
  const dispatch:AppDispatch = useDispatch();
  let navigate = useNavigate();
  const role = localStorage.getItem('role');
  const currentUserRole = role ? JSON.parse(role) : null;

  const [currentRole, setCurrentRole] = useState<string>('');
  const [selectedCashDesk, setSelectedCashDesk] = useState<string>('');
  const [modal, setModal] = useState<boolean>(false);
  const [isClose, setIsClose] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);

  const selectUserState = (state:RootState) => state.Login;
  const selectAppState = (state:RootState) => state.Application;

  const ApplicationProperties = createSelector(
    selectAppState,
    (app) => ({
      allCashdesks: app.allCashdesks as cashdesk[],
      cashdeskOp: app.cashdeskOp,
      openCashdeskOp: app.openCashdeskOp as cashDeskOp, // Add type definition here
      cashdeskOpOpenSuccess: app.cashdeskOpOpenSuccess,
      cashdeskOpCloseSuccess: app.cashdeskOpCloseSuccess,
      error: app.error
    })
  );
  const UserProperties = createSelector(
    selectUserState,
    (outputs) => ({
      user: outputs.user,
    })
  );

  const { user } = useSelector(UserProperties);
  const { allCashdesks, cashdeskOp, openCashdeskOp, cashdeskOpOpenSuccess, cashdeskOpCloseSuccess, error} = useSelector(ApplicationProperties)
  
  const loadCashDesks = useCallback(() => {
      dispatch(getClosedCashdesks())
  },[]);

  const checkCashDeskOp = useCallback(() => {
      dispatch(getCurentCashDeskOp())
  },[])

  const onClickCloseCashDesk = useCallback(() => {
    // dispatch(onGetAmountsCollectedGroupBySources(openCashdeskOp && openCashdeskOp.id))
      setIsClose(true);
      setModal(true);
      // toggle()
  },[]);

  const toggle = useCallback(() => {
    if (modal) {
        setModal(false);
        setIsClose(false);
        setSelectedCashDesk('');
        setAmount(0)
    } else {
        setModal(true);
    }
}, [modal]);

  const openCashDeskOp = useCallback(() => {
    let config = {
      cashDeskId: selectedCashDesk,
      openAmount: amount
    }    
    dispatch(openCashDesk(config))
  },[selectedCashDesk, amount]);

  const closeCashDeskOp = useCallback(() => {
      let config = {
        closeAmount: amount
      }
      dispatch(closeCashDesk(config))
  },[amount])

  const handleLogout = () => {
    dispatch(resetReducer());
    dispatch(logoutUser(navigate))
  }

  useEffect(() => {
    if (currentUserRole === "cashier" || currentRole === "cashier") {
        loadCashDesks()
        checkCashDeskOp()
    }
  }, [dispatch, currentUserRole])

  useEffect(() => {    

    
    if (!(openCashdeskOp && openCashdeskOp.id) && (currentUserRole === "cashier" || currentRole === "cashier")) {
      setModal(true);
      setIsClose(false);
      setSelectedCashDesk('');
    } else {
      setModal(false);
    }
  },[openCashdeskOp])

  useEffect(() =>{
    if (user && (user as user)?.name) {
      setCurrentRole((user as user).role.name)
    } else if (currentUserRole) {
      setCurrentRole(currentUserRole)
    }
  },[user, currentUserRole])

  useEffect(() => {
    if (cashdeskOpOpenSuccess && !error) {
        setSelectedCashDesk('')
        checkCashDeskOp()
        toggle()
    }
  },[cashdeskOpOpenSuccess, cashdeskOp]) 

  useEffect(() => {
      if (cashdeskOpCloseSuccess && !error) {
          setSelectedCashDesk('')
          checkCashDeskOp()
          toggle()
      }
  },[cashdeskOpCloseSuccess, cashdeskOp])
    
  return (
    <SidebarProvider>
      <AppSidebar logout={handleLogout} closeDesk={onClickCloseCashDesk}/>

      <SidebarInset>
        <Header />
        <div className='p-2 w-full h-[93%]'>
          {children}
        </div>
        {/* <Footer /> */}
      </SidebarInset>

      <ToastContainer closeButton={true} limit={3}/>

      <Dialog open={modal} onOpenChange={(open) => !open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isClose 
                ? 'Fermerture de caisse'
                : 'Ouverture de caisse'
              }
            </DialogTitle>
            <DialogDescription>
              {isClose 
                  ? 'Vous devez fermer la caisse avant de quitter le travail.'
                  : 'Vous devez ouvrir une caisse avant de commencer le travail.'
              }
              <br /> <span className='text-destructive font-semibold'>Cette action est obligatoire !</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className={(isClose ? '' : ' grid-cols-2') + ' grid gap-2 py-2'}>
            {!isClose && <div>
                <Label htmlFor='cashdesk'>
                    Choisir la caisse <span className='text-destructive'>*</span>
                </Label>
                <Select
                  value={selectedCashDesk}
                  onValueChange={(value) => {setSelectedCashDesk(value)}}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {allCashdesks && allCashdesks.map((cashdesk: cashdesk) => (
                      <SelectItem key={cashdesk.id} value={cashdesk.id}>{cashdesk.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            }
            <div>
              <Label htmlFor='amount'>
                Montant <span className='text-destructive'>*</span>
              </Label>
              <Input 
                id='amount'
                value={amount}
                type='number'
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect='off'
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
          </div>
          <Separator className='my-1' />
          <DialogFooter>
            <div className='w-full inline-flex justify-end gap-2'>
              {isClose 
                ? <>
                    <div className="col-span-2">
                      <Button type='button' variant='secondary' onClick={() => toggle()}>
                        <Ban />
                        Annuler
                      </Button>
                    </div>
                    <div className="col-span-2">
                      <Button 
                        type='submit' 
                        variant='default' 
                        onClick={() => closeCashDeskOp()}
                        disabled= {((amount < 0))}
                      >
                        <LaptopMinimalCheck />
                        Fermer
                      </Button>
                    </div>
                  </>
                : <>
                    <div className="col-span-2">
                      <Button type='button' variant='secondary' onClick={() => handleLogout()}>
                        <LogOut />
                        Déconnexion
                      </Button>
                    </div>
                    <div className="col-span-2">
                      <Button 
                        type='submit' 
                        variant='default' 
                        onClick={() => openCashDeskOp()}
                        disabled= {(!(amount < 0) && (selectedCashDesk === ''))}
                      >
                        <LockOpen />
                        Ouvrir
                      </Button>
                    </div>
                  </>
              }
              

            </div>
          </DialogFooter>
        </DialogContent>

      </Dialog>

    </SidebarProvider>
  )
}

export default withRouter(Index)
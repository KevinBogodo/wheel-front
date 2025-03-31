import { Button } from '@/components/ui/button'
import { Dialog, DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { LucideIcon } from 'lucide-react'

type Props = {
    className: string,
    open: boolean,
    action: any,
    Icon: LucideIcon,
    close:any
    children: any
}

const ConfirmDialog = ({className, open, close, action, Icon, children}: Props) => {

  return (
    <Dialog open={open} onOpenChange={(open) => !open && close()}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='mx-auto'>Attention !</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
                <h4 className="scroll-m-20 text-md tracking-tight m-auto">
                    {children}
                </h4>
                <Button className={className+' mx-auto'} onClick={() => action()}>
                    <Icon className='w-20 h-20' />
                    Continuer
                </Button>
        </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
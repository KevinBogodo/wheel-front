import UserAuthForm from './components/user-auth-form';
import photo from '@/assets/images/loto_bg.jpg';


const Authentification = () => {

  return (
    <>
        <div className='container relative h-full flex-col items-center justify-center md:grid max-sm:p-3 lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <div className="relative hidden h-full flex-col bg-muted p-0 text-white lg:flex">
                <div className="relative z-20 h-full flex items-center text-lg font-medium border-r-2">
                    <img src={photo} className='w-full h-full' />
                </div>
            </div>
            <div className='lg:p-8'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col space-y-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Connexion
                        </h1>
                    </div>
                    <UserAuthForm />
                </div>

            </div>
        </div>
    </>
  )
};

export default Authentification;
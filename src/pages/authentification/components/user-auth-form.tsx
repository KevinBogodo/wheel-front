import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik"
import * as Yup from "yup"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { createSelector } from 'reselect'
import { loginUser, resetLoginFlag } from '@/slice/thunks'
import { AppDispatch } from '@/store';
import { Loader } from 'lucide-react';

interface RootState {
    Login: {
        loading:boolean,
        errorMessage:string,
    }
}

interface userAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({className, ...props}: userAuthFormProps) => {
    const dispatch:AppDispatch = useDispatch();
    let navigate = useNavigate();
    const selectLayoutState = (state: RootState): RootState => state
    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loginPageData = createSelector(
        selectLayoutState,
        (state:RootState) => ({
            loading: state.Login.loading,
            errorMsg: state.Login.errorMessage
        })
    )
    const { errorMsg } =useSelector(loginPageData);


    const validation = useFormik({
        enableReinitialize: true,

        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required("nom d'utilisateur requis"),
            password: Yup.string().required("mot de passe requis")
        }),
        onSubmit: (values) => {
            setIsLoading(true)
            dispatch(loginUser(values, navigate))

            setTimeout(()   => {
                setIsLoading(false)
            }, 3000)
        }
    })

    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
            }, 3000);
        }
    },[dispatch, errorMsg]);


    return (
        <div className={'grid gap-6 '+className} {...props}>
            <form onSubmit={(e) => {
                e.preventDefault()
                validation.handleSubmit()
                return false;
            }}>
                <div className='grid gap-2'>
                    <div className='grid gap-1'>
                        <Label className='p-1' htmlFor='username'>
                            Identifiant
                        </Label>
                        <Input
                            id='username'
                            name='username'
                            value={validation.values.username || ''}
                            placeholder=''
                            type='text'
                            autoCapitalize='none'
                            autoComplete='off'
                            autoCorrect='off'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            aria-invalid={validation.touched.username && !!validation.errors.username}
                            disabled={isLoading}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <Label className='p-1' htmlFor='password'>
                            Mot de passe
                        </Label>
                        <Input
                            id='password'
                            name='password'
                            value={validation.values.password || ''}
                            placeholder=''
                            type='password'
                            autoCapitalize='none'
                            autoComplete='off'
                            autoCorrect='off'
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            aria-invalid={validation.touched.password && !!validation.errors.password}
                            disabled={isLoading}
                        />
                    </div>
                    <Button disabled={isLoading} type='submit' className='my-3'>
                        {isLoading && (
                            <Loader size={20} className='mr-2 w-4 animate-spin' />
                        )}
                        Connexion
                    </Button>
                </div>
            </form>

            <ToastContainer closeButton={false} limit={5} />
        </div>
    )
};

export default UserAuthForm;
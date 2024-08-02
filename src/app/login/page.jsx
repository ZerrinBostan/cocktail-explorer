'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '../../lib/auth/user';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!email) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) {
      toast.error('Please fill out all fields.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (email === 'cocktail@gmail.com' && password === '123') {
      dispatch(login());
      toast.success('Login successful!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push('/cocktails');
      }, 1000);
    } else {
      toast.error('Invalid email or password.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form
              className="flex flex-col w-full h-full md:w-96 pb-6 text-center bg-white rounded-3xl"
              onSubmit={handleSubmit}
            >
              <h3 className="mb-3 text-4xl font-extrabold text-iris">
                Sign In
              </h3>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">Cocktail Explorer</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value) {
                    setEmailError(false);
                  }
                }}
                className="mb-4"
                onBlur={() => {
                  if (!email) {
                    setEmailError(true);
                  }
                }}
                error={emailError === true}
              />
              {emailError && (
                <p className="text-left text-danger mb-5">Email is required</p>
              )}
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value) {
                    setPasswordError(false);
                  }
                }}
                className="mb-4"
                onBlur={() => {
                  if (!password) {
                    setPasswordError(true);
                  }
                }}
                error={passwordError === true}
              />
              {passwordError && (
                <p className="text-left text-danger mb-5">
                  Password is required
                </p>
              )}
              <Button text="Submit" className="mb-5 text-white" />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';import { login } from '../../lib/auth/user';
import Button from '@/ui/Button';
import Input from '@/ui/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    if (email === 'cocktail@gmail.com' && password === '123') {
      dispatch(login()); 
      router.push('/cocktails');
    } else {
      setError('Invalid email or password.');
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
                onChange={(e) => setEmail(e.target.value)}
                className="mb-7"
              />
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-7"
              />
              {error && (
                <p className="text-left text-red-500 mb-5">{error}</p>
              )}
              <Button text="Submit" className='mb-5'/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

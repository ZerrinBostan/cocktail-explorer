'use client';
import { login } from '../auth/authControl';
import { useFormState, useFormStatus } from 'react-dom';

import Input from '@/ui/Input';
import Button from '@/ui/Button';

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <div className="flex items-center justify-center w-full lg:p-12">
      <div className="flex items-center xl:p-10">
        <form action={action} className="flex flex-col w-full h-full md:w-96 pb-6 text-center rounded-3xl">
          <div className="flex flex-col gap-2">
            <h3 className="mb-3 text-4xl font-extrabold text-iris">
              Sign In
            </h3>
            <div className="flex items-center mb-3">
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
              <p className="mx-4 text-grey-600">Cocktail Explorer</p>
              <hr className="h-0 border-b border-solid border-grey-500 grow" />
            </div>
            <div className='mb-4'>
              <Input
                id="email"
                showLabel={true}
                name="email"
                type="email"
                error={state?.errors?.email}

              />
            </div>
            <div className='mb-4'>
              <Input
                id="password"
                showLabel={true}
                name="password"
                type="password"
                error={state?.errors?.password}
              />
            </div>
            {state?.message && (
              <p className="text-start text-sm text-red-500">{state.message}</p>
            )}
            <LoginButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button text="Submit" className="mb-5 text-white" aria-disabled={pending} />
  );
}

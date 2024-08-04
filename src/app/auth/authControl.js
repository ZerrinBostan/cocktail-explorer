'use server';

import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';

import { createSession, deleteSession } from './stateless-session';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import {  LoginFormSchema, SignupFormSchema, } from './definitions';


export async function signup(
  state,
  formData,
) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return {
      message: 'Email already exists, please use a different email or login.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id });

  const user = data[0];

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  const userId = user.id.toString();
  await createSession(userId);
}

export async function login(state, formData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, validatedFields.data.email),
  });

  if (!user) {
    return { message: 'Invalid login credentials.' };
  }

  if (validatedFields.data.password !== user.password) {
    return { message: 'Invalid login credentials.' };
  }

  const userId = user.id.toString();
  await createSession(userId);
}

export async function logout() {
  deleteSession();
}

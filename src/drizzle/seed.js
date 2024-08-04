import { insertUser } from './db';

async function main() {
  const newUser = {
    name: 'cocktail',
    email: 'cocktail@gmail.com',
    password: 'A1b2c3d4!',

  };

  try {
    const res = await insertUser(newUser);
    console.log('Successfully seeded users table:', res);
  } catch (error) {
    console.error('Error seeding users table:', error);
  } finally {
    process.exit();
  }
}

main();

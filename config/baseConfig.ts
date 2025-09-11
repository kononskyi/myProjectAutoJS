import dotenv from 'dotenv'

dotenv.config();

export const BASE_URL: string = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';
export const BASE_API_URL: string = process.env.BASE_API_URL ?? 'https://api.practicesoftwaretesting.com';
export const USER_NAME: string = process.env.USER_NAME ?? 'Jane Doe';
export const USER_EMAIL: string = process.env.USER_EMAIL ?? 'customer@practicesoftwaretesting.com';
export const USER_PASSWORD: string = process.env.USER_PASSWORD!;
export const TESTOMATIO: string = process.env.TESTOMATIO!;


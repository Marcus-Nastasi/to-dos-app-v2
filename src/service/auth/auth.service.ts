'use server'

import { LoginRequestDto, LoginResponseDto } from "@/types/auth/login.dto";

const url: string = process.env.API_URL || 'http://localhost:8080';

export const login = async (request: LoginRequestDto): Promise<LoginResponseDto> => {
   const api_url = `${url}/api/auth/login`;
   const response: Response = await fetch(api_url, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: { 'Content-Type': 'application/json' }
   });
   if (response.status !== 200) throw new Error('Error on login');
   const data: LoginResponseDto = await response.json();
   return data;
}

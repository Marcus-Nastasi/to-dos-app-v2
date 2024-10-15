'use server'

import { UserRequestDto, UserResponseDto } from "@/types/user/user.dto";

const url: string = process.env.API_URL || 'http://localhost:8080';

export const createUser = async (
   request: UserRequestDto
): Promise<UserResponseDto> => {
   const api_url: string = `${url}/api/user/register`;
   const response: Response = await fetch(api_url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
   });
   if (response.status !== 201) throw new Error('error while creating new user');
   const data: UserResponseDto = await response.json();
   return data;
};

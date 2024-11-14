'use server'

import { UserRequestDto, UserResponseDto, UserUpdateDto } from "@/types/user/user.dto";

const url: string = process.env.API_URL || 'http://localhost:8080';

export const createUser = async (request: UserRequestDto): Promise<UserResponseDto> => {
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

export const updateUser = async (
   user_id: number, 
   request: UserUpdateDto, 
   token: string
): Promise<UserResponseDto> => {
   const api_url: string = `${url}/api/user/update/${user_id}`;
   const response: Response = await fetch(api_url, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(request)
   });
   if (response.status !== 200) throw new Error('error while updating user');
   const data: UserResponseDto = await response.json();
   return data;
};

export const deleteUser = async (user_id: number, token: string): Promise<UserResponseDto> => {
   const api_url: string = `${url}/api/user/delete/${user_id}`;
   const response: Response = await fetch(api_url, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      }
   });
   if (response.status !== 200) throw new Error('error while deleting user');
   const data: UserResponseDto = await response.json();
   return data;
};

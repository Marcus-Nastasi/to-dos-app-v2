'use server'

import { TodosRequestDto } from "@/types/todos/todos.dto";

const url: string = process.env.API_URL || 'http://localhost:8080';

export const getAll = async (
   user_id: number, 
   token: string, 
   page: number, 
   query: string = '', 
   client: string = '',
   status: string = '',
   priority: string = '',
   from: string = '',
   to: string = '',
   due: string = ''
) => {
   const api_url = `${url}/api/todos/all/${user_id}` +
      `?page=${page}&size=12&query=${query}&client=${client}` +
      `&status=${status}&priority=${priority}&from=${from}&to=${to}&due=${due}`;
   console.log(api_url);
   const response: Response = await fetch(api_url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      }
   });
   if (response.status !== 200) throw new Error('Erro ao buscar to-dos');
   const data = await response.json();
   return data;
};

export const create = async (todo: TodosRequestDto, token: string) => {
   const api_url = `${url}/api/todos/register`;
   const response: Response = await fetch(api_url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(todo)
   });
   if (response.status !== 201) throw new Error('Erro ao criar to-do');
   const data = await response.json();
   return data;
};

export const deleteTodo = async (id: number, token: string) => {
   const api_url = `${url}/api/todos/delete/${id}`;
   const response: Response = await fetch(api_url, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      }
   });
   if (response.status !== 200) throw new Error('Erro ao deletar to-do');
   const data = await response.json();
   return data;
};

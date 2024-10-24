'use server'

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
   const api_url = 
      `${url}/api/todos/all/${user_id}` +
      `?page=${page}&size=5&query=${query}&client=${client}` +
      `&status=${status}&priority=${priority}&from=${from}&to=${to}&due=${due}`;
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

export const create = async (
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
   const api_url = 
      `${url}/api/todos/all/${user_id}` +
      `?page=${page}&size=5&query=${query}&client=${client}` +
      `&status=${status}&priority=${priority}&from=${from}&to=${to}&due=${due}`;
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

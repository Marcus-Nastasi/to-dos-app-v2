'use server'

import { MetricsResponseDto } from "@/types/metrics/metrics.dto";

const url: string = process.env.API_URL || 'http://localhost:8080';

export const getAllMetrics = async (
   user_id: number, 
   token: string, 
   client: string = '',
   from: string = '',
   to: string = '',
): Promise<MetricsResponseDto> => {
   const api_url = `${url}/api/metrics/all/${user_id}?client=${client}&from=${from}&to=${to}`;
   const response: Response = await fetch(api_url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
      }
   });
   if (response.status !== 200) throw new Error('Error while getting metrics');
   const data: MetricsResponseDto = await response.json();
   return data;
};

export interface TodoDto {
   id: number,
   user_id: number,
   client: string,
   title: string,
   description: string,
   link: string,
   creation: number[],
   due: number[],
   status: string,
   priority: string,
   last_updated: number[]
}

export interface TodosResponseDto {
   page: number,
   per_page: number,
   total: number,
   data: TodoDto[]
}

export interface TodosRequestDto {
   user_id: number,
   title: string,
   client: string,
   description: string,
   link: string,
   due: string,
   priority: string,
}

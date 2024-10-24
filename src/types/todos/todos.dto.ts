export interface TodoDto {
   id: number,
   user_id: number,
   client: string,
   title: string,
   description: string,
   link: string,
   creation: Date,
   due: Date,
   status: string,
   priority: string,
   last_updated: Date
}

export interface TodosResponseDto {
   page: number,
   per_page: number,
   total: number,
   data: TodoDto[]
}

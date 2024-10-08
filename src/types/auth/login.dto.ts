import { UserDetails } from "./user.dto"

export interface LoginRequestDto {
   email: string,
   password: string
}

export interface LoginResponseDto {
   token: string,
   user: UserDetails
}

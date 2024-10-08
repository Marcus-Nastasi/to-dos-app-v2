export interface UserDetails {
   id: number,
   name: string,
   email: string,
   password: string,
   enabled: boolean,
   username: string,
   authorities: null,
   accountNonLocked: boolean,
   accountNonExpired: boolean,
   credentialsNonExpired: boolean
}

export interface UserRequestDto {
   name: string;
   email: string;
   password: string;
}

export interface UserResponseDto {
   id: number,
   name: string,
   email: string,
   password: string,
   enabled: boolean,
   username: string,
   authorities: null,
   accountNonLocked: boolean,
   accountNonExpired: boolean,
   credentialsNonExpired: boolean
}

import { IsDateString, IsOptional, IsLatitude, IsLongitude, IsNotEmpty, IsNumberString } from 'class-validator'

export class UserCreate {
	@IsNotEmpty()
	name: string
	
	@IsNotEmpty()
	email: string
	
	@IsOptional()
	@IsNumberString()
	phone?: string
	
	@IsOptional()
	@IsDateString()
	dob?: string
	
	@IsOptional()
	address?: string
	
	@IsNotEmpty()
	@IsLongitude()
	longitude: number
	
	@IsNotEmpty()
	@IsLatitude()
	latitude: number
	
	@IsNotEmpty()
	password: string
}

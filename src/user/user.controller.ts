import { Controller } from '@nestjs/common'
import { GrpcMethod } from "@nestjs/microservices"

import { UserService } from './user.service'
import { UserCreate }  from './dtos/user.create.dto'
import { UserUpdate }  from './dtos/user.update.dto'
import { UserQuery }   from './dtos/user.query.dto'

@Controller()
export class UserController {
	constructor (private readonly service: UserService) {
	}
	
	@GrpcMethod()
	async userQueryAll ({ take, skip, orderBy, order, start, end, q, v }: UserQuery) {
		const options = {
			orderBy: orderBy || 'created',
			order  : order || 'DESC',
			...(
				take ? { take: Number(take) } : {}
			),
			...(
				skip ? { skip: Number(skip) } : {}
			),
			...(
				start ? { start } : {}
			),
			...(
				end ? { end } : {}
			),
			...(
				q ? { q } : {}
			),
			...(
				v ? { v } : {}
			)
		} as UserQuery
		
		const users = await this.service.queryAll(options)
		
		return {
			data: users.map((user) => {
				delete user.password
				
				return user
			})
		}
	}
	
	@GrpcMethod()
	async userQueryById ({ id }: { id: string }) {
		const user = await this.service.queryById(id)
		delete user.password
		
		return { data: user }
	}
	
	@GrpcMethod()
	async userCreate (newUser: UserCreate) {
		const user = await this.service.create(newUser)
		
		return { data: user.publicId }
	}
	
	@GrpcMethod()
	public async userVerify ({ id, code }: { id: string; code: string }) {
		const user = await this.service.verify(id, code)
		
		return { data: user.publicId }
	}
	
	@GrpcMethod()
	async userUpdate ({ id, newUser }: { id: string; newUser: UserUpdate }) {
		const user = await this.service.update(id, newUser)
		
		return { data: user.publicId }
	}
	
	@GrpcMethod()
	async userArchive ({ id }: { id: string }) {
		const user = await this.service.archive(id)
		
		return { data: user.publicId }
	}
	
	@GrpcMethod()
	public async userResetPassword ({ email }: { email: string }) {
		const newPassword = await this.service.resetPassword(email)
		
		return { data: { email, newPassword } }
	}
	
	@GrpcMethod()
	public async userGenerateCode ({ id }: { id: string }) {
		const user = await this.service.generateCode(id)
		
		return { data: user.publicId }
	}
	
	@GrpcMethod()
	async deleteArchives () {
		const users = await this.service.removeArchives()
		
		return {
			data: users.map((user) => user.publicId)
		}
	}
}

import { Module }        from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"


import * as ormconfig from "./orm.config"
import { UserModule } from "./user/user.module"

@Module({
	        imports: [
		        TypeOrmModule.forRoot(ormconfig),
		        UserModule
	        ]
        })
export class AppModule {
}

import 'dotenv/config'

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory }            from '@nestjs/core'
import { Transport }              from "@nestjs/microservices"
import { useContainer }           from 'class-validator'
import { join }                   from 'path'

import { AppModule } from './app.module'

const logger              = new Logger('Main')
const microserviceOptions = {
	transport: Transport.GRPC,
	options  : {
		port     : process.env.PORT || 5000,
		package  : 'app_user',
		protoPath: join(__dirname, '../src/app.proto')
	}
}

async function bootstrap () {
	const app = await NestFactory.createMicroservice(AppModule, microserviceOptions)
	app.useGlobalPipes(
		new ValidationPipe({
			                   transform      : true,
			                   whitelist      : true,
			                   validationError: { target: false }
		                   })
	)
	
	useContainer(app.select(AppModule), { fallbackOnErrors: true })
	
	app.listen(() => {
		logger.log('User microservide is listening on port: ' + process.env.PORT || 5000)
	})
}

bootstrap()

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'

import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configuration } from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MongooseModule.forRoot(configuration.database.host, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      createIndexes: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

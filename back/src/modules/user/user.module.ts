import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { HashPassowrdProviderService } from './services/hashPasswordProvider.service';
import { UserService } from './services/user.services';
import { jwtConstants } from './constants/auth';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './auth/JwtStrategy';
import { configuration } from '../../config/configuration'
import { SubOrganizationModule } from '../sub-organization/sub-organization.module'
import { getgid } from 'process';
@Module({
  imports: [
    PassportModule,
    SubOrganizationModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    //mailer module prod
    /*
        MailerModule.forRoot({
          transport: {
    
    
            service: 'gmail',
            auth: {
              user: configuration.EMAIL_ID, // generated ethereal user
              pass: configuration.EMAIL_PASS //process.env.EMAIL_PASS // generated ethereal password
            },
    
          },
          defaults: {
            from: `"nest-modules" <${configuration.EMAIL_ID}>`, // outgoing email ID
          }
        })
        */


    // mailer module local

    MailerModule.forRoot({
      transport: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        tls: {
          rejectUnauthorized: false
        },
        auth: {
          user: configuration.EMAIL_ID,
          pass: configuration.EMAIL_PASS,
        },
      },
      defaults: {
        from: configuration.EMAIL_ID,
      }
    })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    HashPassowrdProviderService,
    AuthService,
    JwtStrategy,
  ],
  exports: [UserService],

})
export class UserModule { }

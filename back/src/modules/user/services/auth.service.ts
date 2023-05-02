import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {jwtConstants} from '../constants/auth'
import { HashPassowrdProviderService } from './hashPasswordProvider.service';
import { UserService } from './user.services';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashPasswordProviderService: HashPassowrdProviderService,
    private jwtService: JwtService,
  ) {}

  public async login(email: string, password: string) {
    const userExists = await this.userService.findByEmail(email);

    if (userExists) {
      const passwordsMatch =
        await this.hashPasswordProviderService.compareHashedPasswordWithPasswordProviderAsync(
          password,
          userExists.password,
        );

      if (passwordsMatch) {
        const user = userExists.toObject();
        delete user['organisation']
        delete user['password']
        return {
          user: user,
          token: this.jwtService.sign(user , jwtConstants),
        }
      }
      else
      return {
        success:false,
        message:{
          ar:'كلمة السر غير صحيحة',
          fr:'vérifier  votre mot de passe',
          en:'Verify your password'
        }
      }
    }
    else{
      return {
        success:false,
        message:{
          ar:'المستخدم غير موجود',
          fr:'l`utilisateur n`existe pas',
          en:'user does not exist'
        }

      }
    }
    }

    
  }


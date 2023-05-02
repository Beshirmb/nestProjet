import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashPassowrdProviderService {
  public async hashPasswordAsync(password: string): Promise<string> {
    return hash(password, 8);
  }

  public async compareHashedPasswordWithPasswordProviderAsync(
    passwordProvider: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(passwordProvider, hashedPassword);
  }
}

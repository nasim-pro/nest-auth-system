import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/user.schema';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),

     JwtModule.registerAsync({
       inject: [ConfigService],
       useFactory: (config: ConfigService) => ({
         secret: config.get<string>('JWT_SECRET'),
         signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d' } as JwtSignOptions,
       }),
     }),
  ],
  
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

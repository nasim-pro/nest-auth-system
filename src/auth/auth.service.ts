import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/user.schema';
import { LoginDto, RegisterDto } from './auth.dto';



@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(dto: RegisterDto) {

        const existingUser = await this.userModel.findOne({
            email: dto.email,
        });

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userModel.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        });

        return {
            message: 'User registered',
        };
    }

    async login(dto: LoginDto) {

        const user = await this.userModel.findOne({
            email: dto.email,
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(
            dto.password,
            user.password,
        );

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user._id,
            email: user.email,
            name: user.name,
        };

        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token,
        };
    }
}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async create(userData: any) {
        const user = new this.userModel(userData);
        return user.save();
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }
}

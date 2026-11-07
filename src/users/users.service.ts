import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) 
    {}

    createUser(email: string, password: string): Promise<User> {
        const newUser = this.usersRepository.create({ email, password });
        return this.usersRepository.save(newUser);
    }

    async findOne(id: number) {
        return this.usersRepository.findOne({ where: { id } });
    }

    async find(email: string) {
        return this.usersRepository.find({ where: { email } });
    }

    async update(id: number, updateUserDto: Partial<User>) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, updateUserDto);
        return this.usersRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.usersRepository.remove(user);
    }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { UserInput } from './user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(input: UserInput): Promise<User> {
    const user = new User(input);
    user.password = await bcrypt.hash(user.password, 10);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

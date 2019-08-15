import { Injectable, BadRequestException } from '@nestjs/common';
import { UserInput, AddFriendInput } from './user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUsers(params): Promise<User[]> {
    return await this.userRepository.find(params);
  }

  async findFriends(params): Promise<User[]> {
    return await this.userRepository.findByIds(params);
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
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

  async addFriend(input: AddFriendInput): Promise<any> {
    const user = await this.userRepository.findOne(input.user);
    if (user.friends) {
      if (!user.friends.includes(input.newFriend)) {
        await user.friends.push(input.newFriend);
      }
    } else {
      user.friends = [input.newFriend];
    }
    await this.userRepository.save(user);
    return user;
  }
}

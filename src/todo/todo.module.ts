import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { UserService } from './../user/user.service';
import { User } from './../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  providers: [
    TodoResolver,
    TodoService,
    UserService,
  ],
})
export class TodoModule {}

import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: MongoRepository<Todo>,
      ) {}

    async createTodo(input) {
        // const newTodo = new Todo(input);
        // return await newTodo.
    }
}

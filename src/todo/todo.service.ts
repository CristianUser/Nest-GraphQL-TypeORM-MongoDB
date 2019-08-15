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
        const newTodo = new Todo(input);
        return await this.todoRepository.save(newTodo);
    }

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async findOne(_id: string ): Promise<Todo> {
        return await this.todoRepository.findOne(_id);
    }
}

import { Resolver, Query } from '@nestjs/graphql';
import { TodoService } from 'dist/todo/todo.service';

@Resolver('Todo')
export class TodoResolver {

    constructor(private todoService: TodoService) {}

    @Query()
    async todos() {
        return await this.todoService// is incomplete
    }
}

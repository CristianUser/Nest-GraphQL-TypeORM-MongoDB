import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { UserService } from './../user/user.service';

@Resolver('Todo')
export class TodoResolver {

    constructor(private todoService: TodoService, private userService: UserService) {}

    @Query(() => [Todo])
    async todos() {
        return await this.todoService.findAll();
    }

    @Query(() => [Todo])
    async todo(@Args('_id') id: string) {
        return await this.todoService.findOne(id);
    }

    @Mutation(() => Todo)
    async createTodo(@Args('input') input) {
        return await this.todoService.createTodo(input);
    }

    @ResolveProperty()
    async user(@Parent() root: Todo) {
      const { user } = root;
      return await this.userService.findOne(user);
    }
}

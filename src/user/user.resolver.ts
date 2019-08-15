import { Resolver, Query, Mutation, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserInput, AddFriendInput } from './user.input';


@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return await 'world';
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('_id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: UserInput) {
    return await this.userService.create(input);
  }

  @Mutation(() => User)
  async addFriend(@Args('input') input: AddFriendInput) {
    return await this.userService.addFriend(input);
  }

  @ResolveProperty()
  async friends(@Parent() root: User) {
    const { friends } = root;
    const res = await this.userService.findFriends(friends);
    console.log(res)
    return res
  }
}

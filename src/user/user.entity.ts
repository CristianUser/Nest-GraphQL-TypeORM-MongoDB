import { Entity, Column, ObjectIdColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserInput } from './user.input';

async function hashPassword(password: string) {
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });

  return hashedPassword;
}

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  saltSecret: string;

  constructor(input?: UserInput) {
    if (input) {
      this.username = input.username;
      this.password = input.password;
    }
  }

  // async hashPassword(pass: string) {
  //   return await bcrypt.hash(pass, 10);
  // }

  async verifyPassword(pass: string) {
    return await bcrypt.compare(pass, this.password);
  }
}

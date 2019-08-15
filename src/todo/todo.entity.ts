import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Todo {
    @ObjectIdColumn()
    _id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    user: string;

    constructor(input?) {
        if (input) {
            this.description = input.description;
            this.title = input.title;
            this.user = input.user;
        }
    }
}

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
}

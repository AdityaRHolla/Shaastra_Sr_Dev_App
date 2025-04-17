import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Task } from "./Task.js";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class TaskHistory {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column("varchar")
  action!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  details?: string;

  @Field(() => Date)
  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  timestamp!: Date;

  @ManyToOne(() => Task, (task) => task.history, { onDelete: "CASCADE" })
  task!: Task;
}

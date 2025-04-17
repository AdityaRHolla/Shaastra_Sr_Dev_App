import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, Float, Int } from "type-graphql";
import { TaskHistory } from "./TaskHistory.js";

@ObjectType() 
@Entity()
export class Task {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column("varchar")
  title!: string;

  @Field(() => String)
  @Column("text")
  description!: string;

  @Field(() => String)
  @Column("varchar")
  priority!: string;

  @Field(() => Boolean)
  @Column("boolean", { default: false })
  completed!: boolean;

  @OneToMany(() => TaskHistory, history => history.task)
  history!: TaskHistory[];
}

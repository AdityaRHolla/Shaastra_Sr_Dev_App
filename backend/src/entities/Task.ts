// src/entities/Product.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, Float, Int } from "type-graphql";

@ObjectType() // <-- This is required!
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
}

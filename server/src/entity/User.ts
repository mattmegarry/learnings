import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import { IsEmail, MinLength, MaxLength } from "class-validator";
import { Snippet } from "./Snippet";

import { hashSaltPassword } from "../utils/auth";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 35, unique: true })
  username: string;

  @Column({ type: "varchar", length: 320, unique: true })
  @IsEmail({}, { message: "Please enter a valid email address" })
  email: string;

  @Column({ type: "varchar", length: 60, select: false })
  @MinLength(8, { message: "Password must be $constraint1 characters or more" })
  @MaxLength(60, {
    message: "Password must be $constraint1 characters or more"
  })
  password: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Snippet, snippet => snippet.user)
  snippets: Snippet[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashSaltPassword(this.password);
  }
}

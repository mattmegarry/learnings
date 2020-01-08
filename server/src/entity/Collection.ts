import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

import { User } from "./User";
import { Snippet } from "./Snippet";

@Entity()
export class Collection {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 60, nullable: false, unique: true })
  collectionName: string;

  @Column({ nullable: false })
  userId: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.snippets)
  user: User;

  @ManyToMany(() => Snippet, snippet => snippet.collections)
  snippets: Snippet[];
}

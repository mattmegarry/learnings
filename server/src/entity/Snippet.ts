import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  questionText: string;

  @Column({ type: "varchar", length: 2500, nullable: false })
  snippetText: string;

  @Column({ nullable: false })
  userId: string;

  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.snippets)
  user: User;
}

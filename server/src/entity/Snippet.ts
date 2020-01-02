import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  question: string;

  @Column({ type: "varchar", length: 2500, unique: true })
  snippetText: string;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, user => user.snippets)
  user: User;
}

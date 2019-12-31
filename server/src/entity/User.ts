import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Snippet } from "./Snippet";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 35, unique: true })
  userName: string;

  @Column({ type: "varchar", length: 320, unique: true })
  email: string;

  @OneToMany(type => Snippet, snippet => snippet.user)
  snippets: Snippet[];
}

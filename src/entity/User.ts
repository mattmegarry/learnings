import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 35, unique: true })
  userName: string;

  @Column({ type: "varchar", length: 320, unique: true })
  email: string;
}

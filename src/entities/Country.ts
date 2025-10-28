import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { City } from "./City";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ length: 2, nullable: true })
  country_code_two!: string | null;

  @Column({ length: 3, nullable: true })
  country_code_three!: string | null;

  @Column({ nullable: true, type: "integer" })
  mobile_code!: number | null;

  @Column({ nullable: true, type: "integer" })
  continent_id!: number | null;

  @OneToMany(() => City, (city) => city.country)
  cities!: City[];
}

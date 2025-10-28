import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Country } from "./Country";
import { Airport } from "./Airport";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  is_active!: boolean;

  @Column({ type: "real", nullable: true })
  lat!: number | null;

  @Column({ type: "real", nullable: true })
  long!: number | null;

  @ManyToOne(() => Country, (country) => country.cities, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "country_id" })
  country!: Country | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @OneToMany(() => Airport, (airport) => airport.city)
  airports!: Airport[];
}

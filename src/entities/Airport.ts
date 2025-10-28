import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { City } from "./City";

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  icao_code!: string | null;

  @Column({ length: 3 })
  iata_code!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  type!: string | null;

  @Column({ type: "real", nullable: true })
  latitude_deg!: number | null;

  @Column({ type: "real", nullable: true })
  longitude_deg!: number | null;

  @Column({ type: "integer", nullable: true })
  elevation_ft!: number | null;

  @ManyToOne(() => City, (city) => city.airports, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "city_id" })
  city!: City | null;

  @Column({ nullable: true })
  city_id!: number | null;
}

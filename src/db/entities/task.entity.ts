import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export default class TaskEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column({type: 'varchar', length: 255})
	title: string;
	@Column({type: 'varchar', length: 255})
	description: string;
	@Column({type: 'varchar', length: 50})
	status: string;
	@Column({type: 'timestamptz', name:'expiration_date'})
	expirationDate: Date;
}
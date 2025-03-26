import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export default class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@Column({ type: 'varchar', length: 100 })
	username: string;
	@Column({ type: 'varchar', length: 100 })
	password: string;
}

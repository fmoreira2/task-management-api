import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
@Injectable()
export class UsersService {
	private readonly users: CreateUserDto[] = [
		{
			id: uuid(),
			username: 'john',
			password: bcryptHashSync('changeme', 10),
		},
		{
			id: uuid(),
			username: 'chris',
			password: bcryptHashSync('morieseea22', 10),
		},
	];
	create(createUserDto: CreateUserDto) {
		createUserDto.id = uuid();
		createUserDto.password = bcryptHashSync(createUserDto.password, 10);
		this.users.push(createUserDto);
		return 'This action adds a new user';
	}

	findAll() {
		return this.users;
	}

	findOne(id: string) {
		return `This action returns a #${id} user`;
	}

	findOneUsername(username: string): CreateUserDto  {
		const user = this.users.find((user) => user.username === username);
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	}

	// update(id: string, updateUserDto: UpdateUserDto) {
	// 	return `This action updates a #${id} user`;
	// }

	// remove(id: string) {
	// 	return `This action removes a #${id} user`;
	// }
}

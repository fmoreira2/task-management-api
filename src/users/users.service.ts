import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';
import UserEntity from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}

	

	async create(createUserDto: CreateUserDto) {

		const userExists = await this.userRepository.findOne({ where: {username: createUserDto.username} });

		if (userExists) {	
			throw new ConflictException(`User: ${createUserDto.username} already exists`);
		}
		
		createUserDto.password = bcryptHashSync(createUserDto.password, 10);

		const {id, username} = this.userRepository.create(createUserDto);

		return {id, username};		
		
	}


	findOne(id: string) {
		return `This action returns a #${id} user`;
	}

	async findOneUsername(username: string): Promise<CreateUserDto> {
		const user = await this.userRepository.findOne({ where: {username} });

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

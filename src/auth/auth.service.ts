import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	private jwtExpiresIn: number;

	private jwtExpiresInString: string;
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {
		this.jwtExpiresInString = this.configService.get<string>('JWT_EXPIRES_IN') ?? '1h';

		this.jwtExpiresIn = this.parseJwtExpirationToSeconds(this.jwtExpiresInString);
	}

	private parseJwtExpirationToSeconds(expiresIn: string): number {
		const unit = expiresIn.slice(-1);
		const value = parseInt(expiresIn.slice(0, -1));

		switch (unit) {
			case 'd':
				return value * 86400;
			case 'h':
				return value * 3600;
			case 's':
				return value;
			default:
				return 3600; // default 1 hour
		}
	}

	async validateUser(username: string, pass: string): Promise<AuthResponseDto> {
		const user = await this.usersService.findOneUsername(username);
		console.log(user);
		if (!user || !bcryptCompareSync(pass, user.password))
			throw new UnauthorizedException('Invalid credentials');

		const payload = { sub: user.id, username: user.username };
		const accessToken = this.jwtService.sign(payload);
		return { token: accessToken, expiresIn: this.jwtExpiresIn };
	}
}

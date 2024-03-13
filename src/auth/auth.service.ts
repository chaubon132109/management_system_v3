import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/user.entity';
@Injectable()
        
export class AuthService {
    constructor(private readonly userService : UsersService, private readonly jwtSerVice : JwtService, private readonly configService: ConfigService){}
    async login(username: string, password: string): Promise<string | null> {
        const user = await this.userService.findOneByUsername(username);
        if (!user) return null;
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;
    
        const payload = { username: username, id: user.id, role: user.role };
        return this.jwtSerVice.sign(payload);
    }
    
    async signCookie(res: Response, token: string) {
        const expirationDate = new Date(Date.now() + this.configService.get('JWT_COOKIE_EXPIRES_IN') * 1000);
        log(expirationDate);
        res.cookie('jwt', token, {
          expires: expirationDate,
          httpOnly: true,
          secure: this.configService.get('NODE_ENV') === 'production'
        });
 
    }
    async logout(res: Response) {
        //xóa token
        res.clearCookie('jwt');
        return res.status(HttpStatus.OK).json({ message: 'Logout thành công' });
    }
    async register(user: User): Promise<User | any> {
        try {
            const existingUser = await this.userService.findOneByUsername(user.username);
            if (existingUser) {
                return {result : false, message : 'User already registered'};
            }
            const newUser = await this.userService.create(user);
            return {result : true, message : 'Register completed'};;
        } catch (err) {
            throw err;
        }
    }
}
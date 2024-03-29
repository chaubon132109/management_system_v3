import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { User } from './user.entity';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { RolesGuard } from 'src/auth/role.gaurd';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
@UseGuards(AuthGuard)  
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
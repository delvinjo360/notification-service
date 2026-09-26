import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { USER_REPOSITORY } from '../common/constants/tokens.constant';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [
    UserRepository,
    { provide: USER_REPOSITORY, useExisting: UserRepository },
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from '../../common/database/base.repository';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) model: typeof User) {
    super(model);
  }
}

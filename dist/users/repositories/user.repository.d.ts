import { BaseRepository } from '../../common/database/base.repository';
import { User } from '../models/user.model';
export declare class UserRepository extends BaseRepository<User> {
    constructor(model: typeof User);
}

import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  ArrayNotEmpty,
} from 'class-validator';
import { NotificationChannel } from '../models/notification.model';

export class CreateNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(NotificationChannel, { each: true })
  channel: NotificationChannel[];
}

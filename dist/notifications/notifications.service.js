"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const notification_model_1 = require("./models/notification.model");
const tokens_constant_1 = require("../common/constants/tokens.constant");
let NotificationsService = class NotificationsService {
    notificationRepository;
    userRepository;
    constructor(notificationRepository, userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const user = await this.userRepository.findById(dto.userId);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${dto.userId} not found`);
        }
        return this.notificationRepository.create({
            content: dto.content,
            userId: dto.userId,
            channel: dto.channel,
            status: notification_model_1.NotificationStatus.PENDING,
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tokens_constant_1.NOTIFICATION_REPOSITORY)),
    __param(1, (0, common_1.Inject)(tokens_constant_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map
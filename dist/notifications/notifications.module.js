"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const notification_model_1 = require("./models/notification.model");
const notification_repository_1 = require("./repositories/notification.repository");
const users_module_1 = require("../users/users.module");
const tokens_constant_1 = require("../common/constants/tokens.constant");
const notifications_service_1 = require("./notifications.service");
const notifications_controller_1 = require("./notifications.controller");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([notification_model_1.Notification]),
            users_module_1.UsersModule,
        ],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [
            notification_repository_1.NotificationRepository,
            { provide: tokens_constant_1.NOTIFICATION_REPOSITORY, useExisting: notification_repository_1.NotificationRepository },
            notifications_service_1.NotificationsService,
        ],
        exports: [tokens_constant_1.NOTIFICATION_REPOSITORY],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map
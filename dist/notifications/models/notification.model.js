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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.NotificationStatus = exports.NotificationChannel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const base_model_1 = require("../../common/database/base.model");
const user_model_1 = require("../../users/models/user.model");
var NotificationChannel;
(function (NotificationChannel) {
    NotificationChannel["IN_APP"] = "IN-APP";
    NotificationChannel["EMAIL"] = "E-MAIL";
    NotificationChannel["SMS"] = "SMS";
    NotificationChannel["PUSH"] = "PUSH";
})(NotificationChannel || (exports.NotificationChannel = NotificationChannel = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "PENDING";
    NotificationStatus["PROCESSING"] = "PROCESSING";
    NotificationStatus["SUCCESS"] = "SUCCESS";
    NotificationStatus["FAILED"] = "FAILED";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
let Notification = class Notification extends base_model_1.BaseModel {
    content;
    userId;
    user;
    channel;
    status;
};
exports.Notification = Notification;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false, field: 'user_id' }),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Notification.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.ENUM(...Object.values(NotificationChannel))),
        allowNull: false,
    }),
    __metadata("design:type", Array)
], Notification.prototype, "channel", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(NotificationStatus)),
        allowNull: false,
        defaultValue: NotificationStatus.PENDING,
    }),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
exports.Notification = Notification = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'notifications', timestamps: true, underscored: true })
], Notification);
//# sourceMappingURL=notification.model.js.map
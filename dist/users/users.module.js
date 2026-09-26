"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const user_repository_1 = require("./repositories/user.repository");
const tokens_constant_1 = require("../common/constants/tokens.constant");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_model_1.User])],
        providers: [
            user_repository_1.UserRepository,
            { provide: tokens_constant_1.USER_REPOSITORY, useExisting: user_repository_1.UserRepository },
        ],
        exports: [tokens_constant_1.USER_REPOSITORY],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map
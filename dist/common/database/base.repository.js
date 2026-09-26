"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findById(id) {
        return this.model.findByPk(id);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async findOne(where) {
        return this.model.findOne({ where });
    }
    async update(id, data) {
        const record = await this.findById(id);
        if (!record)
            return null;
        return record.update(data);
    }
    async delete(id) {
        const deletedCount = await this.model.destroy({
            where: { id },
        });
        return deletedCount > 0;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map
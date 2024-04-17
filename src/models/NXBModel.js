const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
    {
        tenNXB: {
            type: String,
            required: [true, 'Vui lòng nhập tên NXB!'],
            unique: true

        },

        diaChi: {
            type: String,
            required: [true, 'Vui lòng nhập Địa chỉ!'],

        },

    },
    { timestamps: true } // Tự động thêm timestamp cho mỗi bản ghi (createdAt, updatedAt)
);

const NXB = mongoose.model('NXB', userSchema);

module.exports = NXB;

const mongoose = require("mongoose");
// const NXB = require('./NXBModel');
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
    {
        maSach: {
            type: String,
            required: [true, 'Vui lòng nhập mã sách!'],

        },
        tenSach: {
            type: String,
            required: [true, 'Vui lòng nhập tên sách!'],
        },
        anhSach: {
            type: String,
            required: [true, 'Vui lòng thêm ảnh!'],
        },
        moTa: {
            type: String,
            required: [true, 'Vui lòng nhập mô tả!'],
        },
        donGia: {
            type: Number,
            required: [true, 'Vui lòng nhập đơn giá!']
        },
        soQuyen: {
            type: Number,
            required: [true, 'Vui lòng nhập số quyển!'],
        },
        namXuatBan: {
            type: String,
            required: [true, 'Vui lòng nhập năm xuất bản!'],

        },
        MaXNB: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'NXB',
            required: [true, 'Vui lòng chọn nhà xuất bản!'],
        },

        tacGia: {
            type: String,
            required: [true, 'Vui lòng nhập tên tác giả!'],

        },

    },
    { timestamps: true } // Tự động thêm timestamp cho mỗi bản ghi (createdAt, updatedAt)
);

const Sach = mongoose.model('Sach', userSchema);

module.exports = Sach;

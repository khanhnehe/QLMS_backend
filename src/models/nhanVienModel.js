const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
    {

        mSNV: {
            type: String,
            required: [true, 'Vui lòng nhập mã nhân viên!'],

        },
        hoTenNV: {
            type: String,
            required: [true, 'Vui lòng nhập họ tên nhân viên!']
        },
        anhĐaiien: {
            type: Array,
        },
        password: {
            type: String,
            required: [true, 'Vui lòng nhập password!']
        },
        chucVu: {
            type: String,
            required: [true, 'Vui lòng nhập Chức vụ!'],
        },

        diaChi: {
            type: String,
            required: [true, 'Vui lòng nhập địa chỉ!'],
        },
        dienThoai: {
            type: String,
            required: [true, 'Vui lòng nhập số điện thoại!'],
            trim: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'], // Phân quyền: user hoặc admin
            default: 'admin',
        },

    },
    { timestamps: true } // Tự động thêm timestamp cho mỗi bản ghi (createdAt, updatedAt)
);

const NhanVien = mongoose.model('NhanVien', userSchema);

module.exports = NhanVien;

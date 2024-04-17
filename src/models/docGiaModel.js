const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
    {
        hoLot: {
            type: String,
            required: [true, 'Vui lòng nhập họ!']
        },
        ten: {
            type: String,
            required: [true, 'Vui lòng nhập tên!']
        },
        password: {
            type: String,
            required: [true, 'Vui lòng nhập password!']
        },
        ngaySinh: {
            type: String,
            required: [true, 'Vui lòng nhập ngay sinh!'],
        },

        phai: {
            type: String,
            enum: ['Nam', 'Nữ'],
            default: 'Nam',

        },
        anh: {
            type: Array,
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
            default: 'user',
        },

    },
    { timestamps: true } // Tự động thêm timestamp cho mỗi bản ghi (createdAt, updatedAt)
);

const DocGia = mongoose.model('DocGia', userSchema);

module.exports = DocGia;

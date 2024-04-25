const mongoose = require('mongoose');

const PhieuTheoDoiItemSchema = new mongoose.Schema({
    sach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sach',
        required: true
    },
    image: {
        type: String,
        required: true

    },
    masach: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const PhieuTheoDoiSchema = new mongoose.Schema({
    docgia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DocGia',
        required: true
    },
    PhieuMuonItems: [PhieuTheoDoiItemSchema],

    orderCode: {
        type: String,
        required: true,
        unique: true
    },

    ngayMuon: {
        type: Date,
    },
    hanTra: {
        type: Date,
    },
    ngayTra: {
        type: Date,
    },

    totalPrice: {
        type: Number,
        default: 0
    },

    trangThai: {
        type: String,
        enum: ['Chờ xác nhận', 'Đang mượn', 'Đã trả', 'Đã hủy'],
        default: 'Chờ xác nhận'
    }
}, {
    timestamps: true,
});

const PhieuTheoDoi = mongoose.model('PhieuTheoDoi', PhieuTheoDoiSchema);

module.exports = PhieuTheoDoi;


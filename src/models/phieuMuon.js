const mongoose = require('mongoose');

const PhieuMuonItemSchema = new mongoose.Schema({
    sach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sach',
        required: true
    },
    image: [String],

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const PhieuMuonSchema = new mongoose.Schema({
    docgia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DocGia',
        required: true
    },
    PhieuMuonItems: [PhieuMuonItemSchema],

    orderCode: {
        type: String,
        required: true,
        unique: true
    },

    ngayMuon: {
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
        enum: ['Chờ xác nhận', 'Đang mượn', 'Đã trả',],
        default: 'Chờ xác nhận'
    }
}, {
    timestamps: true,
});

const PhieuMuon = mongoose.model('PhieuMuon', PhieuMuonSchema);

module.exports = PhieuMuon;


import PhieuTheoDoi from '../models/phieuMuon';
import Cart from '../models/cartModel';

const checkOutPhieu = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.docgia) {
                resolve({
                    errCode: 1,
                    errMessage: 'doc gia not found'
                })
            }

            // Tìm giỏ hàng dựa trên docgia
            const cart = await Cart.findOne({ docgia: data.docgia });

            // Nếu không tìm thấy giỏ hàng, trả về lỗi
            if (!cart) {
                resolve({
                    errCode: 2,
                    errMessage: 'Cart not found!'
                })
            }

            const orderCode = 'MA-' + Date.now();

            let totalPrice = 0;
            cart.cartItems.forEach(item => {
                totalPrice += item.price;
            });

            // Tạo phiếu mượn mới
            const phieu = await PhieuTheoDoi.create({
                docgia: data.docgia,
                PhieuMuonItems: cart.cartItems,
                totalPrice: totalPrice,
                orderCode: orderCode,

            });

            // Xóa giỏ hàng sau khi checkout
            await Cart.deleteOne({ _id: cart._id });
            resolve({
                errCode: 0,
                errMessage: 'ok',
                phieu
            });

        } catch (error) {
            reject(error);
        }
    });
}

const confirmStatus = (phieuId, actionStatus) => {
    return new Promise(async (resolve, reject) => {
        try {
            const phieu = await PhieuTheoDoi.findById(phieuId);
            if (!phieu) {
                resolve({
                    errCode: 1,
                    errMessage: 'Phiếu not found'
                });
            } else {

                if (actionStatus === 'Hủy Mượn') {
                    phieu.ngayMuon = new Date();
                    phieu.hanTra = new Date();
                    phieu.trangThai = "Đã hủy";
                }

                else if (actionStatus === 'Đang mượn') {
                    phieu.ngayMuon = new Date();
                    phieu.hanTra = new Date();
                    phieu.trangThai = "Đang mượn",
                        phieu.hanTra.setDate(phieu.ngayMuon.getDate() + 15);
                }

                else if (actionStatus === 'Đã trả') {
                    phieu.trangThai = "Đã trả",
                        phieu.ngayTra = new Date();
                }
                await phieu.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Trạng thái đã được cập nhật',
                    phieu
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}

const getAllPhieu = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const phieu = await PhieuTheoDoi.find()
                .populate('docgia')
                .sort({ createdAt: -1, updatedAt: -1 })
            resolve({
                errCode: 0,
                errMessage: 'ok',
                phieu
            });
        } catch (e) {
            reject(e)
        }
    })
}

const getPhieuById = async (docgiaId) => {
    try {
        const phieu = await PhieuTheoDoi.find({ docgia: docgiaId }).populate('PhieuMuonItems.sach').sort({ createdAt: -1 });;
        if (!phieu) {
            return {
                errCode: 1,
                errMessage: 'Phieu not found!'
            }
        }
        return {
            errCode: 0,
            errMessage: 'ok',
            phieu
        };
    } catch (error) {
        throw error;
    }
}

const getPhieuByStatus = async (status) => {
    try {
        const phieu = await PhieuTheoDoi.find({ trangThai: status }).sort({ createdAt: -1 });
        if (!phieu) {
            return {
                errCode: 1,
                errMessage: 'Phieu not found!'
            }
        }
        return {
            errCode: 0,
            errMessage: 'ok',
            phieu
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    checkOutPhieu,
    confirmStatus,
    getAllPhieu,
    getPhieuById,
    getPhieuByStatus
}
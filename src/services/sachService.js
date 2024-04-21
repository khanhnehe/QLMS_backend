import Sach from '../models/sachModel';


const getAllSach = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let sach = await Sach.find().sort({ createdAt: -1, updatedAt: -1 })
                .populate('MaXNB', 'tenNXB');

            resolve({
                errCode: 0,
                errMessage: 'Lấy tất cả sách thành công',
                sach
            });
        } catch (e) {
            reject(e);
        }
    });
};

const checkMaSach = async (masach) => {
    return new Promise(async (resolve, reject) => {
        try {
            let maSoSach = await Sach.findOne({ maSach: masach });
            // Nếu giá trị == undefined chạy vào false
            if (maSoSach) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })

};
const createSach = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let isExistMS = await checkMaSach(data.maSach)
            if (isExistMS === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Mã sách đã tồn tại!'
                });
            }
            if (!data.tenSach || !data.donGia || !data.soQuyen || !data.anhSach || !data.moTa ||
                !data.namXuatBan || !data.MaXNB || !data.tacGia || !data.maSach) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing require parameter'
                })
            }

            let sach = await Sach.create({
                maSach: data.maSach,
                tenSach: data.tenSach,
                donGia: data.donGia,
                anhSach: data.anhSach,
                moTa: data.moTa,
                soQuyen: data.soQuyen,
                namXuatBan: data.namXuatBan,
                MaXNB: data.MaXNB,
                tacGia: data.tacGia,
            })

            resolve({
                errCode: 0,
                message: 'OK',
                sach

            });

        } catch (e) {
            reject(e)
        }
    })
}


const editSach = (data, sachId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!sachId || !data.tenSach || !data.donGia || !data.soQuyen || !data.anhSach || !data.moTa ||
                !data.namXuatBan || !data.MaXNB || !data.tacGia || !data.maSach) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu tham số yêu cầu'
                });
            }

            let sach = await Sach.findById(sachId)
            if (sach) {
                // Cập nhật các trường của sách
                sach.maSach = data.maSach;
                sach.tenSach = data.tenSach;
                sach.donGia = data.donGia;
                sach.anhSach = data.anhSach;
                sach.moTa = data.moTa;
                sach.soQuyen = data.soQuyen;
                sach.namXuatBan = data.namXuatBan;
                sach.MaXNB = data.MaXNB;
                sach.tacGia = data.tacGia;

                await sach.save();

                // Lấy lại sách từ cơ sở dữ liệu sau khi lưu để có dữ liệu mới nhất
                sach = await Sach.findById(sachId).populate('MaXNB', 'tenNXB');

                resolve({
                    errCode: 0,
                    errMessage: 'Chỉnh sửa thành công',
                    sach
                });
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'sach not found',
                    sach
                });
            }

        } catch (e) {
            reject(e);
        }
    });
};

const deleteSach = (sachId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkSach = await Sach.findById({ _id: sachId });

            if (!checkSach) {
                resolve({
                    errCode: 1,
                    errMessage: 'Sách không tìm thấy'
                });
            } else {
                await Sach.findByIdAndDelete({ _id: sachId });
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa sách thành công'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};


let getSachById = (sachId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sach = await Sach.findById(sachId).populate('MaXNB', 'tenNXB');
            if (sach) {
                resolve({
                    errCode: 0,
                    errMessage: 'Lấy sách thành công',
                    data: sach
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy sách',
                    data: {}
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = {
    createSach,
    editSach,
    deleteSach,
    getAllSach,
    getSachById
}
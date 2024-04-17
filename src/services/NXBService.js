import NXB from '../models/NXBModel';

const createNXB = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.tenNXB || !data.diaChi) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing require parameter'
                })
            }
            try {
                let nxb = await NXB.create({
                    tenNXB: data.tenNXB,
                    diaChi: data.diaChi,

                })
                resolve({
                    errCode: 0,
                    message: 'OK',
                    nxb
                });
            } catch (e) {
                if (e.code === 11000) {
                    resolve({
                        errCode: 2,
                        errMessage: 'Nhà xuất bản tồn tại!'
                    })
                }

            }

        } catch (e) {
            reject(e)
        }
    })
}


const editNXB = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data._id || !data.tenNXB || !data.diaChi) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu tham số yêu cầu'
                });
            }
            let nxb = await NXB.findById(data._id)
            if (nxb) {
                // Cập nhật các trường của NXB
                nxb.tenNXB = data.tenNXB;
                nxb.diaChi = data.diaChi;

                await nxb.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Chỉnh sửa thành công',
                    nxb
                });
            }
            else {
                resolve({
                    errCode: 2,
                    errMessage: 'nxb not found',
                    nxb
                });
            }

        } catch (e) {
            reject(e);
        }
    });
};

const deleteNXB = (NXBId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkNXB = await NXB.findById({ _id: NXBId });

            if (!checkNXB) {
                resolve({
                    errCode: 1,
                    errMessage: 'NXB không tìm thấy'
                });
            } else {
                await NXB.findByIdAndDelete({ _id: NXBId });
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa NXB thành công'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllNXB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let NXB = await NXB.find().sort({ createdAt: -1, updatedAt: -1 });
            resolve({
                errCode: 0,
                errMessage: 'Lấy tất cả NXB thành công',
                NXB
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createNXB,
    editNXB,
    deleteNXB,
    getAllNXB
}
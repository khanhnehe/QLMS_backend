import NhanVien from '../models/nhanVienModel';
import bcrypt from "bcryptjs";
import mongoose from 'mongoose';


const checkMSNV = async (masoNV) => {
    return new Promise(async (resolve, reject) => {
        try {
            let nhanVien = await NhanVien.findOne({ mSNV: masoNV });
            // Nếu giá trị == undefined chạy vào false
            if (nhanVien) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })

};

const createNhanVien = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isMSNVExists = await checkMSNV(data.mSNV);

            if (isMSNVExists === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Mã nhân viên đã tồn tại!'
                });
            }

            if (!data.mSNV || !data.hoTenNV || !data.password ||
                !data.chucVu || !data.diaChi || !data.dienThoai) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing require parameter'
                })
            }

            let hashedPassword = await bcrypt.hash(data.password, 10);

            let nhanVien = await NhanVien.create({
                mSNV: data.mSNV,
                hoTenNV: data.hoTenNV,
                password: hashedPassword,
                chucVu: data.chucVu,
                anhĐaiien: data.anhĐaiien,
                diaChi: data.diaChi,
                dienThoai: data.dienThoai,
                role: data.role
            });

            resolve({
                errCode: 0,
                message: 'OK',
                nhanVien
            });
        } catch (e) {
            reject(e);
        }
    })

}

const loginAdmin = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let nhanVien = await NhanVien.findOne({ dienThoai: data.dienThoai });

            if (!nhanVien) {
                resolve({
                    errCode: 1,
                    errMessage: 'số điện thoại không đúng!'
                });
            }

            let isPasswordMatch = await bcrypt.compare(data.password, nhanVien.password);

            if (!isPasswordMatch) {
                resolve({
                    errCode: 1,
                    errMessage: 'Mật khẩu không chính xác!'
                });
            }

            resolve({
                errCode: 0,
                message: 'OK',
                nhanVien
            });
        } catch (e) {
            reject(e);
        }
    })
}
const editNhanVien = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data._id || !data.hoTenNV || !data.password || !data.chucVu ||
                !data.diaChi || !data.dienThoai) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu tham số yêu cầu'
                });
            }
            let nhanVien = await NhanVien.findById(data._id)

            if (nhanVien) {
                // Mã hóa mật khẩu
                let hashedPassword = await bcrypt.hash(data.password, 10);

                // Cập nhật các trường của nhân viên
                nhanVien.hoTenNV = data.hoTenNV;
                nhanVien.password = hashedPassword; // Cập nhật mật khẩu
                nhanVien.chucVu = data.chucVu;
                nhanVien.diaChi = data.diaChi;
                nhanVien.dienThoai = data.dienThoai;

                await nhanVien.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Chỉnh sửa thành công',
                    nhanVien
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "nhan vien not found"
                })
            }

        } catch (e) {
            reject(e);
        }
    });
};

const deleteNhanVien = (nhanVienId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkNhanVien = await NhanVien.findById({ _id: nhanVienId });

            if (!checkNhanVien) {
                resolve({
                    errCode: 1,
                    errMessage: 'Nhân viên không tìm thấy'
                });
            } else {
                await NhanVien.findByIdAndDelete({ _id: nhanVienId });
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa nhân viên thành công'
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllNhanVien = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let nhanVien = await NhanVien.find().sort({ createdAt: -1, updatedAt: -1 });
            resolve({
                errCode: 0,
                errMessage: 'Lấy tất cả nhân viên thành công',
                nhanVien
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createNhanVien,
    editNhanVien,
    deleteNhanVien,
    getAllNhanVien,
    loginAdmin
}
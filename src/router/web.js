import express from "express";
import docGiaController from "../controllers/docGiaController";
import testHome from "../controllers/testHome";
import NXBController from "../controllers/NXBController";
import nhanVienController from "../controllers/nhanVienController";
import sachController from "../controllers/sachController";

let router = express.Router();



//khai báo all router trong đây
let initWebRouters = (app) => {
    router.get("/", testHome.getHome);
    //docgia
    router.post('/createDocGia', docGiaController.createDocGia)
    router.put('/editDocGia/:docgiaId', docGiaController.editDocGia)
    router.delete('/deleteDocGia/:docgiaId', docGiaController.deleteDocGia)
    router.get('/getAllDocGia', docGiaController.getAllDocGia)

    //nxb
    router.post('/createNXB', NXBController.createNXB)
    router.put('/editNXB', NXBController.editNXB)
    router.delete('/deleteNXB/:nxbId', NXBController.deleteNXB)
    router.get('/getAllNXB', NXBController.getAllNXB)

    //sách
    router.post('/createSach', sachController.createSach)
    router.put('/editSach', sachController.editSach)
    router.delete('/deleteSach/:sachId', sachController.deleteSach)
    router.get('/getAllSach', sachController.getAllSach)

    //nhân viên
    router.post('/createNhanVien', nhanVienController.createNhanVien)
    router.put('/editNhanVien', nhanVienController.editNhanVien)
    router.delete('/deleteNhanVien/:nhanVienId', nhanVienController.deleteNhanVien)
    router.get('/getAllNhanVien', nhanVienController.getAllNhanVien)


    return app.use("/", router)

}
module.exports = initWebRouters;

import { Router } from 'express';
import { CreateMasterAdmin } from '../Controllers/User/Admin/CreateMasterAdmin.js';
import { CreateAdmin } from '../Controllers/User/Admin/CreateAdmin.js';
import { CreateEmployee } from '../Controllers/User/Employee/CreateEmployee.js';
import { getAllemployees } from '../Controllers/User/Employee/GetAllEmployees.js';
import { DeleteEmployee } from '../Controllers/User/Employee/DeleteEmployee.js';
import { UpdateEmployee } from '../Controllers/User/Employee/UpdateEmployee.js';
import { MasterAdminMiddleware } from '../Controllers/User/Admin/MasterMiddleware.js';
import { authenticateJWT } from '../Controllers/Auth/AuthMiddleware.js';
import { Login } from '../Controllers/Auth/Login.js';
import multer from 'multer';
import { getData } from '../Controllers/RealEstate/GetAllData.js';
import { getSingleData } from '../Controllers/RealEstate/getSingleData.js';
import { editData } from '../Controllers/RealEstate/updateData.js';
import {  deleteData } from '../Controllers/RealEstate/deleteData.js';
import { createData } from '../Controllers/RealEstate/AddData.js';
import { test } from '../Utils/Email/testing.js';
import { RenewaAcount } from '../Controllers/User/Employee/Renewal.js';
import {  UpdatePerson } from '../Controllers/User/Admin/UpdatePerson.js';
import { getSinglePerson } from '../Controllers/User/getSinglePerson.js';
import { AllAdminMiddleware } from '../Controllers/User/Admin/AdminMiddleware.js';
import { UploadFiles } from '../Controllers/RealEstate/File/UploadFiles/index.js';
import { DownLoadFiles } from '../Controllers/RealEstate/File/Aws/downloadFiles/index.js';
import { deleteFilesForUser } from '../Controllers/RealEstate/File/Aws/DeleteFiles/index.js';
import { DeleteAllFiles, getAllFiles } from '../deleteAllFiles.js';
import { getPostReviewData } from '../Controllers/RealEstate/userLane/getPostReviews.js';

// import { removeAll } from '../Controllers/RealEstate/deleteAll.js';

const router = Router();

/* GET index page. */
//Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

router.get('/', (req, res) => {
  res.json({
    title: 'KGS system Management Api',
    DevelopedBy: "glen Ayienda",
    Email:"ayiendaglen@gmail.com",
    Phone:"+254713322025",

  });
});
router.get('/api',(req,res)=>{
  res.send(
    "Welcome to RGS system Management Api"

  )
}
);
//Admin route
router.route('/api/master-admin').post(upload.single('photo'),CreateMasterAdmin);
router.route('/api/admin').post(MasterAdminMiddleware,upload.single('photo'),CreateAdmin)
// router.route('/api/admin/:id').put(MasterAdminMiddleware,UpdateAdmin);
//employees route 
router.route('/api/employees').post( MasterAdminMiddleware,upload.single('photo'),CreateEmployee).get(MasterAdminMiddleware,getAllemployees);
router.route('/api/employees/:id').delete(MasterAdminMiddleware,DeleteEmployee).put(MasterAdminMiddleware,UpdateEmployee);
router.route('/api/user/renewal').post(MasterAdminMiddleware,RenewaAcount);
router.route('/api/user/profile/:id').get(authenticateJWT,getSinglePerson).patch(authenticateJWT,UpdatePerson);
router.route('/api/login').post(Login);
//datas route
router.route('/api/reviewPost/:id').get(authenticateJWT,getPostReviewData);
router.route('/api/datas').get(AllAdminMiddleware,getData).post(authenticateJWT,createData);
router.route('/api/datas/:id').get(authenticateJWT,getSingleData).patch(authenticateJWT,editData).delete(authenticateJWT,deleteData);
//files routes
router.route('/api/files/:userId').post(upload.array('files'),UploadFiles).get(DownLoadFiles).delete(deleteFilesForUser)


//testings outside scope.
// router.route('/api/delete').delete(removeAll);
router.route('/api/send').post(test);
router.route('/api/delete-all-files').delete(DeleteAllFiles);
router.route('/api/get-all-files').get(getAllFiles);
export default router;

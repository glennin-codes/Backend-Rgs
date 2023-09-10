import { Router } from 'express';
import { CreateMasterAdmin } from '../Controllers/User/Admin/CreateMasterAdmin.js';
import { CreateAdmin } from '../Controllers/User/Admin/CreateAdmin.js';
import { CreateEmployee } from '../Controllers/User/Employee/CreateEmployee.js';
import { getAllemployees } from '../Controllers/User/Employee/GetAllEmployees.js';
import { DeleteEmployee } from '../Controllers/User/Employee/DeleteEmployee.js';
import { UpdateEmployee } from '../Controllers/User/Employee/UpdateEmployee.js';

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.json({
    title: 'RGS system Management Api',
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
router.route('/api/master-admin').post(CreateMasterAdmin);
router.route('/api/admin').post(CreateAdmin)
router.route('/api/employees').post(CreateEmployee).get(getAllemployees);
router.route('/api/employees/:id').delete(DeleteEmployee).put(UpdateEmployee)

export default router;

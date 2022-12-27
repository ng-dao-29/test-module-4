import { Router } from 'express';
const staffRoutes = Router();
import { StaffModel} from "../schemas/staff.model";
import multer from 'multer';
const upload = multer();

staffRoutes.get('/create', (req, res) => {
    res.render("createStaff");
});

staffRoutes.post('/create',upload.none(), async (req, res) => {
    console.log(req.body);
    try {
        const staffNew = new StaffModel(req.body);
        let staff = await staffNew.save();
        if (staff) {
            return  res.redirect('/staff/list')
        }
        res.render('error')
    }catch (err) {
        res.render('error')
    }
})

staffRoutes.get('/list', async (req, res) => {
        try {
            const staffs = await StaffModel.find().sort({age: 1});;
            if (staffs) {
                console.log(staffs)
                res.render('list', {staffs: staffs})
            }
        } catch (err) {
            res.render('error')
        }
    })

staffRoutes.get('/delete/:id', async (req,res) => {
    try {
        const staff = await StaffModel.findOne({ _id: req.params.id });
        if (staff) {
            await staff.remove();
            res.redirect('/staff/list');
        }
        else {
            res.render('error')
        }
    }catch (err) {
        res.render('error')
    }
})

staffRoutes.get('/info/:id', async (req,res) => {
    let staff = await StaffModel.findOne({_id: req.params.id})
    res.render('InformationStaff',{staff:staff})
})

staffRoutes.get('/update/:id', async (req, res) => {
    try {
        const staff = await StaffModel.find({_id: req.params.id});
        console.log(staff);
        if (staff) {
            res.render('updateStaff', {staff : staff[0] })
        }
        else {
            res.render('error')
        }
    }catch (err) {
        res.render('error')
    }
})

staffRoutes.post('/update/:id', upload.none(), async (req,res) => {
    try {
        const staff = await StaffModel.findOne({_id: req.params.id});
        staff.name = req.body.name;
        staff.age = req.body.age;
        staff.salary = req.body.salary;
        staff.branch = req.body.branch;
        await staff.save()
        if (staff) {
            res.redirect('/staff/list');
        } else {
            res.render('error')
        }
    } catch (err) {
        console.log(err.message)
        res.render('error')
    }

})
export default staffRoutes;

const router = require('express').Router();

//#region Posts Component 

const Postsuser = require('../components/posts.component');
const Posts = new Postsuser();

const Postscustomer=require('../components/customer.component');
const Postcus=new Postscustomer();


const Postsamount=require('../components/amount.component');
const Postam=new Postsamount();

const Postsdef=require('../components/deffer_r.component');
const Postde=new Postsdef();

const Postsloan=require('../components/loan.component');
const Postloan=new Postsloan();

const Postslogin=require('../components/login.component');
const Postlogin=new Postslogin();

const Postsnormal=require('../components/normal_int.component');
const Postnor=new Postsnormal();

const Postsout=require('../components/outstanding_days.component');
const Postout=new Postsout();

const Postspenalty=require('../components/penalty_int.component');
const Postpen=new Postspenalty();

const Postsprincipal=require('../components/principal.component');
const Postprin=new Postsprincipal();

const Postsrate=require('../components/rate.component');
const Postrate=new Postsrate();


// แสดงข้อมูล หลาย row
router.get('/user', (req, res) => res.sendAsyncApi(Posts.selectAll()));
// แสดงข้อมูลแค่ row เดียว
router.get('/user/:em_id', (req, res) => res.sendAsyncApi(Posts.selectOne(req.params.em_id)));
// เพิ่มข้อมูล
router.post('/user', (req, res) => res.sendAsyncApi(Posts.create(req.body)));
// แก้ไขข้อมูล
router.put('/user/:em_id', (req, res) => res.sendAsyncApi(Posts.update(req.params.em_id, req.body)));
// ลบข้อมูล
router.delete('/user/:em_id', (req, res) => res.sendAsyncApi(Posts.delete(req.params.em_id)));
//#endregion



/////////////////////////////////////
// แสดงข้อมูล หลาย row
router.get('/customer', (req, res) => res.sendAsyncApi(Postcus.selectAll()));
// แสดงข้อมูลแค่ row เดียว
router.get('/customer/:cus_id', (req, res) => res.sendAsyncApi(Postcus.selectOne(req.params.cus_id)));
// เพิ่มข้อมูล
router.post('/customer', (req, res) => res.sendAsyncApi(Postcus.create(req.body)));
// แก้ไขข้อมูล
router.put('/customer/:cus_id', (req, res) => res.sendAsyncApi(Postcus.update(req.params.cus_id, req.body)));
// ลบข้อมูล
router.delete('/customer/:cus_id', (req, res) => res.sendAsyncApi(Postcus.delete(req.params.cus_id)));
//#endregion

module.exports = router;

///////////////////////////////////////////


// แสดงข้อมูล หลาย row
router.get('/amount_payable', (req, res) => res.sendAsyncApi(Postam.selectAll()));
// แสดงข้อมูลแค่ row เดียว
router.get('/amount_payable/:am_id', (req, res) => res.sendAsyncApi(Postam.selectOne(req.params.am_id)));
// เพิ่มข้อมูล
router.post('/amount_payable', (req, res) => res.sendAsyncApi(Postam.create(req.body)));
// แก้ไขข้อมูล
router.put('/amount_payable/:am_id', (req, res) => res.sendAsyncApi(Postam.update(req.params.am_id, req.body)));
// ลบข้อมูล

router.delete('/amount_payable/:am_id', (req, res) => res.sendAsyncApi(Postam.delete(req.params.am_id)));
//#endregion

module.exports = router;
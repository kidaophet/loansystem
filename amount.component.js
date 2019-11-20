const validate = require('validate.js');
const database = require('../configs/database');

class Postsamount {

    //table user
    constructor(valid = validate, db = database.MySqlDatabase) {
        // ใช้งาน Database
        this._database = new db();
        // สร้าง Validate
        this._validate = valid;
        this._validate.validators.presence.message = 'ຫ້າມເປັນຄ່າວ່າງ';
        this._validate.validators.format.message = 'ບໍ່ຖືກຕ້ອງຕາມຮູບແບບ';
        this._validate.validators.numericality.message = 'ເປັນໂຕເລກເທົ່ານັ້ນ';
        this.validate_rules = {

            am_pay: {
                presence: {
                    allowEmpty: false
                }
            },
            balance_r: {
                presence: {
                    allowEmpty: false
                }
            },
            balance_a: {
                presence: {
                    allowEmpty: false
                }
            },
            revenue_r: {
                presence: {
                    allowEmpty: false
                }
            },
            payed: {
                presence: {
                    allowEmpty: false
                }
            },
            pri_id: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('select * from amount_payable');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(am_id) {
        const errors = this._validate({ am_id }, {am_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from amount_payable where am_id=?', [am_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into user value(0, ?, ?, ?, ?, ?, ?)', [
            value['am_pay'],
            value['balance_r'],
            value['balance_a'],
            value['revenue_r'],
            value['payed'],
            value['pri_id']
        ]);
        return await this.selectOne(item.insertId);
    }

    // แก้ไขข้อมูล
    async update(am_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ am_id }, { am_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update user set 
                am_pay = ?, 
                balance_r = ?,
                balance_a = ?,
                revenue_r= ?,
                payed = ?,
                pri_id = ?
            where am_id = ?`, [
                value['am_pay'],
                value['balance_r'],
                value['balance_a'],
                value['revenue_r'],
                value['payed'],
                value['pri_id'],
                am_id
            ]);
        return await this.selectOne(am_id);
    }

    // ลบข้อมูล
    async delete(am_id) {
        const errors = this._validate({ am_id }, { am_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from user where am_id=?', [am_id]);
    }
}
module.exports=Postsamount;



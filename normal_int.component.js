const validate = require('validate.js');
const database = require('../configs/database');

class Postsnormal {

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

            normal_interest: {
                presence: {
                    allowEmpty: false
                }
            },
            repayment: {
                presence: {
                    allowEmpty: false
                }
            },
            discount: {
                presence: {
                    allowEmpty: false
                }
            },
            balance: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('select * from normal_interest');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(n_id) {
        const errors = this._validate({ n_id }, {n_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from normal_interest where n_id=?', [n_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into normal_interest value(0, ?, ?, ?, ?)', [
            value['normal_interest'],
            value['repayment'],
            value['discount'],
            value['balance']
        ]);
        return await this.selectOne(item.insertId);
    }

    // แก้ไขข้อมูล
    async update(n_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ n_id }, { n_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update normal_interest set 
            normal_interest = ?, 
                repayment = ?,
                discount = ?,
                balance = ?
            where n_id = ?`, [
                value['normal_interest'],
                value['repayment'],
                value['discount'],
                value['balance'],
                n_id
            ]);
        return await this.selectOne(n_id);
    }

    // ลบข้อมูล
    async delete(n_id) {
        const errors = this._validate({ n_id }, { n_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from normal_interest where n_id=?', [n_id]);
    }
}
module.exports=Postsnormal;


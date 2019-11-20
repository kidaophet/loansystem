const validate = require('validate.js');
const database = require('../configs/database');

class Postsout {

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

            outstanding_days: {
                presence: {
                    allowEmpty: false
                }
            },
            interest_receivable: {
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
            },
            loan_id: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('select * from outstanding_days');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(out_id) {
        const errors = this._validate({ out_id }, {out_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from outstanding_days where out_id=?', [out_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into outstanding_days value(0, ?, ?, ?, ?)', [
            value['outstanding_days'],
            value['interest_receivable'],
            value['repayment'],
            value['discount'],
            value['balance'],
            value['loan_id']
        ]);
        return await this.selectOne(item.insertId);
    }

    // แก้ไขข้อมูล
    async update(out_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ out_id }, { out_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update outstanding_days set 
            outstanding_days = ?, 
            interest_receivable=?
                repayment = ?,
                discount = ?,
                balance = ?,
                loan_id
            where out_id = ?`, [
                value['outstanding_days'],
                value['interest_receivable'],
                value['repayment'],
                value['discount'],
                value['balance'],
                value['loan_id'],
                out_id
            ]);
        return await this.selectOne(out_id);
    }

    // ลบข้อมูล
    async delete(out_id) {
        const errors = this._validate({ out_id }, { out_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from outstanding_days  where out_id=?', [out_id]);
    }
}
module.exports=Postsout;


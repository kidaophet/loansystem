const validate = require('validate.js');
const database = require('../configs/database');

class Postsloan {

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

            cus_id: {
                presence: {
                    allowEmpty: false
                }
            },
            em_id: {
                presence: {
                    allowEmpty: false
                }
            },
            Date_loan: {
                presence: {
                    allowEmpty: false
                }
            },
           Deadline: {
                presence: {
                    allowEmpty: false
                }
            },
            rate_id: {
                presence: {
                    allowEmpty: false
                }
            },
            pri_id: {
                presence: {
                    allowEmpty: false
                }
            },
            p_id: {
                presence: {
                    allowEmpty: false
                }
            },
            n_id: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('select * from loan');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(loan_id) {
        const errors = this._validate({ loan_id }, {loan_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from loan where loan_id=?', [loan_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into user value(0, ?, ?, ?, ?, ?, ?, ?)', [
            value['cus_id'],
            value['em_id'],
            value['Date_loan'],
            value['Deadline'],
            value['rate_id'],
            value['pri_id'],
            value['p_id'],
            value['n_id']
        ]);
        return await this.selectOne(item.insertId);
    }

    // แก้ไขข้อมูล
    async update(loan_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ loan_id }, { loan_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update loan set 
                cus_id = ?, 
                em_id = ?,
                Date_loan = ?,
                Deadline_r= ?,
                rate_id = ?,
                pri_id = ?,
                p_id = ?,
                n_id = ?
            where loan_id = ?`, [
                value['cus_id'],
                value['em_id'],
                value['Date_loan'],
                value['Deadline'],
                value['rate_id'],
                value['pri_id'],
                value['p_id'],
                value['n_id'],
                loan_id
            ]);
        return await this.selectOne(loan_id);
    }

    // ลบข้อมูล
    async delete(loan_id) {
        const errors = this._validate({ loan_id }, { loan_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from loan where loan_id=?', [loan_id]);
    }
}
module.exports=Postsloan;



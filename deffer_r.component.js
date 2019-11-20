const validate = require('validate.js');
const database = require('../configs/database');

class Postsdef {

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

            deffered_r_balance: {
                presence: {
                    allowEmpty: false
                }
            },
            revenue_recognised: {
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
        return this._database.query('select * from deffer_revenue');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(def_id) {
        const errors = this._validate({ def_id }, {def_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from deffer_revenue where def_id=?', [def_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into user value(0, ?, ?, ?, ?, ?)', [
            value['deffered_r_balance'],
            value['revenue_recognised'],
            value['pri_id'],
            value['p_id'],
            value['n_id']
        ]);
        return await this.selectOne(item.insertId);
    }

    // แก้ไขข้อมูล
    async update(def_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ def_id }, { def_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update deffer_revenue set 
            deffered_r_balance = ?, 
            revenue_recognised = ?,
            pri_id = ?,
            p_id = ?,
            n_id = ?
            where def_id = ?`, [
                value['deffered_r_balance'],
                value['revenue_recognised'],
                value['pri_id'],
                value['p_id'],
                value['n_id'],
                def_id
            ]);
        return await this.selectOne(def_id);
    }

    // ลบข้อมูล
    async delete(def_id) {
        const errors = this._validate({ def_id }, { def_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from deffer_recognised where def_id=?', [def_id]);
    }
}
module.exports=Postsdef;



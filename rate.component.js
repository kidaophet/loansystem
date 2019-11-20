const validate = require('validate.js');
const database = require('../configs/database');

class Postsrate{

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

            interest: {
                presence: {
                    allowEmpty: false
                }
            }
        };
    }

    // แสดงข้อมูลทั้งหมด
    selectAll() {
        return this._database.query('select * from rate');
    }

    // แสดงข้อมูลแค่ข้อมูลเดียว
    async selectOne(rate_id) {
        const errors = this._validate({ rate_id }, {rate_id: { numericality: true } });
        if (errors) throw { errors };
        const items = await this._database.query('select * from rate where rate_id=?', [rate_id]);
        return items.length == 0 ? null : items[0];
    }

    // เพิ่่มข้อมูลใหม่
    async create(value) {
        const errors = this._validate(value, this.validate_rules);
        if (errors) throw { errors };
        const item = await this._database.query('insert into rate value(0, ?)', [
            value['rate']
        ]);
        return await this.selectOne(item.insertId);
    }

    // แก้ไขข้อมูล
    async update(rate_id, value) {
        const errors = this._validate(value, this.validate_rules);
        const errorsId = this._validate({ rate_id }, { rate_id: { numericality: true } });
        if (errors || errorsId) throw { errors: errorsId || errors };
        await this._database.query(`
            update rate set 
                rate = ?
            where rate_id = ?`, [
                value['rate'],
                rate_id
            ]);
        return await this.selectOne(rate_id);
    }

    // ลบข้อมูล
    async delete(rate_id) {
        const errors = this._validate({ rate_id }, { rate_id: { numericality: true } });
        if (errors) throw { errors };
        return await this._database.query('delete from rate where rate_id=?', [rate_id]);
    }
}
module.exports=Postsrate;
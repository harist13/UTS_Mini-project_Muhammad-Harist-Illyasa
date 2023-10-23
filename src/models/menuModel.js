const db = require("../../db/config")

const menuModel = {}
menuModel.getAll = (cb) => {
    var rowData
    const query = db.all("SELECT * FROM menu",(err,rows) => {
        if(err) {
            cb(err,null)
        }else {
            cb(null,rows)
           
        }
    })
    console.log(rowData);
    return query
}
// lanjutkan disini
menuModel.create = (data) => {
    return db.run(`INSERT INTO menu (item,price) VALUES ('${data.item}','${data.price}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}
menuModel.findById = (id,cb) => {
    return db.get(`SELECT * FROM menu WHERE id = ${id}`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}
menuModel.update = (id,data,cb) => {
    return db.run(`UPDATE menu SET item = '${data.item}',price = '${data.price}' WHERE id = ${id}`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}
menuModel.delete = (id,cb) => {
    return db.run(`DELETE FROM menu WHERE id = ${id}`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}
menuModel.findByName = (menuName,cb) => {
    return db.all(`SELECT * FROM menu WHERE item IN ('${menuName}')`,(err,rows) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,rows)
        }
    })
}

module.exports = menuModel
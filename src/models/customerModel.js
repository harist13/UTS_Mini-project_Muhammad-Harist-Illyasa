const db = require("../../db/config")

const customerModel = {}
customerModel.getAll = (cb) => {
    var rowData
    const query = db.all("SELECT * FROM customer",(err,rows) => {
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
customerModel.create = (data) => {
    return db.run(`INSERT INTO customer (name,address,email) VALUES ('${data.name}','${data.address}','${data.email}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}
customerModel.findById = (id,cb) => {
    return db.get(`SELECT * FROM customer WHERE id = ${id}`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}
customerModel.update = (id,data,cb) => {
    return db.run(`UPDATE customer SET name = '${data.name}',address = '${data.address}',email= '${data.email}' WHERE id = ${id}`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}
customerModel.delete = (id,cb) => {
    return db.run(`DELETE FROM customer WHERE id = ${id}`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}

module.exports = customerModel
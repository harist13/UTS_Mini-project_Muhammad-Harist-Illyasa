const db = require("../../db/config")

const categoriesModel = {}
categoriesModel.getAll = (cb) => {
    var rowData
    const query = db.all("SELECT * FROM categories",(err,rows) => {
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
categoriesModel.create = (data) => {
    return db.run(`INSERT INTO categories (name) VALUES ('${data.name}')`,(err,rows) => {
        if(err) {
            throw err
        }else {
            return rows
        }
    })
}
categoriesModel.findById = (id,cb) => {
    return db.get(`SELECT * FROM categories WHERE id = ${id}`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}
categoriesModel.update = (id,data,cb) => {
    return db.run(`UPDATE categories SET name = '${data.name}'`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}
categoriesModel.delete = (id,cb) => {
    return db.run(`DELETE FROM categories WHERE id = ${id}`,(err,row) => {
        if(err){
            cb(err,null)
        }else {
            cb(null,row)
        }
    })
}

module.exports = categoriesModel
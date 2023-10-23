const customerModel = require("../models/customerModel");

const customerController = {};

// Validasi fungsi yang memeriksa apakah nilai adalah huruf
function isAlphabet(value) {
  return /^[A-Za-z\s]+$/.test(value);
}

customerController.getAll = (req, res) => {
    customerModel.getAll((err, rows) => {
        if (err) {
            return res.json({
                status: "Error",
                message: err.message
            });
        } else {
            return res.json({
                status: "OK",
                data: rows
            });
        }
    });
};

customerController.getById = (req, res) => {
    const { id } = req.params;
    customerModel.findById(id, (err, rows) => {
        if (err) {
            return res.json({
                status: "Error",
                message: err.message
            });
        } else {
            return res.json({
                status: "OK",
                data: rows
            });
        }
    });
};

customerController.create = (req, res) => {
    const { name, email } = req.body;

    // Validasi input name
    if (!name || !isAlphabet(name)) {
        return res.json({
            status: "failed",
            message: "Nama hanya boleh berisi huruf dan wajib diisi"
        });
    }

    // Validasi input email
    if (!email) {
        return res.json({
            status: "Error",
            message: "Email wajib diisi"
        });
    }

    try {
        const createCustomer = customerModel.create(req.body);
        return res.json({
            status: "OK",
            message: "Data berhasil ditambahkan!"
        });
    } catch (error) {
        return res.json({
            status: "Error",
            message: error.message
        });
    }
};

customerController.update = (req, res) => {
    try {
        customerModel.update(req.params.id, req.body, (err, rows) => {
            if (err) {
                return res.json({
                    status: "Error",
                    message: err.message
                });
            } else {
                return res.json({
                    status: "OK",
                    message: "Data berhasil diupdate!"
                });
            }
        });
    } catch (error) {
        return res.json({
            status: "Error",
            message: error.message
        });
    }
};

customerController.delete = (req, res) => {
    try {
        customerModel.delete(req.params.id, (err, rows) => {
            if (err) {
                return res.json({
                    status: "Error",
                    message: err.message
                });
            } else {
                return res.json({
                    status: "OK",
                    message: "Data berhasil dihapus!"
                });
            }
        });
    } catch (error) {
        return res.json({
            status: "Error",
            message: error.message
        });
    }
};

module.exports = customerController;

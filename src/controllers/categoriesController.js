const categoriesModel = require("../models/categoriesModel");

const categoriesController = {};

// Validasi fungsi yang memeriksa apakah nilai adalah huruf
function isAlphabet(value) {
  return /^[A-Za-z\s]+$/.test(value);
}

categoriesController.getAll = (req, res) => {
  const categories = categoriesModel.getAll((err, rows) => {
    if (err) {
      res.json({
        status: "OK",
        data: []
      });
    } else {
      res.json({
        status: "OK",
        data: rows
      });
    }
  });
};

categoriesController.getById = (req, res) => {
  const { id } = req.params;
  const category = categoriesModel.findById(id, (err, rows) => {
    if (err) {
      res.json({
        status: "OK",
        data: {}
      });
    } else {
      res.json({
        status: "OK",
        data: rows
      });
    }
  });
};

categoriesController.create = (req, res) => {
  const { name } = req.body;

  // Validasi input name
  if (!name || !isAlphabet(name)) {
    return res.json({
      status: "failed",
      message: "Nama hanya boleh berisi huruf dan wajib diisi"
    });
  }

  try {
    const createCategories = categoriesModel.create(req.body);
    res.json({
      status: "OK",
      message: "Data berhasil ditambahkan"
    });
  } catch (error) {
    res.json({
      status: "OK",
      message: error.message
    });
  }
};

categoriesController.update = (req, res) => {
  try {
    const updateCategories = categoriesModel.update(req.params.id, req.body, (err, rows) => {
      if (err) {
        res.json({
          status: "failed",
          message: "Gagal mengupdate data"
        });
      } else {
        res.json({
          status: "OK",
          message: "Data berhasil diupdate"
        });
      }
    });
  } catch (error) {
    res.json({
      status: "OK",
      message: error.message
    });
  }
};

categoriesController.delete = (req, res) => {
  try {
    const deleteCategories = categoriesModel.delete(req.params.id, (err, rows) => {
      if (err) {
        res.json({
          status: "failed",
          message: "Gagal menghapus data"
        });
      } else {
        res.json({
          status: "OK",
          message: "Data berhasil dihapus"
        });
      }
    });
  } catch (error) {
    res.json({
      status: "OK",
      message: error.message
    });
  }
};

module.exports = categoriesController;

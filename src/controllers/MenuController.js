const menuModel = require("../models/menuModel");

const menuController = {};

// Validasi fungsi yang memeriksa apakah nilai adalah huruf
function isAlphabet(value) {
  return /^[A-Za-z\s]+$/.test(value);
}

// Validasi fungsi yang memeriksa apakah nilai adalah angka
function isNumber(value) {
  return /^\d+$/.test(value);
}

menuController.getAll = (req, res) => {
  const menus = menuModel.getAll((err, rows) => {
    if (err) {
      return res.json({
        status: "OK",
        data: []
      });
    } else {
      return res.json({
        status: "OK",
        data: rows
      });
    }
  });
};

menuController.getById = (req, res) => {
  const { id } = req.params;
  const menu = menuModel.findById(id, (err, rows) => {
    if (err) {
      return res.json({
        status: "OK",
        data: {}
      });
    } else {
      return res.json({
        status: "OK",
        data: rows
      });
    }
  });
};

menuController.create = (req, res) => {
  const { item, price } = req.body;

  // Validasi input item dan price
  if (!item || !price) {
    return res.json({
      status: "failed",
      message: "Item dan price wajib diisi"
    });
  }

  if (!isAlphabet(item)) {
    return res.json({
      status: "failed",
      message: "Item hanya boleh berisi huruf"
    });
  }

  if (!isNumber(price)) {
    return res.json({
      status: "failed",
      message: "Price hanya boleh berisi angka"
    });
  }

  try {
    const createMenu = menuModel.create(req.body);
    return res.json({
      status: "OK",
      message: "Data berhasil ditambahkan"
    });
  } catch (error) {
    return res.json({
      status: "OK",
      message: error.message
    });
  }
};

menuController.update = (req, res) => {
  try {
    const updateMenu = menuModel.update(req.params.id, req.body, (err, rows) => {
      if (err) {
        return res.json({
          status: "failed",
          message: "Data gagal diperbarui"
        });
      } else {
        return res.json({
          status: "OK",
          message: "Data berhasil diperbarui"
        });
      }
    });
  } catch (error) {
    return res.json({
      status: "OK",
      message: error.message
    });
  }
};

menuController.delete = (req, res) => {
  try {
    const deleteMenu = menuModel.delete(req.params.id, (err, rows) => {
      if (err) {
        return res.json({
          status: "failed",
          message: "Data gagal dihapus"
        });
      } else {
        return res.json({
          status: "OK",
          message: "Data berhasil dihapus"
        });
      }
    });
  } catch (error) {
    return res.json({
      status: "OK",
      message: error.message
    });
  }
};

module.exports = menuController;

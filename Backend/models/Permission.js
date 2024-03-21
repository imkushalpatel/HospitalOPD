const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, unique: true },
    patient: {
      view: { type: Boolean, default: false },
      insert: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
    visit: {
      view: { type: Boolean, default: false },
      insert: { type: Boolean, default: false },
      update: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", permissionSchema);

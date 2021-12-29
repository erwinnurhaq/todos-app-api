const { sequelize, Types } = require("../config/database");

const Activity = sequelize.define(
  "Activity",
  {
    email: {
      type: Types.STRING,
      allowNull: false,
    },
    title: {
      type: Types.STRING,
      allowNull: false,
    },
    created_at: {
      type: Types.DATE,
      defaultValue: Types.NOW,
    },
    updated_at: {
      type: Types.DATE,
      defaultValue: Types.NOW,
    },
    deleted_at: Types.DATE,
  },
  { timestamps: false, freezeTableName: true },
);

module.exports = Activity;

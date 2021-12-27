'use strict';

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('Activity', {
    id: { type: type.INTEGER, primaryKey: true, autoIncrement: true, notNull: true },
    email: { type: type.STRING, length: 255, notNull: true },
    title: { type: type.STRING, length: 255, notNull: true },
    created_at: { type: type.DATE_TIME, defaultValue: new String('CURRENT_TIMESTAMP') },
    updated_at: { type: type.DATE_TIME, defaultValue: new String('CURRENT_TIMESTAMP') },
    deleted_at: { type: type.DATE_TIME, defaultValue: null },
  });
};

exports.down = function(db) {
  return db.dropTable('Activity', { ifExists: true });
};

exports._meta = {
  "version": 1
};

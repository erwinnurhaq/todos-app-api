module.exports = {
    "up": "DROP TABLE IF EXISTS Activity; CREATE TABLE Activity (id int NOT NULL AUTO_INCREMENT, email varchar(255) COLLATE utf8_unicode_ci NOT NULL, title varchar(255) COLLATE utf8_unicode_ci NOT NULL, created_at datetime DEFAULT CURRENT_TIMESTAMP, updated_at datetime DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci",
    "down": "DROP TABLE IF EXISTS Activity"
}
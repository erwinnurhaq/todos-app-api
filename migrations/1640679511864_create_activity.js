module.exports = {
    "up": "DROP TABLE IF EXISTS Activity; CREATE TABLE Activity (id int NOT NULL AUTO_INCREMENT, email varchar(255) COLLATE utf8_unicode_ci NOT NULL, title varchar(255) COLLATE utf8_unicode_ci NOT NULL, created_at datetime DEFAULT CURRENT_TIMESTAMP, updated_at datetime DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci; DROP TABLE IF EXISTS Todo; CREATE TABLE Todo (id int NOT NULL AUTO_INCREMENT, activity_group_id varchar(255) COLLATE utf8_unicode_ci NOT NULL, title varchar(255) COLLATE utf8_unicode_ci NOT NULL, is_active varchar(255) COLLATE utf8_unicode_ci NOT NULL, priority enum('very-low','low','normal','high','very-high') COLLATE utf8_unicode_ci DEFAULT 'very-high', created_at datetime DEFAULT CURRENT_TIMESTAMP, updated_at datetime DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;",
    "down": "DROP TABLE IF EXISTS Activity, Todo;"
}
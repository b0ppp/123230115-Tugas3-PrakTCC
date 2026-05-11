-- ============================================================
-- SQL Schema – Tugas 3
-- Jalankan di phpMyAdmin: https://phpmyadmin.cc/
-- Ganti semua "NIM" dengan NIM kamu (contoh: 123456789)
-- ============================================================

-- Buat database (jika belum ada)
CREATE DATABASE IF NOT EXISTS `notes_NIM`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `notes_NIM`;

-- Buat tabel dengan format: notes_NIM
CREATE TABLE IF NOT EXISTS `notes_NIM` (
  `id`             INT(11)      NOT NULL AUTO_INCREMENT,
  `judul`          VARCHAR(255) NOT NULL,
  `isi`            TEXT         NOT NULL,
  `tanggal_dibuat` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

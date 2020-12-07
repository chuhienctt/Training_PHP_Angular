/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : ql_ho_so

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-12-07 11:30:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for buoc
-- ----------------------------
DROP TABLE IF EXISTS `buoc`;
CREATE TABLE `buoc` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_quy_trinh` bigint(20) unsigned NOT NULL,
  `ten_buoc` varchar(255) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_quy_trinh` (`id_quy_trinh`),
  CONSTRAINT `buoc_ibfk_1` FOREIGN KEY (`id_quy_trinh`) REFERENCES `quy_trinh` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for co_quan
-- ----------------------------
DROP TABLE IF EXISTS `co_quan`;
CREATE TABLE `co_quan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ten_co_quan` varchar(255) NOT NULL,
  `dia_chi` varchar(255) DEFAULT '',
  `email` varchar(100) NOT NULL,
  `so_dien_thoai` char(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ten_co_quan` (`ten_co_quan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for co_quan_linh_vuc
-- ----------------------------
DROP TABLE IF EXISTS `co_quan_linh_vuc`;
CREATE TABLE `co_quan_linh_vuc` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_co_quan` bigint(20) unsigned NOT NULL,
  `id_linh_vuc` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_co_quan` (`id_co_quan`),
  KEY `id_linh_vuc` (`id_linh_vuc`),
  CONSTRAINT `co_quan_linh_vuc_ibfk_1` FOREIGN KEY (`id_co_quan`) REFERENCES `co_quan` (`id`),
  CONSTRAINT `co_quan_linh_vuc_ibfk_2` FOREIGN KEY (`id_linh_vuc`) REFERENCES `linh_vuc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for ho_so
-- ----------------------------
DROP TABLE IF EXISTS `ho_so`;
CREATE TABLE `ho_so` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_thu_tuc` bigint(20) unsigned NOT NULL,
  `thong_tin` longtext NOT NULL,
  `trang_thai` tinyint(4) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_thu_tuc` (`id_thu_tuc`),
  CONSTRAINT `ho_so_ibfk_1` FOREIGN KEY (`id_thu_tuc`) REFERENCES `thu_tuc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for linh_vuc
-- ----------------------------
DROP TABLE IF EXISTS `linh_vuc`;
CREATE TABLE `linh_vuc` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ten_linh_vuc` varchar(200) NOT NULL,
  `hinh_anh` varchar(255) NOT NULL,
  `mo_ta` varchar(255) DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ten_linh_vuc` (`ten_linh_vuc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for quy_trinh
-- ----------------------------
DROP TABLE IF EXISTS `quy_trinh`;
CREATE TABLE `quy_trinh` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_thu_tuc` bigint(20) unsigned NOT NULL,
  `ten_quy_trinh` varchar(255) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id_thu_tuc` (`id_thu_tuc`),
  CONSTRAINT `quy_trinh_ibfk_1` FOREIGN KEY (`id_thu_tuc`) REFERENCES `thu_tuc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for thu_tuc
-- ----------------------------
DROP TABLE IF EXISTS `thu_tuc`;
CREATE TABLE `thu_tuc` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_co_quan` bigint(20) unsigned NOT NULL,
  `id_linh_vuc` bigint(20) unsigned NOT NULL,
  `ten_thu_tuc` varchar(255) NOT NULL,
  `muc_do` tinyint(4) NOT NULL,
  `template` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ten_thu_tuc` (`ten_thu_tuc`),
  KEY `id_co_quan` (`id_co_quan`),
  KEY `id_linh_vuc` (`id_linh_vuc`),
  CONSTRAINT `thu_tuc_ibfk_1` FOREIGN KEY (`id_co_quan`) REFERENCES `co_quan` (`id`),
  CONSTRAINT `thu_tuc_ibfk_2` FOREIGN KEY (`id_linh_vuc`) REFERENCES `linh_vuc` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_co_quan` bigint(20) DEFAULT NULL,
  `tai_khoan` varchar(50) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ho_ten` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `so_dien_thoai` char(10) DEFAULT NULL,
  `dia_chi` varchar(255) DEFAULT '',
  `ngay_sinh` date NOT NULL,
  `role` tinyint(4) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tai_khoan` (`tai_khoan`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

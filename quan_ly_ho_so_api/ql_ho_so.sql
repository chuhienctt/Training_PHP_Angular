-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 10, 2020 lúc 03:08 AM
-- Phiên bản máy phục vụ: 10.4.14-MariaDB
-- Phiên bản PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ql_ho_so`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `buoc`
--

CREATE TABLE `buoc` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_quy_trinh` bigint(20) UNSIGNED NOT NULL,
  `ten_buoc` varchar(255) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `co_quan`
--

CREATE TABLE `co_quan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ten_co_quan` varchar(255) NOT NULL,
  `dia_chi` varchar(255) DEFAULT '',
  `email` varchar(100) NOT NULL,
  `so_dien_thoai` char(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `co_quan_linh_vuc`
--

CREATE TABLE `co_quan_linh_vuc` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_co_quan` bigint(20) UNSIGNED NOT NULL,
  `id_linh_vuc` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ho_so`
--

CREATE TABLE `ho_so` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_thu_tuc` bigint(20) UNSIGNED NOT NULL,
  `thong_tin` longtext NOT NULL,
  `trang_thai` tinyint(4) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `linh_vuc`
--

CREATE TABLE `linh_vuc` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ten_linh_vuc` varchar(200) NOT NULL,
  `hinh_anh` varchar(255) NOT NULL,
  `mo_ta` varchar(255) DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `linh_vuc`
--

INSERT INTO `linh_vuc` (`id`, `ten_linh_vuc`, `hinh_anh`, `mo_ta`, `created_at`, `deleted_at`) VALUES
(11, 'lĩnh vực đã sửa', '/linh-vuc-images/3d6d57318aa2f9aeed2e3e7f99e240aca27f15de.png', 'mô tả đã sửa', '2020-12-10 02:01:35', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `quy_trinh`
--

CREATE TABLE `quy_trinh` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_thu_tuc` bigint(20) UNSIGNED NOT NULL,
  `ten_quy_trinh` varchar(255) NOT NULL,
  `ghi_chu` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thu_tuc`
--

CREATE TABLE `thu_tuc` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_co_quan` bigint(20) UNSIGNED NOT NULL,
  `id_linh_vuc` bigint(20) UNSIGNED NOT NULL,
  `ten_thu_tuc` varchar(255) NOT NULL,
  `muc_do` tinyint(4) NOT NULL,
  `template` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_co_quan` bigint(20) DEFAULT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ho_ten` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `so_dien_thoai` varchar(10) DEFAULT '',
  `dia_chi` varchar(255) DEFAULT '',
  `ngay_sinh` date NOT NULL,
  `role` tinyint(4) NOT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `id_co_quan`, `mat_khau`, `ho_ten`, `email`, `so_dien_thoai`, `dia_chi`, `ngay_sinh`, `role`, `token`) VALUES
(19, NULL, '$2y$10$JYCdH8pHvihQ8urEcpIxj.o9XizbXa4Whebfe.IqlI0aFWv8cFXne', 'Nguyễn Đức Toàn', 'toannguyen@gmail.com', '386420313', 'thôn Minh Khai, xã Đại Tập, huyện Khoái Châu, tỉnh Hưng Yên', '1999-01-08', 2, 'bc50e98566e2e51704b8dfeea236615ae4f304a4'),
(21, NULL, '$2y$10$Md9AGnyz.Aha7C5d4B4wX.WzaEbPYKVv.MtZEqHM1TUxR5SspA0vC', 'Nguyễn Đức Toàn', 'toannguyen1@gmail.com', '386420310', 'thôn Minh Khai, xã Đại Tập, huyện Khoái Châu, tỉnh Hưng Yên', '1999-01-08', 1, NULL),
(29, NULL, '$2y$10$1xeIQVYcQ5xj6tJDIwMeS.WF5naLB31SOFiqRN3sX7NbyvGDyGBRe', 'Nguyễn Đức Toàn', 'toannguyen2@gmail.com', '0386420311', 'thôn Minh Khai, xã Đại Tập, huyện Khoái Châu, tỉnh Hưng Yên', '1999-01-08', 1, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `buoc`
--
ALTER TABLE `buoc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_quy_trinh` (`id_quy_trinh`);

--
-- Chỉ mục cho bảng `co_quan`
--
ALTER TABLE `co_quan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ten_co_quan` (`ten_co_quan`);

--
-- Chỉ mục cho bảng `co_quan_linh_vuc`
--
ALTER TABLE `co_quan_linh_vuc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_co_quan` (`id_co_quan`),
  ADD KEY `id_linh_vuc` (`id_linh_vuc`);

--
-- Chỉ mục cho bảng `ho_so`
--
ALTER TABLE `ho_so`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_thu_tuc` (`id_thu_tuc`);

--
-- Chỉ mục cho bảng `linh_vuc`
--
ALTER TABLE `linh_vuc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ten_linh_vuc` (`ten_linh_vuc`);

--
-- Chỉ mục cho bảng `quy_trinh`
--
ALTER TABLE `quy_trinh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_thu_tuc` (`id_thu_tuc`);

--
-- Chỉ mục cho bảng `thu_tuc`
--
ALTER TABLE `thu_tuc`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ten_thu_tuc` (`ten_thu_tuc`),
  ADD KEY `id_co_quan` (`id_co_quan`),
  ADD KEY `id_linh_vuc` (`id_linh_vuc`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_unique` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `buoc`
--
ALTER TABLE `buoc`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `co_quan`
--
ALTER TABLE `co_quan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `co_quan_linh_vuc`
--
ALTER TABLE `co_quan_linh_vuc`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `ho_so`
--
ALTER TABLE `ho_so`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `linh_vuc`
--
ALTER TABLE `linh_vuc`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `quy_trinh`
--
ALTER TABLE `quy_trinh`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `thu_tuc`
--
ALTER TABLE `thu_tuc`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `buoc`
--
ALTER TABLE `buoc`
  ADD CONSTRAINT `buoc_ibfk_1` FOREIGN KEY (`id_quy_trinh`) REFERENCES `quy_trinh` (`id`);

--
-- Các ràng buộc cho bảng `co_quan_linh_vuc`
--
ALTER TABLE `co_quan_linh_vuc`
  ADD CONSTRAINT `co_quan_linh_vuc_ibfk_1` FOREIGN KEY (`id_co_quan`) REFERENCES `co_quan` (`id`),
  ADD CONSTRAINT `co_quan_linh_vuc_ibfk_2` FOREIGN KEY (`id_linh_vuc`) REFERENCES `linh_vuc` (`id`);

--
-- Các ràng buộc cho bảng `ho_so`
--
ALTER TABLE `ho_so`
  ADD CONSTRAINT `ho_so_ibfk_1` FOREIGN KEY (`id_thu_tuc`) REFERENCES `thu_tuc` (`id`);

--
-- Các ràng buộc cho bảng `quy_trinh`
--
ALTER TABLE `quy_trinh`
  ADD CONSTRAINT `quy_trinh_ibfk_1` FOREIGN KEY (`id_thu_tuc`) REFERENCES `thu_tuc` (`id`);

--
-- Các ràng buộc cho bảng `thu_tuc`
--
ALTER TABLE `thu_tuc`
  ADD CONSTRAINT `thu_tuc_ibfk_1` FOREIGN KEY (`id_co_quan`) REFERENCES `co_quan` (`id`),
  ADD CONSTRAINT `thu_tuc_ibfk_2` FOREIGN KEY (`id_linh_vuc`) REFERENCES `linh_vuc` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

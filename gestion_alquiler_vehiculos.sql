-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-07-2026 a las 01:24:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_alquiler_vehiculos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquileres`
--

CREATE TABLE `alquileres` (
  `alquiler_id` int(11) NOT NULL,
  `vehiculo_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  `estado` enum('Activo','Finalizado','Cancelado') NOT NULL DEFAULT 'Activo'
) ;

--
-- Volcado de datos para la tabla `alquileres`
--

INSERT INTO `alquileres` (`alquiler_id`, `vehiculo_id`, `cliente_id`, `fecha_inicio`, `fecha_fin`, `precio_total`, `estado`) VALUES
(1, 1, 1, '2026-07-01', '2026-07-05', 180.00, 'Activo'),
(2, 3, 2, '2026-07-02', '2026-07-06', 160.00, 'Activo'),
(3, 7, 3, '2026-07-03', '2026-07-08', 250.00, 'Activo'),
(4, 10, 4, '2026-07-04', '2026-07-09', 220.00, 'Activo'),
(5, 15, 5, '2026-07-05', '2026-07-10', 190.00, 'Activo'),
(6, 21, 6, '2026-07-06', '2026-07-12', 360.00, 'Activo'),
(7, 25, 7, '2026-07-07', '2026-07-11', 210.00, 'Activo'),
(8, 2, 8, '2026-06-01', '2026-06-04', 120.00, 'Finalizado'),
(9, 4, 9, '2026-06-03', '2026-06-07', 150.00, 'Finalizado'),
(10, 5, 10, '2026-06-05', '2026-06-08', 100.00, 'Finalizado'),
(11, 6, 11, '2026-06-07', '2026-06-12', 200.00, 'Finalizado'),
(12, 8, 12, '2026-06-10', '2026-06-15', 230.00, 'Finalizado'),
(13, 9, 13, '2026-06-12', '2026-06-16', 260.00, 'Finalizado'),
(14, 11, 14, '2026-06-14', '2026-06-18', 130.00, 'Finalizado'),
(15, 12, 15, '2026-06-16', '2026-06-20', 280.00, 'Finalizado'),
(16, 13, 16, '2026-06-18', '2026-06-22', 140.00, 'Finalizado'),
(17, 14, 17, '2026-06-20', '2026-06-25', 240.00, 'Finalizado'),
(18, 16, 18, '2026-06-22', '2026-06-27', 300.00, 'Finalizado'),
(19, 17, 19, '2026-06-24', '2026-06-28', 170.00, 'Finalizado'),
(20, 18, 20, '2026-06-26', '2026-06-30', 260.00, 'Finalizado'),
(21, 19, 21, '2026-05-01', '2026-05-05', 220.00, 'Cancelado'),
(22, 20, 22, '2026-05-03', '2026-05-07', 320.00, 'Cancelado'),
(23, 22, 23, '2026-05-05', '2026-05-09', 290.00, 'Cancelado'),
(24, 23, 24, '2026-05-07', '2026-05-11', 240.00, 'Cancelado'),
(25, 24, 25, '2026-05-09', '2026-05-13', 210.00, 'Cancelado'),
(26, 26, 26, '2026-05-11', '2026-05-15', 180.00, 'Finalizado'),
(27, 27, 27, '2026-05-13', '2026-05-17', 160.00, 'Finalizado'),
(28, 28, 28, '2026-05-15', '2026-05-19', 310.00, 'Finalizado'),
(29, 29, 29, '2026-05-17', '2026-05-21', 420.00, 'Finalizado'),
(30, 30, 30, '2026-05-19', '2026-05-23', 450.00, 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cliente_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `licencia` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`cliente_id`, `nombre`, `apellido`, `licencia`, `telefono`) VALUES
(1, 'Carlos', 'Mendoza', 'LIC-001', '0987654321'),
(2, 'Ana', 'Torres', 'LIC-002', '0991234567'),
(3, 'Luis', 'Ramirez', 'LIC-003', '0974567890'),
(4, 'María', 'Gómez', 'LIC-004', '0963217894'),
(5, 'Juan', 'Paredes', 'LIC-005', '0981112233'),
(6, 'Sofía', 'Vargas', 'LIC-006', '0995556677'),
(7, 'Diego', 'Castro', 'LIC-007', '0972223344'),
(8, 'Fernanda', 'López', 'LIC-008', '0967778899'),
(9, 'Mateo', 'Salazar', 'LIC-009', '0983334455'),
(10, 'Camila', 'Reyes', 'LIC-010', '0998887766'),
(11, 'Andrés', 'Mora', 'LIC-011', '0971119988'),
(12, 'Valeria', 'Cruz', 'LIC-012', '0965554433'),
(13, 'Jorge', 'Ortega', 'LIC-013', '0982221199'),
(14, 'Paula', 'Navarro', 'LIC-014', '0996665544'),
(15, 'Sebastián', 'Herrera', 'LIC-015', '0978886655'),
(16, 'Daniela', 'Flores', 'LIC-016', '0969998877'),
(17, 'Gabriel', 'Ríos', 'LIC-017', '0984443322'),
(18, 'Nicole', 'Cevallos', 'LIC-018', '0997776655'),
(19, 'Emilio', 'Guerrero', 'LIC-019', '0973332211'),
(20, 'Carolina', 'Acosta', 'LIC-020', '0962223344'),
(21, 'Ricardo', 'Vera', 'LIC-021', '0985557788'),
(22, 'Isabella', 'Morales', 'LIC-022', '0991114455'),
(23, 'Kevin', 'Bravo', 'LIC-023', '0976668899'),
(24, 'Adriana', 'Peña', 'LIC-024', '0964445577'),
(25, 'Martín', 'Zambrano', 'LIC-025', '0989991122'),
(26, 'Lucía', 'Mejía', 'LIC-026', '0993338877'),
(27, 'Cristian', 'Aguilar', 'LIC-027', '0974442211'),
(28, 'Melanie', 'Cárdenas', 'LIC-028', '0961112233'),
(29, 'Ángel', 'Santana', 'LIC-029', '0987774433'),
(30, 'Romina', 'Ponce', 'LIC-030', '0992226677');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `vehiculo_id` int(11) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `anio` int(11) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`vehiculo_id`, `marca`, `modelo`, `anio`, `disponible`) VALUES
(1, 'Toyota', 'Corolla', 2025, 0),
(2, 'Toyota', 'Yaris', 2021, 0),
(3, 'Kia', 'Rio', 2020, 0),
(4, 'Hyundai', 'Accent', 2022, 1),
(5, 'Chevrolet', 'Aveo', 2019, 1),
(6, 'Chevrolet', 'Sails', 2021, 1),
(7, 'Nissan', 'Versa', 2023, 0),
(8, 'Nissan', 'Sentra', 2020, 1),
(9, 'Mazda', 'CX-3', 2022, 1),
(10, 'Mazda', '3', 2021, 0),
(11, 'Ford', 'Fiesta', 2018, 1),
(12, 'Ford', 'Escape', 2022, 1),
(13, 'Volkswagen', 'Gol', 2019, 1),
(14, 'Volkswagen', 'Jetta', 2021, 1),
(15, 'Renault', 'Logan', 2020, 0),
(16, 'Renault', 'Duster', 2023, 1),
(17, 'Suzuki', 'Swift', 2022, 1),
(18, 'Suzuki', 'Vitara', 2021, 1),
(19, 'Honda', 'Civic', 2020, 1),
(20, 'Honda', 'CR-V', 2022, 1),
(21, 'Mitsubishi', 'L200', 2023, 0),
(22, 'Mitsubishi', 'Outlander', 2021, 1),
(23, 'Great Wall', 'Wingle', 2020, 1),
(24, 'Chery', 'Tiggo 2', 2022, 1),
(25, 'JAC', 'S3', 2021, 0),
(26, 'Peugeot', '208', 2022, 1),
(27, 'Fiat', 'Argo', 2020, 1),
(28, 'Jeep', 'Renegade', 2021, 1),
(29, 'BMW', 'X1', 2022, 1),
(30, 'Mercedes-Benz', 'A200', 2023, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD PRIMARY KEY (`alquiler_id`),
  ADD KEY `fk_alquiler_vehiculo` (`vehiculo_id`),
  ADD KEY `fk_alquiler_cliente` (`cliente_id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cliente_id`),
  ADD UNIQUE KEY `licencia` (`licencia`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`vehiculo_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquileres`
--
ALTER TABLE `alquileres`
  MODIFY `alquiler_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cliente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `vehiculo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquileres`
--
ALTER TABLE `alquileres`
  ADD CONSTRAINT `fk_alquiler_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`),
  ADD CONSTRAINT `fk_alquiler_vehiculo` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculos` (`vehiculo_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

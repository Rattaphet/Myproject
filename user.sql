SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE TABLE `users` (
  `id` int(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `age` int(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `education_level` enum('ประถมศึกษา','มัธยมศึกษา(ต้น)','มัธยมศึกษา(ปลาย)','อาชีวศึกษา','อุดมศึกษา') NOT NULL,
  `subject` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `activities` varchar(255) NOT NULL,
  `firstnamet` varchar(255) NOT NULL,
  `lastnamet` varchar(255) NOT NULL,
  `taught` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
INSERT INTO `users` (`firstname`, `lastname`, `age`, `address`, `education_level`, `subject`, `grade`, `activities`, `firstnamet`, `lastnamet`, `taught`, `time`) VALUES
('John', 'Doe', 25, '1234 Main St', 'ประถมศึกษา', 'Math', 'A', 'Football', 'Jane', 'Doe', 'Math', '3:00pm'),
('Jane', 'Doe', 25, '1234 Main St', 'ประถมศึกษา', 'Math', 'A', 'Football', 'John', 'Doe', 'Math', '3:00pm');
COMMIT;

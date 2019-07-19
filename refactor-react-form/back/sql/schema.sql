CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(90) NOT NULL,
  `password` varchar(64) NOT NULL,
  `firstname` varchar(90) DEFAULT NULL,
  `lastname` varchar(90) DEFAULT NULL,
  `address` varchar(90) DEFAULT NULL,
  `postcode` varchar(90) DEFAULT NULL,
  `city` varchar(90) DEFAULT NULL,
  `phone` varchar(90) DEFAULT NULL,
  `avatar` varchar(90) DEFAULT NULL,
  `subscribeNewsletter` BOOLEAN DEFAULT NULL
);

-- CREATE TABLE `product` (
--   `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   `name` varchar(90) DEFAULT NULL,
--   `description` text DEFAULT NULL,
--   `price` INTEGER DEFAULT NULL,
-- );

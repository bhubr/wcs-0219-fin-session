CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(90) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `name` varchar(90) DEFAULT NULL
);

CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `authorId` int(11),
  `title` varchar(90) DEFAULT NULL,
  `content` text(90) DEFAULT NULL
);

ALTER TABLE `article` ADD CONSTRAINT fkArticleUser1 FOREIGN KEY (authorId) REFERENCES user(id);

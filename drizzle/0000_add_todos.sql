CREATE TABLE `todos` (
	`id` varchar(36) NOT NULL,
	`text` varchar(255) NOT NULL,
	`date` datetime NOT NULL,
	`createdAt` datetime NOT NULL,
	`completedAt` datetime,
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);

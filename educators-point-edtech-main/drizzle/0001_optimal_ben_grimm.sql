CREATE TABLE `analyticsEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(50) NOT NULL,
	`eventName` varchar(255) NOT NULL,
	`userId` varchar(255),
	`sessionId` varchar(255) NOT NULL,
	`pageUrl` text,
	`referrer` text,
	`metadata` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analyticsEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `calendarEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventType` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`location` varchar(255),
	`instructorId` int,
	`maxCapacity` int,
	`currentEnrollment` int NOT NULL DEFAULT 0,
	`status` enum('scheduled','ongoing','completed','cancelled') NOT NULL DEFAULT 'scheduled',
	`metadata` text,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `calendarEvents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cmsContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contentType` varchar(50) NOT NULL,
	`contentKey` varchar(255) NOT NULL,
	`title` text,
	`description` text,
	`content` text,
	`imageUrl` text,
	`metadata` text,
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cmsContent_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crmLeads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100),
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`source` varchar(100) NOT NULL,
	`status` enum('new','contacted','interested','qualified','enrolled','rejected') NOT NULL DEFAULT 'new',
	`leadScore` int NOT NULL DEFAULT 0,
	`notes` text,
	`metadata` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `crmLeads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leadInteractions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`leadId` int NOT NULL,
	`interactionType` varchar(50) NOT NULL,
	`subject` varchar(255),
	`message` text,
	`status` varchar(50) NOT NULL,
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leadInteractions_id` PRIMARY KEY(`id`)
);

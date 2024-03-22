DROP TABLE IF EXISTS CrashUser;
CREATE TABLE CrashUser (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	username VARCHAR(50) NOT NULL,
	PRIMARY KEY(id)
);

INSERT INTO CrashUser
VALUES (gen_random_uuid(), 'ianb'), 
(gen_random_uuid(), 'piotr'),
(gen_random_uuid(), 'mariog'),
(gen_random_uuid(), 'mounikal'),
(gen_random_uuid(), 'vijit'),
(gen_random_uuid(), 'darrelb');

DROP TABLE IF EXISTS Accident;
CREATE TABLE Accident (
	id UUID NOT NULL DEFAULT gen_random_uuid(),
	location VARCHAR(50) NULL,
	accident_date timestamp NULL,
	daylight VARCHAR(15) NULL,
	weather_conditions VARCHAR(25) NULL,
	PRIMARY KEY(id)
);


INSERT INTO Accident
VALUES (gen_random_uuid(), 
	'Edmonton AB',
	Now(),
	'Day',
	'Sunny');


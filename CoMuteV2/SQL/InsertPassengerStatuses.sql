USE CoMuteV2
GO

IF EXISTS(SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'PassengerStatus')
BEGIN
	INSERT INTO PassengerStatus VALUES('Pending'), ('Accepted'), ('Declined'), ('Cancelled')
END
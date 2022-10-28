USE  CoMuteV2
GO

CREATE PROCEDURE RegisterToCarPoolTicket(@CarPoolTicketID INT, @PassengerID INT, @PassengerNote VARCHAR(800))
AS
IF NOT EXISTS(SELECT 1 FROM CarPoolTicket WHERE OwnerID = @PassengerID AND CarPoolTicketID = @CarPoolTicketID)
BEGIN
	DECLARE @StartTime DATETIME = (SELECT DepartureTime FROM CarPoolTicket WHERE CarPoolTicketID = @CarPoolTicketID);
	DECLARE @EndTime DATETIME = (SELECT ExpectedArrivalTime FROM CarPoolTicket WHERE CarPoolTicketID = @CarPoolTicketID);
	DECLARE @AvailableToRegister INT;

	EXEC @AvailableToRegister = CheckCarPoolTicketAvailability @StartTime, @EndTime, @PassengerID;

	IF(@AvailableToRegister = 1)
	BEGIN
		INSERT INTO CarPoolTicketAllocation(CarPoolTicketID, PassengerID, PassengerNote, PassengerRegisterDate, PassengerStatusID) 
		VALUES(@CarPoolTicketID, @PassengerID, @PassengerNote, GETDATE(), 1);
		SELECT SCOPE_IDENTITY() AS CarPoolTicketAllocationId;
	END
	ELSE IF(@AvailableToRegister = 0)
	BEGIN
		SELECT @AvailableToRegister AS CarPoolTicketAllocationId;
	END
END
USE CoMuteV2
GO

CREATE PROCEDURE AcceptPassenger(@PassengerID INT, @CarPoolTicketID INT)
AS
	IF EXISTS(SELECT 1 FROM CarPoolTicketAllocation WHERE CarPoolTicketID = @CarPoolTicketID AND PassengerID = @PassengerID AND PassengerStatusID < 4)
	BEGIN
		DECLARE @CarPoolTicketSeats INT = (SELECT AvailableSeats FROM CarPoolTicket WHERE CarPoolTicketID = @CarPoolTicketID);
		DECLARE @CarPoolTicketDays INT = (SELECT DATEDIFF(DAY, GETDATE(), DepartureTime) FROM CarPoolTicket WHERE CarPoolTicketID = @CarPoolTicketID);
		IF(@CarPoolTicketDays >= 0 AND @CarPoolTicketSeats > 0)
		BEGIN
			UPDATE CarPoolTicket SET AvailableSeats = AvailableSeats - 1 WHERE CarPoolTicketID = @CarPoolTicketID;
			UPDATE CarPoolTicketAllocation SET PassengerStatusID = 2 WHERE PassengerID = @PassengerID AND CarPoolTicketID = @CarPoolTicketID;

			SELECT @CarPoolTicketID AS CarPoolTicketID
		END
	END
GO
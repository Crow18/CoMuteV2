USE CoMuteV2
GO

CREATE PROCEDURE DeclinePassenger(@PassengerID INT, @CarPoolTicketID INT)
AS
	IF EXISTS(SELECT 1 FROM CarPoolTicketAllocation WHERE CarPoolTicketID = @CarPoolTicketID AND PassengerID = @PassengerID AND PassengerStatusID < 3)
	BEGIN
		IF EXISTS(SELECT 1 FROM CarPoolTicketAllocation WHERE PassengerID = @PassengerID AND CarPoolTicketID = @CarPoolTicketID AND PassengerStatusID = 2)
		BEGIN
			Update CarPoolTicket SET AvailableSeats = AvailableSeats + 1 WHERE CarPoolTicketID = @CarPoolTicketID
		END
		UPDATE CarPoolTicketAllocation SET PassengerStatusID = 3 WHERE PassengerID= @PassengerID AND CarPoolTicketID = @CarPoolTicketID;

		SELECT @CarPoolTicketID AS CarPoolTicketID
	END
GO
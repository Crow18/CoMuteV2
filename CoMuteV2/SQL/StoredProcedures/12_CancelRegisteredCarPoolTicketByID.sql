USE CoMuteV2
GO

CREATE PROCEDURE CancelRegisteredCarPoolTicketByID(@CarPoolTicketID INT, @PassengerID INT)
AS
IF EXISTS(SELECT 1 FROM CarPoolTicketAllocation WHERE CarPoolTicketID = @CarPoolTicketID AND PassengerID = @PassengerID AND PassengerStatusID < 3)
BEGIN
	DECLARE @AcceptedPassenger INT = (SELECT PassengerStatusID FROM CarPoolTicketAllocation WHERE CarPoolTicketID = @CarPoolTicketID AND PassengerID = @PassengerID);

	UPDATE CarPoolTicketAllocation SET PassengerStatusID = 4 WHERE PassengerID = @PassengerID AND CarPoolTicketID =@CarPoolTicketID;

	IF(@AcceptedPassenger = 2)
	BEGIN
		UPDATE CarPoolTicket SET AvailableSeats = AvailableSeats + 1 WHERE CarPoolTicketID = @CarPoolTicketID;
	END
	SELECT @CarPoolTicketID AS CancelledCarPoolTicketID
END
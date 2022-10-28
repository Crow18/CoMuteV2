USE CoMuteV2
GO

CREATE PROCEDURE CancelCreatedCarPoolTicketByID(@CarPoolTicketId INT)
AS
	UPDATE CarPoolTicketAllocation SET PassengerStatusID = 3 WHERE CarPoolTicketID = @CarPoolTicketId AND PassengerStatusID <> 4;

	IF EXISTS(SELECT 1 FROM CarPoolTicket WHERE CarPoolTicketID = @CarPoolTicketId AND CarPoolTicketStatusID <> 3)
	BEGIN
		UPDATE CarPoolTicket SET AvailableSeats = 0, CarPoolTicketStatusID = 3 WHERE CarPoolTicketID = @CarPoolTicketId;
		SELECT cpt.*, cpts.Status FROM  CarPoolTicket cpt LEFT JOIN CarPoolTicketStatus cpts ON cpt.CarPoolTicketStatusID = cpts.CarPoolTicketStatusID WHERE CarPoolTicketID = @CarPoolTicketId;
	END
GO
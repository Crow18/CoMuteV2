USE CoMuteV2
GO

CREATE PROCEDURE GetCreatedCarPoolTickets(@UserID INT)
AS
SELECT cpt.CarPoolTicketID, cpt.CreatedDate, cpt.OwnerID, cpts.Status,
       cpt.Origin, cpt.Destination, cpt.DepartureTime,
	   cpt.ExpectedArrivalTime, cpt.AvailableSeats,
	   DATEDIFF(DAY, GETDATE(), cpt.DepartureTime) AS DaysAvailable, cpt.Note 
	   FROM CarPoolTicket cpt
	   LEFT JOIN CarPoolTicketStatus cpts ON cpt.CarPoolTicketStatusID = cpts.CarPoolTicketStatusID 
	   WHERE cpt.OwnerID = @UserID
GO
USE CoMuteV2
GO

CREATE PROCEDURE FindCarPoolTickets(@Search VARCHAR(500))
AS
	SELECT cpt.*, DATEDIFF(DAY, GETDATE(), cpt.DepartureTime) AS DaysAvailable, cpts.Status, u.Name as OwnerName, u.Surname as OwnerSurname FROM CarPoolTicket cpt
	LEFT JOIN CarPoolTicketStatus cpts ON cpt.CarPoolTicketStatusID = cpts.CarPoolTicketStatusID
	LEFT JOIN Users u ON cpt.OwnerID = u.UserID
	WHERE cpt.Destination LIKE '%'+@Search+'%' AND cpt.CarPoolTicketStatusID = 1 AND DATEDIFF(DAY, GETDATE(), cpt.DepartureTime) >= 0 AND cpt.AvailableSeats > 0
	ORDER BY cpt.Destination
GO
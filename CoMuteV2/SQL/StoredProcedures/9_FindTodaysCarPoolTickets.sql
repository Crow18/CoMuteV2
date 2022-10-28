USE CoMuteV2
GO

CREATE PROCEDURE FindTodaysCarPoolTickets
AS
	SELECT cpt.*, DATEDIFF(DAY, GETDATE(), cpt.DepartureTime) AS DaysAvailable, cpts.Status, u.Name AS OwnerName, u.Surname AS OwnerSurname FROM CarPoolTicket cpt
	LEFT JOIN CarPoolTicketStatus cpts ON cpt.CarPoolTicketStatusID = cpts.CarPoolTicketStatusID
	LEFT JOIN Users u ON cpt.OwnerID = u.UserID
	WHERE cpt.CarPoolTicketStatusID = 1 AND DATEDIFF(DAY, GETDATE(), cpt.DepartureTime) = 0 AND cpt.AvailableSeats > 0
	ORDER BY cpt.Destination
GO
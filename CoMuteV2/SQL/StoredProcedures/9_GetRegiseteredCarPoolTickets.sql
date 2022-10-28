USE CoMuteV2
Go

CREATE PROCEDURE GetRegisteredCarPoolTickets(@PassengerID INT)
AS
SELECT cpta.CarPoolTicketAllocationID, cpt.CarPoolTicketID, cpta.PassengerRegisterDate, cpt.Note as CreatorNote,
cpt.DepartureTime, cpt.ExpectedArrivalTime, cpt.Origin, cpt.Destination, cpt.AvailableSeats, 
u.Name, u.Surname, DATEDIFF(DAY, GETDATE(), cpt.DepartureTime) as DaysAvailable, ps.PassengerStatus
FROM CarPoolTicketAllocation cpta  
LEFT JOIN CarPoolTicket cpt ON cpta.CarPoolTicketID = cpt.CarPoolTicketID
LEFT JOIN PassengerStatus ps ON cpta.PassengerStatusID = ps.PassengerStatusID
LEFT JOIN Users u ON cpt.OwnerID = u.UserID
WHERE cpta.PassengerID = @PassengerID
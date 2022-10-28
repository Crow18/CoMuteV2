USE CoMuteV2
GO

CREATE PROCEDURE GetPassengersByCarPoolTicketID(@CarPoolTicketID INT)
AS
SELECT cpta.CarPoolTicketAllocationID, u.UserID as PassengerID ,u.Name as PassengerName, u.Surname as PassengerSurname, cpta.PassengerNote,
ps.PassengerStatus, cpta.PassengerRegisterDate FROM CarPoolTicketAllocation cpta 
LEFT JOIN Users u ON cpta.PassengerID = u.UserID
LEFT JOIN PassengerStatus ps ON cpta.PassengerStatusID = ps.PassengerStatusID
WHERE cpta.CarPoolTicketId = @CarPoolTicketID
GO
USE CoMuteV2
GO

CREATE PROCEDURE UpdateCreatedCarPoolTicketByID(
	@CarPoolTicketID INT,
	@From VARCHAR(500),
	@To VARCHAR(500),
	@DepartureTime DATETIME,
	@ExpectedArrivalTime DATETIME,
	@AvailableSeats INT,
	@Note VARCHAR(800)
)
AS


IF(DATEDIFF(MINUTE, @DepartureTime, GETDATE()) >= 0)
BEGIN
	SET @CarPoolTicketStatusID = 2;
END

UPDATE CarPoolTicket SET Origin = @From, Destination = @To, DepartureTime = @DepartureTime,
	   ExpectedArrivalTime = @ExpectedArrivalTime, AvailableSeats = @AvailableSeats, Note = @Note, 
	   CarPoolTicketStatusID = 1
	   WHERE CarPoolTicketID = @CarPoolTicketID

SELECT cpt.* , cpts.Status FROM CarPoolTicket cpt LEFT JOIN CarPoolTicketStatus cpts ON cpt.CarPoolTicketStatusID = cpts.CarPoolTicketStatusID WHERE CarPoolTicketID = @CarPoolTicketID
GO
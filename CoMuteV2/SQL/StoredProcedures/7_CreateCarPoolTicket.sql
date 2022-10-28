USE CoMuteV2
GO

CREATE PROCEDURE CreateCarPoolTicket(
	@OwnerId INT, 
	@Origin VARCHAR(500), 
	@Destination VARCHAR(500),
	@DepartureTime DATETIME,
	@ExpectedArrivalTime DATETIME,
	@AvailableSeats INT,
	@Note VARCHAR(800)
)
AS
	
DECLARE  @AllowCreatePermission INT;
EXEC @AllowCreatePermission = CheckCarPoolTicketAvailability @DepartureTime, @ExpectedArrivalTime, @OwnerId

IF(@AllowCreatePermission > 0)
BEGIN
	INSERT INTO CarPoolTicket(OwnerID, Origin, Destination, CreatedDate, DepartureTime, ExpectedArrivalTime, AvailableSeats, Note, CarPoolTicketStatusID) 
	VALUES(@OwnerId, @Origin, @Destination, GETDATE(), @DepartureTime,@ExpectedArrivalTime, @AvailableSeats, @Note, 1);
	
	SELECT cpt.CarPoolTicketID, cpt.OwnerID, cpt.Origin, cpt.Destination, cpt.DepartureTime, cpt.ExpectedArrivalTime, cpt.AvailableSeats,  DATEDIFF(DAY, GETDATE(), @DepartureTime) as DaysAvailable, 
		   cpt.CreatedDate, cpt.Note, cpts.Status FROM CarPoolTicket cpt Left JOIN CarPoolTicketStatus cpts ON cpt.CarPoolTicketStatusID = cpts.CarPoolTicketStatusID
		   WHERE cpt.carPoolTicketId = SCOPE_IDENTITY();
END
GO
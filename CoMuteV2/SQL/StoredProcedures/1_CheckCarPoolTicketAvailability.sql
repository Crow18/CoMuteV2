USE CoMuteV2
GO

CREATE PROCEDURE CheckCarPoolTicketAvailability(@StartTime DATETIME, @EndTime DATETIME, @UserId int)      
AS      
      
	 SELECT * INTO #temp from      
	 (      
		SELECT DISTINCT cpt.CarPoolTicketID, cpt.DepartureTime, cpt.ExpectedArrivalTime FROM CarPoolTicket cpt INNER JOIN CarPoolTicketAllocation cpta ON cpt.CarPoolTicketID = cpt.CarPoolTicketID 
		WHERE cpt.OwnerID = @UserId OR cpta.PassengerID = @UserId AND cpt.CarPoolTicketStatusID = 1 AND cpta.PassengerStatusID < 3
	 ) as tt      
      
	 IF EXISTS(SELECT 1 FROM #temp t WHERE @StartTime >= t.DepartureTime AND @StartTime <= t.ExpectedArrivalTime OR @EndTime >= t.DepartureTime AND @EndTime <= t.ExpectedArrivalTime)      
		 BEGIN      
			RETURN 0;
		 END      
	 ELSE    
	  RETURN 1;   
      
 DROP TABLE #temp
GO


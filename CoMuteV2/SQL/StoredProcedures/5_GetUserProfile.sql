USE CoMuteV2
GO

CREATE PROCEDURE GetUserProfile(@UserID INT)
AS
SELECT UserID, Name, Surname, Phone, Email FROM Users WHERE UserID = @UserID
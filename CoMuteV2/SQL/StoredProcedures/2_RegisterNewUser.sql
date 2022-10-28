USE CoMuteV2
GO

CREATE PROCEDURE RegisterNewUser(
	@Name VARCHAR(50), 
	@Surname VARCHAR(50), 
	@Email VARCHAR(50),
	@Phone VARCHAR(10),
	@Password VARBINARY(MAX),
	@Salt VARBINARY(MAX)
)
AS
	DECLARE @UserID INT;

	INSERT INTO Users(Name, Surname, Email, Phone, Password) VALUES(@Name, @Surname, @Email, @Phone, @Password);
	SELECT @UserID = SCOPE_IDENTITY();

	SET IDENTITY_INSERT Owner ON
	INSERT INTO Owner(OwnerID, Salt) VALUES(@UserID, @Salt);
	SET IDENTITY_INSERT Owner OFF

	SELECT UserID, Name, Surname, Email, Phone FROM Users WHERE UserID = @UserID
GO
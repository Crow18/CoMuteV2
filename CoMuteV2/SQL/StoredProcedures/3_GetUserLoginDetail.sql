USE CoMuteV2
Go

CREATE PROCEDURE GetUserLoginDetail(@Email VARCHAR(50))
AS
	SELECT u.Password as PasswordHash, u.UserID, o.Salt as PasswordSalt, u.Email FROM Users u JOIN Owner o ON u.UserID = o.OwnerID WHERE u.Email = @Email
GO
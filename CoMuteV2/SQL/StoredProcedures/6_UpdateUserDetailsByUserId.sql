USE CoMuteV2
GO

CREATE PROCEDURE UpdateUserDetailsByUserId(
	@Id INT,
	@Name VARCHAR(50),
	@Surname VARCHAR(50),
	@Phone VARCHAR(10),
	@Email VARCHAR(50),
	@Password VARBINARY(MAX),
	@PasswordSalt VARBINARY(MAX)
)
AS
UPDATE Users SET Name = @Name, Surname = @Surname, Phone = @Phone, Email = @Email, Password = @Password WHERE UserID = @Id;
UPDATE Owner SET Salt = @PasswordSalt WHERE OwnerID = @Id;
SELECT UserId, Name, Surname, Phone, Email FROM Users WHERE UserID = @Id
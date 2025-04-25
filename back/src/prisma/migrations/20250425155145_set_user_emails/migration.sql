UPDATE "User"
SET email = CONCAT(
    nick,
    '@example.com'
)
WHERE 
    email is null;
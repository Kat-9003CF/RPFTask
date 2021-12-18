
-- (Re)create the table

DROP TABLE IF EXISTS usertable;
CREATE TABLE usertable (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwordHash BINARY(64) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some test data

-- INSERT INTO usertable (username, email, passwordHash)
-- VALUES
--     ('user1', 'user@email.com', 'HASHBYTES('SHA2_256', 'testPass123'));
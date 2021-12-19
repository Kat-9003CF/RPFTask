
-- (Re)create the table

DROP TABLE IF EXISTS usertable;
CREATE TABLE usertable (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwordHash VARBINARY(32) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

-- Insert some test data

INSERT INTO usertable (username, email, passwordHash)
VALUES
    ('user1', 'one@email.com', 'MD5(testpass123)'),
    ('user2', 'two@email.com', 'MD5(password1234)'),
    ('user3', 'three@email.com', 'MD5(supersecurepassword)');
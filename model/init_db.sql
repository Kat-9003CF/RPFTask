
-- (Re)create the table

DROP TABLE IF EXISTS ducks;
CREATE TABLE ducks (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    prizeMoney INT NOT NULL
);

-- Insert some test data

-- INSERT INTO ducks (name, prizeMoney)
-- VALUES
--     ('Bono', 2000),
--     ('Bjork', 6500);
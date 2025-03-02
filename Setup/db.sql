CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    nric VARCHAR(9) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    date_of_birth DATE,
    address TEXT,
    gender VARCHAR(6) CHECK (gender IN ("Male", "Female", "Other"))
);

INSERT INTO users (username, password_hash, nric, first_name, last_name, date_of_birth, address, gender)
VALUES ('john', '$2b$10$nkYisVFMxjq16eOf7M.rOOR7mteTNKR6Ayq/H7/fJg3q722iFw6xe', 'TXXXX875A', 'John', 'Doe', '2000-01-01', 'Bishan Avenue 2 Block 300 #05-05', 'Male');

INSERT INTO users (username, password_hash, nric, first_name, last_name, date_of_birth, address, gender)
VALUES ('mary', '$2b$10$nkYisVFMxjq16eOf7M.rOOR7mteTNKR6Ayq/H7/fJg3q722iFw6xe', 'TXXXX455Z', 'Mary', 'Jane', '2001-05-31', 'Clementi Road #12-34', 'Female');

INSERT INTO users (username, password_hash, nric, first_name, last_name, date_of_birth, address, gender)
VALUES ('peter', '$2b$10$nkYisVFMxjq16eOf7M.rOOR7mteTNKR6Ayq/H7/fJg3q722iFw6xe', 'SXXXX834C', 'Peter', 'Parker', '1996-04-02', 'Punggol Avenue 1 #03-09', 'Male');
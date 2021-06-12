------------------------------------------------
Users Table:
------------------------------------------------
CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(255) NOT NULL, 
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BIT NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);
------------------------------------------------
Vactions Table:
------------------------------------------------
CREATE TABLE vacations(
    id INT NOT NULL AUTO_INCREMENT, 
    destination VARCHAR(55) NOT NULL, 
    description VARCHAR(255) NOT NULL, 
    starts_at DATE NOT NULL,
    ends_at DATE NOT NULL,
    image VARCHAR(255),
    price DECIMAL(6,2),
    PRIMARY KEY (id)
);
------------------------------------------------
Followers Table:
------------------------------------------------
CREATE TABLE followers(
    id INT NOT NULL AUTO_INCREMENT,
    vacation_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (vacation_id) REFERENCES vacations(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
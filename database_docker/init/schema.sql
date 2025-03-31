CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    birth_day DATE, 
    PR_arm INT,
    PR_bench_press INT,
    PR_leg_press INT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    description TEXT,
    gender VARCHAR(12)
);

-- Photos table
CREATE TABLE Photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    photo_path VARCHAR(60) NOT NULL UNIQUE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- User_Roles table (Many-to-Many)
CREATE TABLE User_Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    UNIQUE (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE
);

-- Gyms table
CREATE TABLE Gyms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255)
);

-- Gym_users table (Many-to-Many)
CREATE TABLE Gym_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gym_id INT NOT NULL,
    user_id INT NOT NULL,
    UNIQUE (gym_id, user_id),
    FOREIGN KEY (gym_id) REFERENCES Gyms(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Contacts table
CREATE TABLE Contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    phone_number VARCHAR(20),
    link_insta VARCHAR(100),
    link_facebook VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Request table
CREATE TABLE Request (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender INT NOT NULL,
    reciver INT NOT NULL,
    status INT DEFAULT 0,
    FOREIGN KEY (sender) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (reciver) REFERENCES Users(id) ON DELETE CASCADE
);
--Create postgres certify_doc_db database and connect to it, check if it exists first
DO $$
BEGIN
  IF NOT EXISTS(
    SELECT
      1
    FROM
      pg_database
    WHERE
      datname = 'certify_doc_db') THEN
  CREATE DATABASE certify_doc_db;
END IF;
END
$$;

-- Create the tables
DROP TABLE IF EXISTS Roles CASCADE;

CREATE TABLE Roles(
  role_id serial PRIMARY KEY,
  name varchar(50) NOT NULL
);

DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users(
  user_id serial PRIMARY KEY,
  role_id int NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  phone DECIMAL(13) UNIQUE NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  username varchar(10) CHECK (LENGTH(username) >= 5 AND LENGTH(username) <= 10) UNIQUE NOT NULL,
  password varchar(16) NOT NULL,
  registration_date timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Create Statuses table
DROP TABLE IF EXISTS Statuses CASCADE;

CREATE TABLE Statuses(
  status_id serial PRIMARY KEY,
  name varchar(50) NOT NULL
);

DROP TABLE IF EXISTS Documents CASCADE;

CREATE TABLE Documents(
  document_id serial PRIMARY KEY,
  user_id int NOT NULL,
  status_id int NOT NULL,
  name varchar(100) NOT NULL,
  description varchar(255) NOT NULL,
  copy_file bytea NOT NULL,
  original_file bytea NOT NULL,
  certified_file bytea NULL,
  upload_date timestamp DEFAULT CURRENT_TIMESTAMP,
  end_date timestamp NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (status_id) REFERENCES Statuses(status_id)
);

-- Create stats table for the admin user
DROP TABLE IF EXISTS AdminStats CASCADE;

CREATE TABLE Stats(
  stats_id serial PRIMARY KEY,
  total_users int NOT NULL,
  total_certifiers int NOT NULL,
  total_documents int NOT NULL,
  pending_documents int NOT NULL,
  approved_documents int NOT NULL,
  rejected_documents int NOT NULL
);

-- Create states for the certifier user
DROP TABLE IF EXISTS CertifierStats CASCADE;

CREATE TABLE CertifierStats(
  certifier_stats_id serial PRIMARY KEY,
  certifier_id int NOT NULL,
  total_jobs int NOT NULL,
  average_time int NOT NULL,
  FOREIGN KEY (certifier_id) REFERENCES Users(user_id)
);

INSERT INTO Roles(name)
  VALUES ('Admin');

INSERT INTO Roles(name)
  VALUES ('Certifier');

INSERT INTO Roles(name)
  VALUES ('User');

-- Insert Statuses
INSERT INTO Statuses(name)
  VALUES ('Pending');

INSERT INTO Statuses(name)
  VALUES ('Approved');

INSERT INTO Statuses(name)
  VALUES ('Rejected');

INSERT INTO Statuses(name)
  VALUES ('Expired');

-- Insert Admin user
INSERT INTO Users(role_id, first_name, last_name, phone, email, username, PASSWORD)
  VALUES (1, 'Super', 'Admin', 0123456789, 'admin@mail.com', 'SuperAdmin', 'admin123');

-- Insert 3 Certifier user
INSERT INTO Users(role_id, first_name, last_name, phone, email, username, PASSWORD)
  VALUES (2, 'John', 'Wick', 0147258369, 'johnw@mail.com', 'JohnWick', 'john123');

INSERT INTO Users(role_id, first_name, last_name, phone, email, username, PASSWORD)
  VALUES (2, 'Jane', 'Doe', 0123987456, 'janed@mail.com', 'JaneDoe', 'jane123');

INSERT INTO Users(role_id, first_name, last_name, phone, email, username, PASSWORD)
  VALUES (2, 'Jack', 'Sparrow', 0123654789, 'jacks@mail.com', 'JSparrow', 'jack123');


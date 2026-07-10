CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    telegram VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
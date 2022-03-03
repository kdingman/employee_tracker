-- Seeds/DATA for a Radio Station employee tracker system

INSERT INTO department (name)
VALUES
("Management"),
("Programming"),
("Engineering"),
("Sales"),
("Promotions");



INSERT INTO role (title, salary, department_id)
VALUES
-- Management Roles
("Business Manager", 63000, 1),
("Sales Director", 130000, 1),
("Promotions Director", 42000, 1),
("Program Director", 15000, 1),
("Chief Engineer", 125000, 1),
-- Programming Roles
("On-Air Talent", 75000, 2),
("Production Manager", 61000, 2),
-- Engineering Roles
("Staff Engineer", 55000, 3),
-- Sales Roles
("Account Executive", 75000, 4),
("Local Sales Rep", 45000, 4),
("National Sales Rep", 55000, 4),
("Sales Intern", 0, 4),
-- Promotional Staff
("Promotions Coordinator", 45000, 5),
("Field Coordinator", 20000, 5),
("Promotions Intern", 0, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Eleanor", "Shellstrop", 6, 2),
("Chidi", "Anagonye", 1, NULL),
("Tahani", "AlJamil", 9, 4),
("Jason", "Mendoza", 8, 2),
("Janet", "DellaDenunzio", 2, NULL),
("Veronica", "Mars", 13, 3),
("Logan", "Echolls", 10, 5),
("Wallace", "Fennel", 12, 1),
("Lilly", "Kane", 7, 5),
("Gia", "Goodman", 11, 4),
("Eli", "Navarro", 14, 3),
("Meg", "Manning", 3, NULL),
("Jackie", "Cook", 15, 1),
("Dick", "Casablancas", 4, NULL),
("Michael", "Danson", 14, 5),
("Jessica", "Day", 5, NULL);
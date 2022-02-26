-- Seeds/DATA for a Radio Station employee tracker system

INSERT INTO departments (name)
VALUES
("management"),
("programming"),
("engineering"),
("sales"),
("promotions");



INSERT INTO roles (title, salary, department_id)
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
("Intern", 0, 4),
-- Promotional Staff
("Promotions Coordinator", 45000, 5),
("Field Coordinator", 20000, 5),
("Promotions Intern", 0, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Eleanor", "Shellstrop", 2, 1),
("Chidi", "Anagonye", 1, NULL),
("Tahani", "AlJamil", 4, 1),
("Jason", "Mendoza", 2, 1),
("Janet", "DellaDenunzio", 1, NULL),
("Veronica", "Mars", 3, 1),
("Logan", "Echolls", 5, 1),
("Wallace", "Fennel", 2, 1),
("Lilly", "Kane", 5, 5),
("Gia", "Goodman", 4, 4),
("Eli", "Navarro", 3, 1),
("Meg", "Manning", 1, NULL),
("Jackie", "Cook", 2, 1),
("Dick", "Casablancas", 1, NULL),
("Michael", "Danson", 5, 1),
("Jessica", "Day", 1, NULL);
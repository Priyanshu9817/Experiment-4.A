// ===============================
// Employee Management System CLI
// ===============================

const fs = require('fs');
const readline = require('readline');

const FILE = 'employees.json';

// ===============================
// Load Data (Persistence)
// ===============================

let employees = [];

if (fs.existsSync(FILE)) {
    try {
        const data = fs.readFileSync(FILE);
        employees = JSON.parse(data);
    } catch (error) {
        console.log("Error reading file. Starting with empty data. ");
        employees = [];
    }
}

// ===============================
// Readline Interface
// ===============================

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ===============================
// Save Data Function
// ===============================

function saveData() {
    fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

// ===============================
// Main Menu
// ===============================

function menu() {
    console.log("\n===== Employee Management System ===== ");
    console.log("1. Add Employee ");
    console.log("2. View Employees ");
    console.log("3. Update Employee ");
    console.log("4. Delete Employee ");
    console.log("5. Search Employee ");
    console.log("6. Exit ");

    rl.question("Choose an option: ", (choice) => {
        switch (choice) {
            case '1': addEmployee(); break;
            case '2': viewEmployees(); break;
            case '3': updateEmployee(); break;
            case '4': deleteEmployee(); break;
            case '5': searchEmployee(); break;
            case '6': exitProgram(); break;
            default:
                console.log("Invalid choice! Please try again. ");
                menu();
        }
    });
}

// ===============================
// Add Employee
// ===============================

function addEmployee() {
    rl.question("Enter Employee ID: ", (id) => {

        if (!id.trim()) {
            console.log("ID cannot be empty! ");
            return menu();
        }

        if (employees.find(emp => emp.id === id)) {
            console.log("Employee ID already exists! ");
            return menu();
        }

        rl.question("Enter Employee Name: ", (name) => {

            if (!name.trim()) {
                console.log("Name cannot be empty! ");
                return menu();
            }

            rl.question("Enter Salary: ", (salary) => {

                if (isNaN(salary) || salary <= 0) {
                    console.log("Salary must be a positive number! ");
                    return menu();
                }

                const newEmployee = {
                    id: id.trim(),
                    name: name.trim(),
                    salary: Number(salary)
                };

                employees.push(newEmployee);
                saveData();

                console.log("Employee Added Successfully! ");
                menu();
            });
        });
    });
}

// ===============================
// View Employees
// ===============================

function viewEmployees() {
    if (employees.length === 0) {
        console.log("No employees found. ");
    } else {
        console.table(employees);
    }
    menu();
}

// ===============================
// Update Employee
// ===============================

function updateEmployee() {
    rl.question("Enter Employee ID to update: ", (id) => {

        const employee = employees.find(emp => emp.id === id);

        if (!employee) {
            console.log("Employee not found! ");
            return menu();
        }

        rl.question("Enter New Name: ", (name) => {

            if (!name.trim()) {
                console.log("Name cannot be empty! ");
                return menu();
            }

            rl.question("Enter New Salary: ", (salary) => {

                if (isNaN(salary) || salary <= 0) {
                    console.log("Salary must be a positive number! ");
                    return menu();
                }

                employee.name = name.trim();
                employee.salary = Number(salary);

                saveData();
                console.log("Employee Updated Successfully! ");
                menu();
            });
        });
    });
}

// ===============================
// Delete Employee
// ===============================

function deleteEmployee() {
    rl.question("Enter Employee ID to delete: ", (id) => {

        const index = employees.findIndex(emp => emp.id === id);

        if (index === -1) {
            console.log("Employee not found! ");
            return menu();
        }

        employees.splice(index, 1);
        saveData();

        console.log("Employee Deleted Successfully! ");
        menu();
    });
}

// ===============================
// Search Employee
// ===============================

function searchEmployee() {
    rl.question("Enter Employee ID to search: ", (id) => {

        const employee = employees.find(emp => emp.id === id);

        if (!employee) {
            console.log("Employee not found! ");
        } else {
            console.table([employee]);
        }

        menu();
    });
}

// ===============================
// Exit Program
// ===============================

function exitProgram() {
    console.log("Exiting program... ");
    rl.close();
}

// ===============================
// Start Program
// ===============================

menu();

<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$servername = "localhost";
$username = "txxgaono_NeohNkosi";
$password = "1999@Nk0si2975";
$dbname = "txxgaono_hgzservicesDB";

// Create a connection to the MySQL database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $first_name = $conn->real_escape_string($_POST['first-name']);
    $last_name = $conn->real_escape_string($_POST['last-name']);
    $company_name = $conn->real_escape_string($_POST['company-name']);
    $email = $conn->real_escape_string($_POST['email']);
    $contact_number = $conn->real_escape_string($_POST['contact-number']);
    $brand = $conn->real_escape_string($_POST['brand']);
    $message = $conn->real_escape_string($_POST['message']);

    // Insert data into the database
    $stmt = $conn->prepare("INSERT INTO contact_form (first_name, last_name, company_name, email, contact_number, brand, message) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $first_name, $last_name, $company_name, $email, $contact_number, $brand, $message);
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close the connection
$conn->close();
?>
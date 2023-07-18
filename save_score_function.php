<?php
session_start();
$username = $_SESSION['username'];

header('Content-type: application/json; charset=UTF-8');
$scoreData = json_decode(file_get_contents("php://input"));
$_SESSION['scoreData'] = json_encode($scoreData);
echo json_encode($scoreData);
?>
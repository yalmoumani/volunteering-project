<?php
include '../connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['eventId'])) {
        $eventId = filter_var($_GET['eventId'], FILTER_VALIDATE_INT);

        $eventSql = "SELECT * FROM `events` WHERE E_id = $eventId;";
        $eventResult = $con->query($eventSql);

        if ($eventResult) {
            if ($eventResult->num_rows > 0) {
                $eventData = $eventResult->fetch_assoc();
                
                $limit = $eventData['E_limit'];

                $registeredSql = "SELECT COUNT(*) as registered FROM `event_user` WHERE Event_Id = $eventId;";
                $registeredResult = $con->query($registeredSql);

                if ($registeredResult) {
                    $registeredData = $registeredResult->fetch_assoc();
                    $registeredCount = $registeredData['registered'];

                    $eventData['Registered'] = $registeredCount;
                } else {
                    // Error executing the registered participants query
                    $eventData['Registered'] = 'Error retrieving registered participants.';
                }

                echo json_encode($eventData);
            } else {
                echo 'No event found for the given ID.';
            }
        } else {
            echo 'Error executing the database query.';
        }
    } else {
        echo 'Event ID not provided.';
    }
} else {
    echo 'This endpoint only accepts GET requests.';
}
?>
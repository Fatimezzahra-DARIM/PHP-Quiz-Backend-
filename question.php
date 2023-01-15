<?php
include_once 'DbConnection.php';


# =========== get questions ========== #
$query = "SELECT * FROM `questions`";
$stmt = $connect->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$data = array();
foreach ($result as $row) {
    $data[] = $row;
}

# =========== get choices ========== #
$query = "SELECT * FROM `choices`";
$stmt = $connect->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$choices = array();
foreach ($result as $row) {
    $choices[] = $row;
}

# =========== insert choices into questions ========== #
for ($i = 0; $i < sizeof($choices); $i++) {
    for ($j = 0; $j < sizeof($data); $j++) {
        if ($choices[$i]['question_number'] == $data[$j]['question_number']) {
            $data[$j]['question_number'][] = $choices[$i]['question_number'];
        }
    }
}

echo json_encode($data);

    //     $conn = DbConnection::connect();
    //     $sql      = " SELECT * FROM questions ";
    //     $result      = $conn->query($sql);
    //    $sql      = " SELECT * FROM questions ";
    //     $result      = $conn->query($sql);
    //     while($question=$result->fetchAll(PDO::FETCH_ASSOC)){
    //         $questions[]=$question;
    //     }
    //     $encoded_data=json_encode($questions,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    //     file_put_contents('data.json', $encoded_data);


    
// $servername = "localhost";
// $username = "root";
// $password = "";
// $db = "quizzer";
// $mysqli = new mysqli($servername, $username, $password, $db);
// if ($mysqli->connect_error) {
//     printf("connect failed", $mysqli->connect_error);
//     exit();
// }
// $sql      = " SELECT * FROM questions ";
// $result      = $mysqli->query($sql);
// while($question=$result->fetch_assoc()){
//     $questions[]=$question;
// }
// $encoded_data=json_encode($questions,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
// file_put_contents('data.json', $encoded_data);


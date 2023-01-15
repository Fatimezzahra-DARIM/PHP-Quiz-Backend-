<?php


class DbConnection 
{
    
    public function connect()
    {
        $servername="localhost";
        $username="root";
        $password="";
        // $conn=null;
        try{
            // echo "ddddd";
            $conn = new PDO('mysql:host=' . $servername . ';dbname=quizizy', $username, $password);
             // set the PDO error mode to exception
            //  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //setAttribute() method sets a new value to an attribute.
            return $conn;
           
            
        }  
        catch(PDOException $e) {
            echo $e->getMessage();
            die('db error'); 
            
    }
}
}
$connection = new DbConnection();
$connect = $connection->connect();


class showData extends DbConnection
{
     public function AllData(){
        $req = $this->connect()->prepare("SELECT choices.choix1, choices.choix2, choices.choix3, choices.choix4, question.question, question.numb, question.answer FROM question INNER JOIN choices on question.id = choices.id");
        $req->execute();
        return $req->fetchAll();

     }  

}

$data = new showData();
$all_data = $data->AllData();
echo json_encode($all_data);


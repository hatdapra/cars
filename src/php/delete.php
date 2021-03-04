<?PHP
include 'connect.php';

$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0) ? $_GET['id'] : false;

if(!$id){
  return http_response_code(400);
}

$sqlStr = "DELETE FROM `cars` WHERE `id` ='{$id}' LIMIT 1";

if($conn->query($sqlStr)){
  http_response_code(204);
}else{
  http_response_code(422);
}


$conn = null;

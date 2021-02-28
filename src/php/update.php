<?PHP
require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  $request = json_decode($postdata);

  if ((int)$request->data->id < 1 || trim($request->data->model) == '' || (int)$request->data->price < 1) {
    return http_response_code(400);
  }

  $model = $request->data->model;
  $price = $request->data->price;
  $id = $request->data->id;

  $sqlStr = "UPDATE `cars` SET `model`='{$model}',`price`='{$price}' WHERE `id` = '{$id}' LIMIT 1";

  if($conn->query($sqlStr)){
    http_response_code(204);
  }else{
    http_response_code(422);
  }
}

$conn = null;

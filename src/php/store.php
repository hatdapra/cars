<?PHP
require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  $request = json_decode($postdata);

  if(trim($request->data->model) === '' || (int)$request->data->price < 1){
    return http_response_code(400);
  }

  $model = $request->data->model;
  $price = $request->data->price;

  $sqlStr = "INSERT INTO `cars`(`id`,`model`,`price`) VALUES (null, '{$model}', '{$price}')";

  if($conn->query($sqlStr)){
    http_response_code(201);
    $car = [
      'model' => $model,
      'price' => $price,
      'id' => $conn->lastInsertId()
    ];

    echo json_encode(['data' => $car]);
  }else{
    http_response_code(422);
  }
}

$conn = null;

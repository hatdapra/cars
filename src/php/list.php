<?PHP
require 'connect.php';

$sqlStr = "SELECT * FROM world.cars";

$res = $conn->query($sqlStr);
$lista = $res->fetchAll(PDO::FETCH_ASSOC);

$r['data'] = $lista;

// echo json_encode($r);
echo json_encode($lista);

$conn = null;

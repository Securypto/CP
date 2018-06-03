<?php

$list = array();

for($i = 2; $i <=25 ; $i++){

$f = file_get_contents("https://estimatefee.com/n/".$i);
$list["n".$i] = $f;

}

echo $list;

$fp = fopen('estimatesmartfee.json', 'w');
fwrite($fp, json_encode($list));
fclose($fp);

?>
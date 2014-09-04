<?php

header('Content-type: application/xml');
echo file_get_contents("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT*%20FROM%201uPQIxXfKAdTZuhBMu-jSkdyJs45o7VC2TGqm17Eg&key=AIzaSyD0ojLPNCk0yzMoMqSJ94hivxVQI64yAAw");
// echo file_get_contents("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT*%20FROM%201kWGRT8isIwfwo0xZyh_g48D71Dgn_cKS51FC1rLu&key=AIzaSyC_NLU85fZGzJJVSX2vt5JZcMHbxhfNXH0");
?>
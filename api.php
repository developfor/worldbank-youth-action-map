<?php

header('Content-type: application/xml');
echo file_get_contents("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT*%20FROM%201uPQIxXfKAdTZuhBMu-jSkdyJs45o7VC2TGqm17Eg&key=AIzaSyD0ojLPNCk0yzMoMqSJ94hivxVQI64yAAw");

?>
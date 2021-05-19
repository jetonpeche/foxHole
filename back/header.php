<?php
//accepter les demandes provenant de cette adresse
header( "Access-Control-Allow-Origin: *"); 

//methodes authorisées
header( "Access-Control-Allow-Methods: PUT, GET, POST, DELETE"); 
header( "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
?>
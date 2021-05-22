<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Depot.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Depot();

    $diag->SupprimerDepot( strip_tags($json->id));
?>
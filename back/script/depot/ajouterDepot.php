<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Depot.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json, true);

    $diag = new Depot();

    foreach ($json as $element) 
    {
        $diag->AjouterDepot(strip_tags($element["nom"]), strip_tags($element["code"]));
    }

    echo json_encode($diag->ListerDepot());
?>
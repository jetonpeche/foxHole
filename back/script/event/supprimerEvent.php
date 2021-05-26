<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Event.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Event();

    $id = strip_tags($json->idEvent);
    
    $diag->SupprimerEvent($id);
?>
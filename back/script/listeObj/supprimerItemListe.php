<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/ListeObj.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new ListeObj();
    $diag->SupprimerItemListe(strip_tags($json->idItem), strip_tags($json->idListe));
?>
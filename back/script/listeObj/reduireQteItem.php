<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/ListeObj.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $idListeItem = strip_tags($json->idListItem);
    $idItem = strip_tags($json->idItem);
    $qte = strip_tags($json->qte);

    $diag = new ListeObj();

    $diag->ReduireQteItem($qte, $idItem, $idListeItem);
?>
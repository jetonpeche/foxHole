<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/ListeObj.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new ListeObj();

    $liste = $json->listeIdListe;

    foreach ($liste as $element) 
    {
        $diag->SupprimerAllItemListe(strip_tags($element));
        $diag->SupprimerListe(strip_tags($element));
    }
?>
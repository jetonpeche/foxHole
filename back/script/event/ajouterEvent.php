<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Event.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $diag = new Event();

    $nom = strip_tags($json->nom);
    $description = strip_tags($json->description);
    $dateTime = strip_tags($json->dateTime);
    
    $diag->AjouterEvent($nom, $description, $dateTime, $json->listeItem);
?>
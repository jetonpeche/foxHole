<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Item.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json, true);

    $diag = new Item();

    foreach ($json as $elment) 
    {
        $diag->AjouterItem(strip_tags($elment["idTypeItem"]), strip_tags($elment["nomItem"]), strip_tags($elment["idFaction"]), $elment["recette"]);
    }

?>
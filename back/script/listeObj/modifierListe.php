<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/ListeObj.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $idListe = strip_tags($json->idListe);
    $nomListe = strip_tags($json->nomListe);
    $liste = $json->listeItem;

    $diag = new ListeObj();

    $diag->ModifierNomListe($nomListe, $idListe);
    $diag->SupprimerAllItemListe($idListe);

    foreach ($liste as $element) 
    {
        $diag->AjouterListeObj(strip_tags($element->idItem), $idListe, strip_tags($element->qte));
    }
?>
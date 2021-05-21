<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/ListeObj.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $nomListe = strip_tags($json->nomListe);
    $qte = strip_tags($json->qte);

    $listeItem = $json->listeItem;

    $diag = new ListeObj();

    if($nomListe != null)
    {
        $id = $diag->AjouterListe($nomListe);

        if(count($listeItem) > 0)
        {
            foreach ($listeItem as $element)
            {
                $diag->AjouterListeObj(strip_tags($element->idItem), $id, $qte);
            }
        }
    }
?>
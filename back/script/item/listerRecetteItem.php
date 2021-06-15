<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Item.php';

    $diag = new Item();

    $listeReturn = array();

    $listeItem = $diag->ListerItem();

    foreach ($listeItem as $element) 
    {
        $listeRecette = $diag->ListerRecette($element["idItem"]);

        array_push($listeReturn, array(
            "nomItem" => $element["nomItem"],
            "idType" => $element["idType"],
            "recette" => $listeRecette
        ));
    }

    echo json_encode($listeReturn);
?>
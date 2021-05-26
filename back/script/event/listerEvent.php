<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Event.php';

    $diag = new Event();

    $listeReturn = array();

    $listeEvent = $diag->ListerEvent();

    foreach ($listeEvent as $element) 
    {
        $listeItemEvent = array();
        $liste = $diag->ListerItemEvent($element["idEvent"]);

        foreach ($liste as $element1) 
        {
            array_push($listeItemEvent, array(
                "idItem" => $element1["idItem"],
                "nomItem" => $element1["nomItem"],
                "qte" => $element1["qte"]
            ));
        }

        array_push($listeReturn, array(
            "idEvent" => $element["idEvent"],
            "nomEvent" => $element["nomEvent"],
            "descriptionEvent" => $element["descriptionEvent"],
            "dateHeureEvent" => $element["dateHeureEvent"],
            "listeItem" => $listeItemEvent
        ));

        $listeItemEvent = array();
    }

    echo json_encode($listeReturn);
?>
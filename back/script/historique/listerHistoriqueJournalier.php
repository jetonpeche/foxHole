<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Historique.php';

    $listeReturn = array();

    $diag = new Historique();

    $listeIdPseudo = $diag->ListerIdPseudoHistoriqueJournalier();

    foreach ($listeIdPseudo as $element) 
    {
        $listeItemPseudo = array();

        $liste = $diag->ListerHistoriqueJournalier($element["idPseudo"]);

        foreach ($listeItemPseudo as $element1) 
        {
            array_push($listeItemPseudo, array(
                "nomItem" => $element1["nomItem"],
                "qte" => $element1["qte"]
            ));
        }

        array_push($listeReturn, array(
            "nomPseudo" => $element["nomPseudo"],
            "historique" => $liste
        ));
    }

    echo json_encode($listeReturn);
?>
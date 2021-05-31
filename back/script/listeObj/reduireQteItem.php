<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/ListeObj.php';
    require_once '../../dialogueBD/Historique.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $idListeItem = strip_tags($json->idListItem);
    $idItem = strip_tags($json->idItem);
    $qte = strip_tags($json->qte);
    $idPseudo = strip_tags($json->idPseudo);

    $diag = new ListeObj();

    $diag->ReduireQteItem($qte, $idItem, $idListeItem);

    $dateJour = date("Y-m-d");

    if($idPseudo != null && $idItem != null)
    {
        $diag = new Historique();

        // historique journalier
        if($diag->ExisteDansHistoriqueJournalier($idPseudo, $idItem, $dateJour))
        {
            $diag->ModifierHistoriqueJounalier($idPseudo, $idItem, $qte);
        }
        else
        {
            $diag->AjouterHistoriqueJournalier($idPseudo, $idItem, $qte, $dateJour);
        }

        // historique général
        if($diag->ExisteDansHistoriqueGeneral($idPseudo, $idItem))
        {
            $diag->ModifierHistoriqueGeneral($idPseudo, $idItem, $qte);
        }
        else
        {
            $diag->AjouterHistoriqueGeneral($idPseudo, $idItem, $qte);
        }
        }


?>
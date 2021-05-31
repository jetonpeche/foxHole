<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Historique
{
    public function ListerIdPseudoHistoriqueJournalier()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT DISTINCT pif.idPseudo, nomPseudo FROM pseudoItemFabriquer pif JOIN pseudo p ON p.idPseudo = pif.idPseudo ORDER BY nomPseudo";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function ListerHistoriqueJournalier($idPseudo)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT nomItem, qte FROM pseudoItemFabriquer p JOIN item i ON p.idItem = i.idItem WHERE idPseudo = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idPseudo));
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function ListerIdPseudoHistoriqueGlobal()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT DISTINCT h.idPseudo, nomPseudo FROM historiqueFabrique h JOIN pseudo p ON p.idPseudo = h.idPseudo ORDER BY nomPseudo";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function ListerHistoriqueGlobal($idPseudo)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT nomItem, qte FROM historiqueFabrique h JOIN item i ON h.idItem = i.idItem WHERE idPseudo = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idPseudo));
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function AjouterHistoriqueJournalier($idPseudo, $idItem, $qte, $dateJour)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO pseudoItemFabriquer (idPseudo, idItem, qte, dateFabrique) VALUES (?, ?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idPseudo, $idItem, $qte, $dateJour));
    }

    public function AjouterHistoriqueGeneral($idPseudo, $idItem, $qte)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO historiqueFabrique (idPseudo, idItem, qte) VALUES (?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idPseudo, $idItem, $qte));
    }

    public function ModifierHistoriqueJounalier($idPseudo, $idItem, $qte)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "UPDATE pseudoItemFabriquer SET qte = qte + ? WHERE idPseudo = ? AND idItem = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($qte, $idPseudo, $idItem));
    }

    public function ModifierHistoriqueGeneral($idPseudo, $idItem, $qte)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "UPDATE historiqueFabrique SET qte = qte + ? WHERE idPseudo = ? AND idItem = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($qte, $idPseudo, $idItem));
    }

    public function ExisteDansHistoriqueJournalier($idPseudo, $idItem, $dateJour)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT  COUNT(*) AS nombre FROM pseudoItemFabriquer WHERE idPseudo = ? AND idItem = ? AND dateFabrique = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idPseudo, $idItem, $dateJour));
        $resultat = $sth->fetchObject();
            
        return $resultat->nombre == 1 ? true : false;
    }

    public function ExisteDansHistoriqueGeneral($idPseudo, $idItem)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT COUNT(*) AS nombre FROM historiqueFabrique WHERE idPseudo = ? AND idItem = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idPseudo, $idItem));
        $resultat = $sth->fetchObject();
            
        return $resultat->nombre == 1 ? true : false;
    }

    public function SupprimerHistoriqueJournalier($dateJour)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM pseudoItemFabriquer WHERE dateFabrique < ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($dateJour));
    }

    public function SupprimerHistoriqueGlobal()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM historiqueFabrique";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
    }
}
?>
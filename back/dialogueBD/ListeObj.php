<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class ListeObj
{
    public function ListerListe()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM listFactory ORDER BY nomListFactory";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();

        return $liste;
    }

    public function ListerObjListe($idListe)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT i.nomItem, i.idItem, qte FROM itemListFactory il JOIN item i ON il.idItem = i.idItem WHERE idListFactory = ? ORDER BY i.nomItem";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idListe));
        $liste = $sth->fetchAll();

        return $liste;
    }

    public function AjouterListe($nomItem)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO listFactory (nomListFactory) VALUES (?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nomItem));

        $sql2 = "SELECT MAX(idListFactory) AS id FROM listFactory";
        $sth = $conn->prepare($sql2);
        $sth->execute(array());
        $resultat = $sth->fetchObject();

        return $resultat->id;
    }

    public function AjouterListeObj($idItem, $idList, $qte)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO itemListFactory (idItem, idListFactory, qte) VALUES (?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idItem, $idList, $qte));
    }

    public function ReduireQteItem($qte, $idItem, $idListeFactory)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "UPDATE itemListFactory SET qte = qte - ? WHERE idItem = ? AND idListFactory = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($qte, $idItem, $idListeFactory));

        $sql = "SELECT qte FROM itemListFactory WHERE idItem = ? AND idListFactory = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idItem, $idListeFactory));
        $resultat = $sth->fetchObject();

        if($resultat->qte <= 0)
            $this->SupprimerItemListe($idItem, $idListeFactory);
    }

    public function ModifierNomListe($nom, $id)
    { 
        $conn = ConnexionBDD::getConnexion();

        $sql = "UPDATE listFactory SET nomListFactory = ? WHERE idListFactory = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom, $id));
    }

    public function SupprimerItemListe($idItem, $idListeFactory)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM itemListFactory  WHERE idItem = ? AND idListFactory = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idItem, $idListeFactory));
    }

    public function SupprimerAllItemListe($id)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM itemListFactory WHERE idListFactory = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }

    public function SupprimerListe($idListe)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM listFactory WHERE idListFactory = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idListe));
    }
}
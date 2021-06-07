<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Item
{
    public function ListerItem()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT i.*, nomFaction, nomType FROM item i JOIN faction f ON i.idFaction = f.idFaction JOIN typeItem ti ON i.idType = ti.idType ORDER BY i.nomItem";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function ListerTypeItem()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM typeItem";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function ListerRessource()
    {
        $idtype = 8;

        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT idItem, nomItem FROM item WHERE idType = ? ORDER BY nomItem";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idtype));
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function AjouterItem($type, $nom, $faction, $recette)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO item (idType, nomItem, idFaction) VALUES (?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($type, $nom, $faction));

        $sql = "SELECT MAX(idItem) AS id FROM item";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $resultat = $sth->fetchObject();

        foreach ($recette as $element)
        {
            $sql = "INSERT INTO recette (idItem, idItemRessource, qteItem) VALUES (?, ?, ?)";
            $sth = $conn->prepare($sql);
            $sth->execute(array($resultat->id, $element["idItem"], $element["qteItem"]));
        }
    }
}
?>
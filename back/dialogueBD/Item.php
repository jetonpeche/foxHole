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

    public function AjouterItem($type, $nom, $faction)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO item (idType, nomItem, idFaction) VALUES (?, ?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($type, $nom, $faction));
    }
}
?>
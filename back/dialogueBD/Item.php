<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Item
{
    public function AjouterItem($type, $nom, $faction)
    {
        $conn = ConnexionBDD::getConnexion();

        switch ($type) 
        {
            case '1':
                $sql = "INSERT INTO arme (nomArme, idFaction) VALUES (?, ?)";
                $sth = $conn->prepare($sql);
                $sth->execute(array($nom, $faction));
            break;
            
            case '2':
                $sql = "INSERT INTO equipement (nomEquipement) VALUES (?)";
                $sth = $conn->prepare($sql);
                $sth->execute(array($nom));
            break;

            case '3':
                $sql = "INSERT INTO explosif (nomExplosif, idFaction) VALUES (?, ?)";
                $sth = $conn->prepare($sql);
                $sth->execute(array($nom, $faction));
            break;

            case '4':
                $sql = "INSERT INTO medic (nomMedic) VALUES (?)";
                $sth = $conn->prepare($sql);
                $sth->execute(array($nom));
            break;

            case '5':
                $sql = "INSERT INTO munition (nomMunition) VALUES (?)";
                $sth = $conn->prepare($sql);
                $sth->execute(array($nom));
            break;

            case '6':
                $sql = "INSERT INTO ressource (nomRessource) VALUES (?)";
                $sth = $conn->prepare($sql);
                $sth->execute(array($nom));
            break;

            case '7':
                $sql = "INSERT INTO vehicule (nomVehicule, idFaction) VALUES (?, ?)";
                $sth = $conn->prepare($sql);
                $sth->execute(array($nom, $faction));
            break;
        }
    }
}
?>
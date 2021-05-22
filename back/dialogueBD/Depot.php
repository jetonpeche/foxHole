<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Depot
{
    public function ListerDepot()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM depot";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function AjouterDepot($nom, $code)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO depot (nomDepot, codeDepot) VALUES (?, ?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($nom, $code));
    }
    
    public function SupprimerDepot($id)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM depot WHERE idDepot = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }

    public function SupprimerAllDepot()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM depot";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
    }


}

?>
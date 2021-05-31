<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Pseudo
{
    public function ListerPseudo()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM pseudo ORDER BY nomPseudo";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();

        return $liste;
    }

    public function AjouterPseudo($pseudo)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "INSERT INTO pseudo (nomPseudo) VALUES (?)";
        $sth = $conn->prepare($sql);
        $sth->execute(array($pseudo));
    }
}
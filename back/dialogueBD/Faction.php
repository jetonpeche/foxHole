<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Faction
{
    public function ListerFaction()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM faction";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();
            
        return $liste;
    }
}

?>
<?php

require_once '../../header.php';
require_once '../../connexionBDD.php';

class Event
{
    public function ListerEvent()
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT * FROM evenement";
        $sth = $conn->prepare($sql);
        $sth->execute(array());
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function ListerItemEvent($idEvent)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "SELECT qte, i.idItem, nomItem FROM listeItemEvent l JOIN item i ON l.idItem = i.idItem WHERE idEvent = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($idEvent));
        $liste = $sth->fetchAll();
            
        return $liste;
    }

    public function AjouterEvent($nom, $description, $dateTime, $listeItem)
    {
        $conn = ConnexionBDD::getConnexion();

        if($nom != null)
        {
            $sql = "INSERT INTO evenement (nomEvent, descriptionEvent, dateHeureEvent) VALUES (?, ?, ?)";
            $sth = $conn->prepare($sql);
            $sth->execute(array($nom, $description, $dateTime));
        
            $sql = "SELECT MAX(idEvent) AS id FROM evenement";
            $sth = $conn->prepare($sql);
            $sth->execute(array());
            $resultat = $sth->fetchObject();

            // creation de la liste a faire
            foreach ($listeItem as $element) 
            {
                $sql = "INSERT INTO listeItemEvent (idEvent, idItem, qte) VALUES (?, ?, ?)";
                $sth = $conn->prepare($sql);
                $sth->execute(array($resultat->id, strip_tags($element->idItem), strip_tags($element->qte)));
            }
        }
    }

    public function SupprimerEvent($id)
    {
        $conn = ConnexionBDD::getConnexion();

        $sql = "DELETE FROM listeItemEvent WHERE idEvent = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));

        $sql = "DELETE FROM evenement WHERE idEvent = ?";
        $sth = $conn->prepare($sql);
        $sth->execute(array($id));
    }
}

?>
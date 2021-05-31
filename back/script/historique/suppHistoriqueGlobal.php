<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Historique.php';

    $diag = new Historique();

    $diag->SupprimerHistoriqueGlobal();
?>
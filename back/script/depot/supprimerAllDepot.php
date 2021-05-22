<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Depot.php';

    $diag = new Depot();

    $diag->SupprimerAllDepot();
?>
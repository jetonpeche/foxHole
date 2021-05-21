<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Faction.php';

    $diag = new Faction();

    echo json_encode($diag->ListerFaction());
?>
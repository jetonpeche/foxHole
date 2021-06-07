<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Item.php';

    $diag = new Item();

    echo json_encode($diag->ListerRessource());
?>
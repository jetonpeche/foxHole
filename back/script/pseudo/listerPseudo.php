<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Pseudo.php';

    $diag = new Pseudo();

    echo json_encode($diag->ListerPseudo());
?>
<?php
    require_once '../../header.php';
    require_once '../../dialogueBD/Pseudo.php';

    $json = file_get_contents('php://input'); // RÃ©cupÃ©ration du flux JSON
    $json = json_decode($json);

    $pseudo = strip_tags($json->pseudo);

    if($pseudo != null)
    {
        $diag = new Pseudo();

        $diag->AjouterPseudo(strip_tags($json->pseudo));
    }
?>
<?php
  $SECRET = trim(file_get_contents("../secret.txt"));
  echo md5($SECRET.$_GET["payload"]); 
?> 

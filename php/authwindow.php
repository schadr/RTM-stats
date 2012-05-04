<?php
// from http://stackoverflow.com/questions/834303/php-startswith-and-endswith-functions
function startsWith($haystack, $needle) {
    $length = strlen($needle);
    return (substr($haystack, 0, $length) === $needle);
}

$auth_url = urldecode($_GET["url"]);
echo "<HTML><HEAD></HEAD><BODY>";
if (!startsWith($auth_url, "http://")) {
  $auth_url = "http://".$auth_url;
}
echo '<iframe width="100%" height="90%" src="'.$auth_url.'"></iframe>';
echo '<form>
<input type="button" value="Close Window" onClick="window.close()">
</form>';
echo "</BODY></HTML>";
?>

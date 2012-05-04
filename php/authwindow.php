<?php
$auth_url = $_GET["url"];
echo "<HTML><HEAD></HEAD><BODY>";
echo '<iframe width="100%" height="90%" src="http://'.urldecode($auth_url).'"></iframe>';
echo '<form>
<input type="button" value="Close Window" onClick="window.close()">
</form>';
echo "</BODY></HTML>";
?>

<?php

	if ($theSettings->iVersion >= 0x805) {
		$theSettings->registerPlugin($plugin["name"], $pInfo["perms"]);
	} else {
		$jResult .= "plugin.disable();";
	}

?>

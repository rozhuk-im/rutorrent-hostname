<?php

	$IP = $_POST[ "ip" ];
	if (!isset($IP) || version_compare(PHP_VERSION, '5.2.0', '<')) {
		$Result = null;
	} else {
		if (substr($IP, 0, 1) == '[') { /* IPv6 addresses are given between brackets */
			$IP = substr($IP, 1, -1); /* Remove brackets before using gethostbyaddr */
		}
		$IP = filter_var($IP, FILTER_VALIDATE_IP);
		if ($IP) {
			$Result = $IP . "<|>" . gethostbyaddr($IP);
		} else {
			$Result = null;
		}
	}

	echo($Result);

?>

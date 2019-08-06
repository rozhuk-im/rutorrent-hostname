HostName Plugin for RUTorrent
==========================

The purpose of this plugin is to show hostnames of peers for selected torrent.
Based on GeoIP plugin.

![Screenshot](http://www.netlab.linkpc.net/download/software/rtorrent/rutorrent/hostnames.png)

Goals
-----
- Async requests
- Add hostname column instead of show hostnames in Address column


Requirements
------------

* PHP >= 5.2.0
* PHP 'json' extension


Installation
------------

Place all the plugin files in a directory called 'hostname' in the rutorrent/plugins directory.

To clone directly from this git repository, run this command in the rutorrent/plugins directory:

`git clone https://github.com/rozhuk-im/rutorrent-hostname.git hostname`

> **Note:** It is important that the plugin directory is named 'hostname' so that the supporting files are loaded correctly.

> **Info:** If everything is OK, you should see a new column "Hostname" in "Peers" tab.



Settings
--------

[init.js]

g_cache_size = 1024; /* Max count of cache items. */



Change log
----------

1.0 (03.10.2010)
- First release

3.9 (05.08.2019)
- Total refactoring


Contact
-------

Please send error reports and patches to: rozhuk.im@gmail.com

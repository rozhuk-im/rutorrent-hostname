HostName Plugin for RUTorrent
==========================

The purpose of this plugin is to show hostnames of peers for selected torrent.
Based on GeoIP plugin.

![Screenshot](http://www.netlab.linkpc.net/download/software/rtorrent/rutorrent/hostnames.png)


## Donate
Support the author
* **GitHub Sponsors:** [!["GitHub Sponsors"](https://camo.githubusercontent.com/220b7d46014daa72a2ab6b0fcf4b8bf5c4be7289ad4b02f355d5aa8407eb952c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d53706f6e736f722d6661666266633f6c6f676f3d47697448756225323053706f6e736f7273)](https://github.com/sponsors/rozhuk-im) <br/>
* **Buy Me A Coffee:** [!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/rojuc) <br/>
* **PayPal:** [![PayPal](https://srv-cdn.himpfen.io/badges/paypal/paypal-flat.svg)](https://paypal.me/rojuc) <br/>
* **Bitcoin (BTC):** `1AxYyMWek5vhoWWRTWKQpWUqKxyfLarCuz` <br/>


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

# rutorrent-hostname

HostName Plugin for RUTorrent
==========================

The purpose of this plugin is to show hostnames of peers for selected torrent.
Based on GeoIP plugin, and may conflict with them :)

Показывает имена хостов на вкладке с пирами.
Основан на коде плагина GeoIP, скорее всего конфликтует с ним.



Принцип работы
--------------

Запросы на преобразование имёт посылаются асинхронно на сервер rTorrent,
преобразованием занимается PHP скрипт.
Используется внутренний кеш, реализованный на джаве.
Кеш хранится в памяти браузера и при обновлении страницы он обнуляется.
Для ускорения работы кеша/снижения нагрузки на CPU используется бинарный
поиск для выборки и бинарный поиск для вставки в кеш.
Размер кеша в нормальном состоянии меньше dwCacheSize и элементы
удаляются из него не часто - в случае если они не используются более,
чем dwCacheItemUnUseTimeMax.
На всякий случай есть агрессивный режим (от dwCacheSize до dwCacheSizeMax),
в котором неиспользуемые элементы удаляются чаще - в случае если они
не используются более, чем dwCacheItemUnUseTime.
По превышении dwCacheSizeMax начинается удаление элементов, которые
не использовались дольше остальных.


Usage
-----

Unpack the plugin archive into rutorrent/plugins directory and refresh
contents of your browser. If everything is OK, you should see a
new column "HostName" next to "Name" in "Peers" tab.

Распаковать в папку rutorrent/plugins и обновить страницу в браузере.
Если всё прошло нормально появится ещё один столбец - "HostName"
в вкладке "Peers".


Settings
--------

[ init.js ]

dwCacheSize=256			// num of cache entryes
dwCacheSizeMax=2048		// max num of cache entryes
dwCacheItemUnUseTime=120000	// if items more than CacheSizeMax, delete unused items... milliseconds
dwCacheItemUnUseTimeMax=600000	// delete most unused items even if items cont lower than CacheSize... milliseconds


dwCacheSize
- Колличество элементов в кеше, которые не старше чем dwCacheItemUnUseTimeMax

dwCacheSizeMax
- Максимальное колличество элементов в кеше, для избежания превышения
удаляются самые старые элементы не взирая на таймауты.

dwCacheItemUnUseTime
- Время в течении которого хранятся неиспользуемые элементы, пока в кеше
более dwCacheSize элементов. В миллисекундах.

dwCacheItemUnUseTimeMax
- Время в течении которого хранятся неиспользуемые элементы, пока в кеше
меньше чем dwCacheSize элементов. В миллисекундах.



Localization
------------

Copy file lang/en.js into lang/XX.js , where "XX" stands for two-letter
ISO code of your language. Fill in word for "country" in language XX.
If you skip this step, English word "Country" will be displayed by default.


Change log
----------

1.0
- First release



Contact
-------

Please send error reports and patches to: rozhuk.im@gmail.com


Author: Rozhuk Ivan
--------------------



plugin.loadLang();


if(plugin.enabled)
{
	var strCacheHostIP=new Array();
	var strCacheHostName=new Array();
	var tCacheHostLastTime=new Array();

	// SETTINGS
	var dwCacheSize=256;			// num of cache entryes
	var dwCacheSizeMax=2048;		// max num of cache entryes
	//var dwCacheReqRetryTime=15000;	// if request failed, retry after... milliseconds -> theWebUI.settings["webui.reqtimeout"]
	var dwCacheItemUnUseTime=120000;	// if items more than CacheSizeMax, delete unused items... milliseconds
	var dwCacheItemUnUseTimeMax=600000; // delete most unused items even if items cont lower than CacheSize... milliseconds




	function LookupSuccess(data)
	{
		var php=data.split("<|>");
		CacheAdd(php[0],php[1]);
	}

	function LookupFailure(XMLHttpRequest,textStatus,errorThrown) {}



	function CacheFindInArray(aArray,vValue)
	{// bin searth
		var dwRetIndex=-1;
		var lft=0;
		var rt=aArray.length;
		var m;

		if (rt > 0)
		{
			rt--;
			while(lft<=rt)
			{
				m=((lft+rt)>>>1);
				if (aArray[m].toString() == vValue.toString())
				{
					dwRetIndex=m;
					break;
				}else{
					if (aArray[m].toString() > vValue.toString())
					{
						rt=m-1;
					}else{
						lft=m+1;
					}
				}
			}
		}
	return dwRetIndex;
	}


	function CacheDeleteOld()
	{
		// filter - less cpu usage
		if ((strCacheHostIP.length&7)!=7) return;


		var i;
		var dwCount;
		var tTime=new Date();
		var tTimeNow;
		var tTimeCurItem;
		var tTimeOldest;
		var dwOldestIndex=-1;
		var dwCacheItemUnUseTimeCur;


		if (strCacheHostIP.length < dwCacheSize)
		{// cache normal, delete recently unused items
			dwCacheItemUnUseTimeCur=dwCacheItemUnUseTimeMax;
		}else{// cache overflow, delete unused items
			dwCacheItemUnUseTimeCur=dwCacheItemUnUseTime;
		}

		tTimeNow=tTime.getTime();
		tTimeOldest=tTimeNow;
		dwCount=strCacheHostIP.length;
		for (i=0;i<dwCount;i++)
		{
			tTimeCurItem=tCacheHostLastTime[i];
			if (dwCacheItemUnUseTimeCur < (tTimeNow-tTimeCurItem))
			{
				strCacheHostIP.splice(i,1);
				strCacheHostName.splice(i,1);
				tCacheHostLastTime.splice(i,1);
			}else{
				if (tTimeCurItem<tTimeOldest)
				{
					tTimeOldest=tTimeCurItem;
					dwOldestIndex=i;
				}
			}
		}


		if (strCacheHostIP.length > dwCacheSizeMax && dwOldestIndex!=-1)
		{// cache overflow, delete oldest record, even if it lower than CacheItemUnUseTime
			strCacheHostIP.splice(dwOldestIndex,1);
			strCacheHostName.splice(dwOldestIndex,1);
			tCacheHostLastTime.splice(dwOldestIndex,1);
		}
	}


	function CacheAdd(strHostIP,strHostName)
	{
		var dwRetIndex=-1;
		var lft=0;
		var rt=strCacheHostIP.length;
		var m=0;
		var tTime=new Date();

		if (strHostName == null) {strHostName="-";}

		// bin search/insert
		if (rt > 0)
		{
			rt--;
			while(lft<=rt)
			{
				m=((lft+rt)>>>1);
				if (strCacheHostIP[m].toString() < strHostIP.toString())
				{
					lft=m+1;
				}else{
					if (strCacheHostIP[m].toString() > strHostIP.toString())
					{
						rt=m-1;
					}else{
						dwRetIndex=m;
						break;
					}
				}
			}
		}

		if (dwRetIndex==-1)
		{// add new item
			if (strCacheHostIP.length > 0)
			{
				dwRetIndex=m;
				if (strCacheHostIP[m].toString() < strHostIP.toString()) {dwRetIndex++;}
			}else{
				dwRetIndex=0;
			}
			strCacheHostIP.splice(dwRetIndex,0,strHostIP);
			strCacheHostName.splice(dwRetIndex,0,strHostName);
			tCacheHostLastTime.splice(dwRetIndex,0,tTime.getTime());

			CacheDeleteOld();

			//alert(strCacheHostIP.join('\r\n')); // debug helper
		}else{// update existing
			//strCacheHostIP[dwRetIndex]=strHostIP;// allready equal
			strCacheHostName[dwRetIndex]=strHostName;
			tCacheHostLastTime[dwRetIndex]=tTime.getTime();
		}

	return dwRetIndex;
	}


	function CacheHostNameGet(strHostIP)
	{
		var strRetHostName;
		var dwIndex;
		var jqAjaxReq=false;

		dwIndex=CacheFindInArray(strCacheHostIP,strHostIP);
		if (dwIndex==-1)
		{
			CacheAdd(strHostIP,"-");
			jqAjaxReq=true;
			strRetHostName="...";
		}else{
			var tTime=new Date();

			strRetHostName=strCacheHostName[dwIndex];
			if (strRetHostName == null)
			{
				strRetHostName="-";
			}else{
				if (strRetHostName[dwIndex] == "-")
				{
					if ((tTime.getTime()-tCacheHostLastTime[dwIndex]) > theWebUI.settings["webui.reqtimeout"])
					{
						tCacheHostLastTime[dwIndex]=tTime.getTime();
						jqAjaxReq=true;
					}
				}else{
					tCacheHostLastTime[dwIndex]=tTime.getTime();
				}
			}
		}

		if (jqAjaxReq==true)
		{
			jqAjaxReq=jQuery.ajax( {
				type: "POST",
				processData: true,
				contentType: "application/x-www-form-urlencoded",
				async : true,
				cache : false,
				timeout: theWebUI.settings["webui.reqtimeout"],
		    		url : "plugins/hostname/lookup.php",
	    			data : { ip : strHostIP},
	    			dataType : "text",
		    		success : LookupSuccess,
		    		error: LookupFailure } );
		}

	return strRetHostName;
	}



	plugin.config = theWebUI.config;
	theWebUI.config = function(data)
	{
		if(plugin.canChangeColumns())
		{
			this.tables.prs.columns.unshift({text : 'hostname', width : '80px', id: 'hostname', type : TYPE_STRING});
		}
		plugin.config.call(this,data);
		plugin.done();
	}


	plugin.getpeersResponse = rTorrentStub.prototype.getpeersResponse;
	rTorrentStub.prototype.getpeersResponse = function(xml)
	{
		var peers = plugin.getpeersResponse.call(this,xml);
		if(plugin.enabled)
		{
			$.each( peers, function(id,peer)
			{
				peer.hostname = CacheHostNameGet(peer.ip);
			});
		}
		return(peers);
	}


	if(plugin.canChangeColumns())
	{
		plugin.done = function()
		{
			if(plugin.allStuffLoaded)
			{
				var table = theWebUI.getTable("prs");
				table.renameColumnById("hostname",theUILang.HostName);
			} else
				setTimeout(arguments.callee,1000);
		}
	}

}


plugin.onRemove = function()
{
        if(plugin.retrieveCountry)
		theWebUI.getTable("prs").removeColumnById("hostname");
}



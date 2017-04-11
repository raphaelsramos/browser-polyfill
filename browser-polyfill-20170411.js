(function( $ ){
	/***
	if(!$.browser){
		$.browser={chrome:false,mozilla:false,opera:false,msie:false,safari:false};
		var ua=navigator.userAgent;
			$.each($.browser,function(c,a){
			$.browser[c]=((new RegExp(c,'i').test(ua)))?true:false;
				if($.browser.mozilla && c =='mozilla'){$.browser.mozilla=((new RegExp('firefox','i').test(ua)))?true:false;};
				if($.browser.chrome && c =='safari'){$.browser.safari=false;};
			});
	};
	*/
	
	if( $.browser ) return;

	var nAgt = navigator.userAgent,
		nVersion = navigator.appVersion,
		nameOffset,
		verOffset,
		ix;
		
	$b = {
		mozilla: false,
		webkit: false,
		opera: false,
		msie: false,
		
		name: navigator.appName,
		fullVersion: ''+ parseFloat( nVersion ),
		majorVersion: parseInt( nVersion, 10 ),
	};


	// In Opera, the true version is after "Opera" or after "Version"
	if( ( verOffset = nAgt.indexOf( "Opera" ) ) != -1 ){
		$b.opera = true;
		$b.name = "Opera";
		$b.fullVersion = nAgt.substring( verOffset + 6 );
		if( ( verOffset = nAgt.indexOf( "Version" ) ) != -1 )
			$b.fullVersion = nAgt.substring( verOffset + 8 );
	
	// In MSIE, the true version is after "MSIE" in userAgent
	} else if( ( verOffset = nAgt.indexOf( "MSIE" ) ) != -1 ){
		$b.msie = true;
		$b.name = "Microsoft Internet Explorer";
		$b.fullVersion = nAgt.substring( verOffset + 5 );

	// In Chrome, the true version is after "Chrome"
	} else if( ( verOffset = nAgt.indexOf( "Chrome" ) ) != -1 ){
		$b.webkit = true;
		$b.name = "Chrome";
		$b.fullVersion = nAgt.substring( verOffset + 7 );

	// In Safari, the true version is after "Safari" or after "Version"
	} else if( ( verOffset = nAgt.indexOf( "Safari" ) ) != -1 ){
		$b.webkit = true;
		$b.name = "Safari";
		$b.fullVersion = nAgt.substring(verOffset+7);
		if( ( verOffset = nAgt.indexOf( "Version" ) ) != -1 )
			$b.fullVersion = nAgt.substring( verOffset + 8 );

	// In Firefox, the true version is after "Firefox"
	} else if( ( verOffset = nAgt.indexOf( "Firefox" ) ) != -1 ){
		$b.mozilla = true;
		$b.name = "Firefox";
		$b.fullVersion = nAgt.substring( verOffset + 8 );

	// In most other browsers, "name/version" is at the end of userAgent
	} else if( ( nameOffset = nAgt.lastIndexOf(' ') + 1 ) < ( verOffset = nAgt.lastIndexOf( '/' ) ) ){
		$b.name = nAgt.substring( nameOffset, verOffset );
		$b.fullVersion = nAgt.substring( verOffset + 1 );
		if( $b.name.toLowerCase() == $b.name.toUpperCase() )
			$b.name = navigator.appName;

	}

	// trim the fullVersion string at semicolon/space if present
	if( ( ix = $b.fullVersion.indexOf( ";" ) ) != -1 )
		$b.fullVersion = $b.fullVersion.substring( 0, ix );
	
	if( ( ix = $b.fullVersion.indexOf( " " ) ) != -1 )
		$b.fullVersion=$b.fullVersion.substring( 0, ix );

	$b.majorVersion = parseInt(''+ $b.fullVersion, 10 );
	if( isNaN( $b.majorVersion ) ){
		$b.fullVersion  = ''+ parseFloat( nVersion );
		$b.majorVersion = parseInt( nVersion, 10 );
	}
	$b.version = $b.majorVersion;
	
	$.browser = $b;
})( jQuery );
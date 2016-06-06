
var _paletton = null;

(function(){

	var k, setup, defaults, options,
		html, body, iframe, overlay,
		init, done, open, colorize,
		callbackDone = null;


// Check browser

	function isBadBrowser() {
		var ie, opera, feat, nav = navigator.userAgent.toLowerCase();
		ie = (nav.indexOf('msie') != -1) ? parseInt(nav.split('msie')[1]) : 0;
		opera = !!window.opera;
		feat = typeof window.postMessage=='function' && typeof window.addEventListener=='function';
		return (ie && ie<=9) || opera || !feat; // = bad
		}

	if (isBadBrowser()) {
		_paletton = {
			open: function() {
			// fail instead of open in unsupported browser
				alert('Unfortunatelly, your browser is not supported for Paletton Live Colorizer. A modern browser is required, like IE10+, Chrome, Safari, or Firefox.');
				}
			}
		return;
		}



// SETUP values = private options

	setup = {

		widgetServer: 'http://localhost:8000',
		iFramePath: '/static/core/paletton/widget.html',
		iFrameId: 'paletton-widget-iframe',
		overlayId: 'paletton-widget',

		events: {
			loaded: 'palettonwidget/loaded',		// listen; widget is loaded and ready => init
			done: 'palettonwidget/done',			// listen; widget has to be closed
			pars: 'palettonwidget/pars'				// broadcast; inited, send options/pars to widget
			},

		minWidth: 640,
		minHeight: 500

		}


// DEFAULT options = public options


	defaults = {

	// Editor options

		width: 960,		// colorizer width in pixels, min width 640 (the palette editor is 420px wide, the rest is for preview)
		height: 500,	// colorizer height in pixels, min. height 500
		dark: false,	// false = white Colorizer UI, true = dark Colorizer UI

	// Preview templates

		templateURL: '',
		paletteUID: '',

		colorizeMode: 'class',	// class | less | custom

		myData: null,

	// Various

		debugMode: false

		}

// /DEFAULT options




// FUNCTIONS


	init = function(){
		var ifr, msg;
		msg = {
			id: setup.events.pars,
			data: options
			}
		ifr = document.getElementById(setup.iFrameId);
		ifr.contentWindow.postMessage(msg, '*');
		}


	done = function(result){
		overlay.parentNode.removeChild(overlay);
		if (callbackDone && typeof(callbackDone)=='function') callbackDone(result);
		}


	open = function(opt,callback) {

	// generate content

		// shallow options merge
		options = {}
		for (k in defaults) options[k] = defaults[k]
		for (k in opt) options[k] = opt[k]

		callbackDone = callback;

		var w, h, wh = window.innerHeight,
			bgCol = (options.dark) ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)';

		overlay = document.createElement('DIV');
		overlay.id = setup.overlayId;
		with (overlay.style) {
			position = 'absolute';
			zIndex = 99999;
			left = 0;
			top = 0;
			right = 0;
			bottom = 0;
			textAlign = 'center';
			minHeight = '500px';
			background = bgCol;
			}

		body = document.getElementsByTagName('BODY')[0];
		body.appendChild(overlay);

		iframe = document.createElement('IFRAME');
		iframe.id = setup.iFrameId;
		iframe.src = setup.widgetServer + setup.iFramePath + '#uid=' + options.paletteUID;
		w = Math.max(options.width,setup.minWidth);
		h = Math.max(options.height,setup.minHeight);
		with (iframe.style) {
			width = w + 'px';
			height = h + 'px';
			margin = 'auto';
			marginTop = (wh-h)/2 + 'px';
			border = 'none';
			boxShadow = '3px 3px 15px rgba(0,0,0,0.5)';
			}

		overlay.appendChild(iframe);
		}



// INIT

// activate MESSAGES

	window.addEventListener('message',function(e){
		if (!e || !e.data) return;
		if (e.data.id==setup.events.loaded) init();
		else if (e.data.id==setup.events.done) done(e.data.data);
		},false);


// create interface

	_paletton = {
		open: open
		}


	})();



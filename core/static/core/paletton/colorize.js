$(function(){
// on ready function

	window.addEventListener('message',function(e){
		if (!e || !e.data) return;
		if (e.data.id=='palettonwidget/colorize/class') colorizeClass(e.data.data);
		else if (e.data.id=='palettonwidget/colorize/less') colorizeLess(e.data.data);
		},false);

	var msg = {
		id: 'palettonwidget/previewloaded',
		data: 'null'
		}
	parent.postMessage(msg, '*');



	var cssProps = {
		'bgcol': 'background',
		'col': 'color',
		'bdcol': 'border-color'
		}

	function colorizeClass(colTable){
		var i, key, pkey, c1, c2;
		for (colId in colTable['byPalette']) {
			for (i=0;i<5;i++) {
				for (pkey in cssProps) {
					c1 = colTable['byPalette'][colId][i];
					c2 = colTable['byLum'][colId][i];
					$('.' + pkey + '-' + colId + '-' + i).css( cssProps[pkey], c1 );
					$('.' + pkey + '-' + colId + '-lum-' + i).css( cssProps[pkey], c2 );
					}
				}
			}
		}


	function colorizeLess(colTable){
		var i, tbl, colId, c1, c2,
			lessObj = {};
		for (colId in colTable['byPalette']) {
			for (i=0;i<5;i++) {
				c1 = colTable['byPalette'][colId][i]
				c2 = colTable['byLum'][colId][i]
				lessObj['@col-'+colId+'-'+i] = c1
				lessObj['@col-'+colId+'-lum-'+i] = c2
				}
			}
		less.modifyVars(lessObj);
		}


	});


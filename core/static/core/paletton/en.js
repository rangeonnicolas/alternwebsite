
var _Paletton_Strings = {

	error: {
		dispatchURLNotAvailable: 'We are sorry, this page is not available at this moment.'
		},


	app: {
		confirmOldUID: 'Your URL contains a palette code from the previous version of the application. Do you want to open the previous version to show the palette?',
		confirmoldUIDImported: 'Paletton.com has imported the palette from a previous version. Do you want to open it? Otherwise, you\'ll be redirected back to the old version of the application.',
		confirmoldUIDFail: 'Paletton.com can\'t import the palette from a previous version. Do you want to start with the default palette? Otherwise, the old version of the application will try to open the palette.',
		btnOK: 'OK',
		btnCancel: 'Cancel',
		btnClose: 'Close',
		btnUndo: 'Undo',
		btnRedo: 'Redo',
		btnReset: 'Reset',
		btnMore: {
			btn: 'More Info',
			list: {
				about: 'About color schemes',
				versions: 'Version history',
				linkFB: 'Paletton on Facebook',
				linkTW: 'Paletton on Twitter',
				linkGplus: 'Paletton on Google+'
				}
			},
		btnHue: {
			btn: 'Hue',
			title: 'Palette Hue',
			text: 'Enter hue manually, it\'s a number in range 0 to 360',
			opposite: 'opposite'
			},
		btnDist: {
			btn: 'Dist',
			title: 'Distance/Angle',
			text: 'Enter the secondary colors distance, it\'s a number in range 0 to 180',
			def: 'default'
			},
		btnRGB: {
			btn: 'Base RGB',
			title: 'Base Color',
			text: 'Enter the base color hex code (000000â€“FFFFFF)'
			},
		btnShare: {
			btn: 'Share palette'
			},
		btnLike: {
			text: 'Like it?'
			},

		header: {
			api: {
				btn: 'Paletton Live Colorizer',
				desc: 'The Paletton Live Colorizer allows you to use the Paletton engine within your own projects.'
				},
			mobile: {
				btn: 'Mobile',
				desc: 'Mobile applications are not available yet, the development is scheduled.'
				},
			more: {
				btn: 'More apps',
				desc: 'More apps and plugins are not available yet, the development is scheduled.'
				},
			scheduled: 'scheduled'
			},

		footer: {
			copy: 'In love with colors. Since 2002',
			versions: {
				prev: 'Previous version',
				history: 'Version history'
				},
			links: {
				text: 'Follow Paletton on',
				linkFB: 'Facebook',
				linkTW: 'Twitter',
				linkGplus: 'Google+'
				}
			}
		},


	adjuster: {
		btn: 'Fine Tune',
		title: 'Palette Fine Tune',
		lblHue: 'Hue',
		lblSat: 'Saturation',
		lblBri: 'Brightness',
		lblCon: 'Contrast'
		},


	color: {
		colors: 'Colors',
		pri: 'Primary color',
		sec: 'Secondary color',
		compl: 'Complement color',
		swap: 'Swap secondary colors'
		},


	colorInfo: {
		title: 'Color Info',
		lblHue: 'Hue',
		lblLum: 'Luminosity',
		lblLumRel: 'Rel. luminosity',
		linkWCAG: 'by WCAG',
		btnApply: 'Apply as base color'
		},


	colorList: {
		btn: 'Tables / Export',
		title: 'Color tables & export',
		detail: {
			title: 'Color list',
			sub: {
				html: {
					title: 'as HTML',
					desc: 'Export palette as HTML file, including CSS'
					},
				css: {
					title: 'as CSS',
					desc: 'Export palette as Cascading Style Sheets (CSS)'
					},
				less: {
					title: 'as LESS',
					desc: 'Export palette as LESS color mixins list'
					},
				sass: {
					title: 'as SASS',
					desc: 'Export palette as SASS color list'
					},
				xml: {
					title: 'as XML',
					desc: 'Export palette as XML file'
					},
				text: {
					title: 'as text',
					desc: 'Export palette as plain text file'
					}
				}
			},
		simple: {
			title: 'Color swatches',
			sub: {
				png: {
					title: 'as PNG image',
					desc: 'Export palette as downloadable PNG images of various sizes'
					},
				aco: {
					title: 'as ACO (Photoshop)',
					desc: 'Export palette as Photoshop swatches .ACO file'
					},
				gpl: {
					title: 'as GPL (Gimp)',
					desc: 'Export palette as GIMP swatches .GPL file'
					}
				}
			},
		grid: {
			title: 'Color grid',
			sub: {
				html: {
					title: 'as HTML',
					desc: 'Export grid as HTML file'
					},
				png: {
					title: 'as PNG image',
					desc: 'Export grid as downloadable PNG'
					}
				}
			},
		contrast: {
			title: 'Color combinations',
			desc: 'The higher number, the higher contrast of combined colors.',
			filter: {
				btn: 'Min. contrast',
				title: 'Filter minimum color contrast',
				text: '<p>Enter a number 0-21 to highlight color combinations with higher contrast. Enter 0 to turn filter off.</p><p>Acceptable contrast: 2<br>Required by WCAG for large elements: 3<br>Required by WCAG for small text: 4.5</p>'
				}
			}
		},


	convert: {
		btn: 'Vision simulation',
		btnOn: 'Simulation active',
		list: {
			'none': {
				title: 'No vision simulation',
				desc: ''
				},
			'colorblind': {
				title: 'Color blind simulation',
				sub: {
					'protanope': {
						title: 'Protanopia <i>(1 % of men)</i>',
						desc: 'Protanopia is a severe type of color vision deficiency caused by the complete absence of red retinal photoreceptors. It is a form of dichromatism in which the subject can only perceive light wavelengths from 400 to 650nm, instead of the usual 700nm. Pure reds cannot be seen, instead appearing black; purple colors cannot be distinguished from blues; more orange-tinted reds may appear as very dim yellows, and all orange-yellow-green shades of too long a wavelength to stimulate the blue receptors appear as a similar yellow hue. It is hereditary, sex-linked, and present in 1% of males.'
						},
					'deuteranope': {
						title: 'Deuteranopia <i>(1 % of men)</i>',
						desc: 'Deuteranopia is a color vision deficiency in which the green retinal photoreceptors are absent, moderately affecting redâ€“green hue discrimination. It is a form of dichromatism in which there are only two cone pigments present. It is likewise hereditary and sex-linked.'
						},
					'tritanope': {
						title: 'Tritanopia <i>(rare, cca 0,003 % of population)</i>',
						desc: 'Tritanopia is a very rare color vision disturbance in which there are only two cone pigments present and a total absence of blue retinal receptors. Blues appear greenish, yellows and oranges appear pinkish, and purple colors appear deep red. It is related to Chromosome "7".'
						},
					'protanomaly': {
						title: 'Protanomaly <i>(1 % of men)</i>',
						desc: 'Protanomaly is a mild color vision defect in which an altered spectral sensitivity of red retinal receptors (closer to green receptor response) results in poor redâ€“green hue discrimination. It is hereditary, sex-linked, and present in 1% of males.'
						},
					'deuteranomaly': {
						title: 'Deuteranomaly <i>(5 % of men, 0.4 % of women)</i>',
						desc: 'Deuteranomaly, caused by a similar shift in the green retinal receptors, is by far the most common type of color vision deficiency, mildly affecting redâ€“green hue discrimination in 5% of European males. It is hereditary and sex-linked.'
						},
					'tritanomaly': {
						title: 'Tritanomaly <i>(very rare)</i>',
						desc: 'Tritanomaly is a rare, hereditary color vision deficiency affecting blueâ€“green and yellowâ€“red/pink hue discrimination. Unlike most other forms, it is not sex-linked, it is related to Chromosome "7".'
						},
					'dyschromatope': {
						title: 'Dyschromatopsia (incomplete achromatopsia)',
						desc: ''
						},
					'achromatope': {
						title: 'Full achromatopsia (unable to see color)',
						desc: ''
						}
					}
				},
			'desaturate': {
				title: 'Desaturate',
				sub: {
					'grayhalf': {
						title: 'Low saturation',
						desc: ''
						},
					'gray90': {
						title: 'Almost gray',
						desc: ''
						},
					'gray': {
						title: 'Grayscale',
						desc: ''
						}
					}
				},
			'gamma': {
				title: 'Gamma simulation',
				sub: {
					'gamma-low': {
						title: 'Lighten: Lousy LED display or light ink print',
						desc: ''
						},
					'gamma-high': {
						title: 'Darken: Weak CRT display or heavy laser print',
						desc: ''
						}
					}
				},
			'webcolor': {
				title: 'Web Colors (legacy 216-color palette)',
				desc: ''
				}
			}
		},



	examples: {
		btn: 'Examples',
		title: 'Palette usage examples',
		web: {
			title: 'Page layout',
			sub: {
				'webl': {
					title: 'Positive design',
					desc: ''
					},
				'webd': {
					title: 'Negative design',
					desc: ''
					},
				'webw': {
					title: 'White page',
					desc: ''
					},
				'webb': {
					title: 'Dark page',
					desc: ''
					}
				}
			},
		pic: {
			title: 'Artwork',
			sub: {
				'glo': {
					title: 'City Glitters',
					desc: ''
					},
				'glo2': {
					title: 'Splash!',
					desc: ''
					},
				'shtr': {
					title: 'Shatter Explosion',
					desc: ''
					},
				'flwr': {
					title: 'Random Flowers',
					desc: ''
					},
				'tart': {
					title: 'Tartan Fabric',
					desc: ''
					}
				}
			},
		anim: {
			title: 'Animated',
			sub: {
				'blob': {
					title: 'Bubbling',
					desc: ''
					},
				'stripes': {
					title: 'Stripes',
					desc: ''
					}
				}
			}
		},


	model: {
		addCompl: 'add complementary',
		list: {
			mono: {
				full: 'Monochromatic',
				short: 'Monochromatic',
				desc: '1-color'
				},
			monocompl: {
				full: 'Monochromatic with complement',
				short: 'Monochromatic',
				desc: '2-colors'
				},
			analog: {
				full: 'Adjacent colors',
				short: 'Adjacent colors',
				desc: '3-colors'
				},
			analogcompl: {
				full: 'Adjacent colors with complement',
				short: 'Adjacent colors',
				desc: '4-colors'
				},
			triad: {
				full: 'Triad',
				short: 'Triad',
				desc: '3-colors'
				},
			triadcompl: {
				full: 'Triad with complement',
				short: 'Triad',
				desc: '4-colors'
				},
			tetrad: {
				full: 'Tetrad',
				short: 'Tetrad',
				desc: '4-colors'
				},
			free: {
				full: 'Free style',
				short: 'Free style',
				desc: 'Hold Shift to move colors individually'
				}
			}
		},


	palette: {
		label: 'My Palette',
		img: {
			title: 'Download palette as image',
			label: 'Palette image'
			}
		},


	preset: {
		btn: 'Presets',
		list: {
			'pale-light': {
				title: 'Lightest Pale Pastel'
				},
			'pastels-bright': {
				title: 'Bright Pastel'
				},
			'shiny': {
				title: 'Shiny'
				},
			'pastels-lightest': {
				title: 'Very Light Pale Pastel'
				},
			'pastels-very-light': {
				title: 'Very Light Pastel'
				},
			'full': {
				title: 'Full Colors'
				},
			'pastels-light': {
				title: 'Lighter Pale Pastel'
				},
			'pastels-med': {
				title: 'Lighter Pastel'
				},
			'darker': {
				title: 'Darker Colors'
				},
			'pastels-mid-pale': {
				title: 'Pale Pastel'
				},
			'pastels': {
				title: 'Pastel'
				},
			'dark-neon': {
				title: 'Dark Neon'
				},
			'pastels-dark': {
				title: 'Darker Pale Pastel'
				},
			'pastels-very-dark': {
				title: 'Darker Pastel'
				},
			'dark': {
				title: 'Dark'
				},
			'pastels-mid-dark': {
				title: 'Dark Pale Pastel'
				},
			'pastels-darkest': {
				title: 'Dark Pastel'
				},
			'darkest': {
				title: 'Deep Colors'
				},
			'almost black': {
				title: 'Greyish darkest'
				},
			'almost-gray-dark': {
				title: 'Greyish dark'
				},
			'almost-gray-darker': {
				title: 'Greyish medium dark'
				},
			'almost-gray-mid': {
				title: 'Greyish medium light'
				},
			'almost-gray-lighter': {
				title: 'Greyish lighter'
				},
			'almost-gray-light': {
				title: 'Greyish lightest'
				}
			}
		},


	preview: {
		btn: 'Preview',
		list: {
			'def': {
				title: 'Default',
				desc: ''
				},
			'deftxt': {
				title: 'Default with text',
				desc: ''
				},
			'alt': {
				title: 'Alternative',
				desc: ''
				},
			'alttxt': {
				title: 'Alternative with text',
				desc: ''
				},
			'circ': {
				title: 'Circles',
				desc: ''
				},
			'csd3': {
				title: 'Color Scheme Designer v. 3',
				desc: ''
				},
			'csd2': {
				title: 'Color Scheme Generator v. 2',
				desc: ''
				},
			'csd1': {
				title: 'Color Scheme Generator v. 1',
				desc: ''
				},
			'mond': {
				title: 'Mondrianish mosaic',
				desc: ''
				},
			'mond0': {
				title: 'Mondrianish mosaic (empty)',
				desc: ''
				}
			}
		},


	random: {
		btn: 'Randomize',
		title: 'Click to randomize',
		btn00: 'Similar',
		btn01: 'Similar colors, unlike style',
		btn10: 'Unlike colors, similar style',
		btn11: 'Unlike'
		},


	variator: {
		info: {
			shiftText: 'Hold Shift to move shades individually'
			}
		}

	}


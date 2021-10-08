import Presentation from './presentation.js';

import { data } from 'https://lib.vizzuhq.com/test/integration/test_data/chart_types_eu.js';

let story = new Presentation('myCanvas', { data });

story.addSlide(
	chart => chart.animate({
		config: {
			channels: {
				color: { attach: ['Joy factors'] },
				size: { attach: ['Value 2 (+)'] },
				label: { attach: ['Joy factors'] }
			},
			title: '1D, 1C - Bubble',
			geometry: 'circle'
		}
	})
);

story.addSlide(
	chart => chart.animate({
		config: {
			channels: {
				y: { attach: ['Joy factors'] },
				x: { attach: ['Value 2 (+)'] },
				size: { detach: ['Value 2 (+)'] },
				label: { detach: ['Joy factors'] }
			},
			title: 'X C, Y D (Y first) - Dotplot'
		}
	})
);

story.addSlide(
	chart => chart.animate({
		config: {
			channels: {
				y: { detach: ['Joy factors'] },
				x: { detach: ['Value 2 (+)'] },
				size: { attach: ['Value 2 (+)'] },
				label: { attach: ['Joy factors'] }
			},
			title: 'X C, Y D (X first) - Bubble'
		}
	})
);

story.addSlide(
    chart => chart.animate({
		config: {
			channels: {
				lightness: { attach: ['Value 2 (+)'] },
				label: { attach: ['Country_code'], detach: ['Joy factors'] },
				size: { attach: ['Value 2 (+)', 'Country_code'] }
			},
			title: 'X C+D, Y D - Bubble.'
		},
		style: {
			plot: {
				marker: {
					label: { fontSize: 8 }
				}
			}
		}
	})
);

story.start();

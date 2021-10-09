import Presentation from 'https://vizzuhq.github.io/vizzu-workshops/2021-10-09-MOME/base/presentation.js';

import { data } from 'https://vizzuhq.github.io/vizzu-workshops/2021-10-09-MOME/data/Mobile_Fixed_Broadband.js';

let story = new Presentation('myCanvas', { data });

story.addSlide(
	chart => chart.animate({
		data: {
			filter: record =>
				record["Category"] == 'World'
		},
		config: {
			channels: {
				y: { set: ['Total',] },
				x: { set: ['Year'] },
				color: { attach: ['Service'] },
			},
			title: 'Services over time in the World',
			geometry: 'line'
		}
	})
);

story.addSlide(
	chart => chart.animate({
		config: {
			channels:{
				y:{set: ['per 100']
				},
			},
			title:'Services over time in the World per 100'
		},
	})
);

story.start();

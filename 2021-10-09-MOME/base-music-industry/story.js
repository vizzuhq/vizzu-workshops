import Presentation from 'https://vizzuhq.github.io/vizzu-workshops/2021-10-09-MOME/base/presentation.js';

import { data } from 'https://vizzuhq.github.io/vizzu-workshops/2021-10-09-MOME/data/Music_industry.js';

let story = new Presentation('myCanvas', { data });

story.addSlide(
	chart => chart.animate({
		config: {
			channels: {
				y: { set: ['Format','Revenue'] },
				x: { set: ['Year'] },
				color: { attach: ['Format'] },
			},
			title: 'Revenue over the years',
			geometry: 'area',
			align:'center'
		}
	})
);

story.addSlide(
	chart => chart.animate({
		config: {
			split: true,
		}
	})
);

story.start();


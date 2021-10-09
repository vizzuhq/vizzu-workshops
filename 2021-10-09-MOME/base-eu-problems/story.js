import Presentation from 'https://vizzuhq.github.io/vizzu-workshops/2021-10-09-MOME/base/presentation.js';

import { data } from 'https://vizzuhq.github.io/vizzu-workshops/2021-10-09-MOME/data/EU_problems.js';

let story = new Presentation('myCanvas', { data });

story.addSlide(
	chart => chart.animate({ 
		config: {
			channels: {
				y: { set: ['Problem',] },
				x: { set: ['EU avg [%]'] },
				color:{attach:['Problem']},
				label:{set: ['EU avg [%]']},
			},
			title:'EU average',
			sort:'byValue',
		},
		style:{
			plot: { paddingLeft: 200 },
		}
	})
);

story.addSlide(
	chart => chart.animate({
		data: {
			filter: record => 
				record['Problem'] == 'Climate change' 
		},
		config: {
			title: 'EU average - climate change',
			sort: 'none', //We don't need sorting by value anymore
		}
	})
);

story.start();

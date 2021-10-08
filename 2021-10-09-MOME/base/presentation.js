import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@0.3.1/dist/vizzu.min.js';

export default class Presentation
{
	constructor(canvas, init)
	{
		this.canvas = document.getElementById(canvas);
		this.canvas.style.filter = 'opacity(0)';

		this.chart = new Vizzu(canvas, init);

		this.anim = this.chart.initializing; 

		this.snapshots = [];
		this.seeking = false;
		this.playing = false;
		this.backward = false;
		this.targetSlide = 0;
		this.playingSlide = 0;
	}

	start() 
	{
		this.anim = this.anim.then(chart => {
			this.snapshots.push(chart.store());
			let anim = this.gotoSlide(0, 0, true);
//			this.seekEnd();
			return anim;
		});
		
		this.anim = this.anim.then(chart => {
			this.canvas.style.filter = 'opacity(1)';
			this.chart.render.updateFrame(true);
			this.initControls();
			return chart;
		});
	}

	addSlide(func) 
	{
		this.anim = this.anim.then(chart => {
			this.snapshots.push(chart.store());
			let anim = func(chart);
			this.seekEnd(25);
			return anim;
		});
	}

	gotoSlide(index, speed, force = false)
	{
		if (this.snapshots.length === 0) return this.chart.anim;

		if (index < 0) index = 0;
		if (index > this.snapshots.length - 1)
			index = this.snapshots.length - 1;

		if (!force && index == this.targetSlide) return this.chart.anim;

		this.targetSlide = index;

		this.chart.anim.then(chart => {
			this.backward = index < this.playingSlide;
			this.playingSlide = index;
			return chart;
		});
		
		return this.chart.animate(this.snapshots[index], speed);
	}

	seekTo(progress)
	{
		return new Promise((resolve) => setTimeout(() => {
			let anim = this.chart.animation;
			anim.pause();
			anim.seek(progress);
			resolve(this.chart);
		}, 0));
	}

	seekEnd(time = 0)
	{
		return new Promise((resolve) => setTimeout(() => {
			let anim = this.chart.animation;
			anim.pause();
			anim.seek('100%');
			anim.play();
			resolve(this.chart);
		}, time));
	}

	seek(wholeProgress)
	{
		if (this.playing) this.playing = false;
		this.seeking = true;

		let step = 1 / (this.snapshots.length - 1);
		let slide = Math.floor(wholeProgress / step) + 1;
		let progress = (wholeProgress / step) - (slide - 1);

		let needSwitch = this.backward || this.targetSlide != slide;

		if (needSwitch)
		{
			this.anim = this.gotoSlide(slide - 1);
			this.seekEnd();
			
			this.anim.then(chart => {
				this.gotoSlide(slide);
				this.seekTo((progress*100) + '%');
				return this.chart.anim;
			})
		}
		else {
			this.seekTo((progress*100) + '%');
		}
	}

	endSeek()
	{
		if (this.seeking) {
			this.seekEnd();
			this.seeking = false;
		}
	}

	showProgress(progress)
	{
		let step = 1 / (this.snapshots.length - 1);
		let wholeProgress;
		if (this.backward)
		{
			wholeProgress = step * ( (this.playingSlide) + ( 1 - progress));
		} 
		else 
		{
			wholeProgress = step * ( (this.playingSlide - 1) + progress);
		}

		this.slider.value = wholeProgress * 1000;
	}

	initControls() 
	{
		this.slider = document.getElementById('myRange');
		this.slider.oninput = ev => { this.seek(ev.target.value / 1001); };
		this.chart.on('update', ev => { this.showProgress(ev.data.progress); });

		let start = document.getElementById('btn-start');
		start.onclick = ev => {
			this.stepBegin();
		};

		let prev = document.getElementById('btn-prev');
		prev.onclick = ev => {
			this.stepBack();
		};

		let play = document.getElementById('btn-play');
		play.onclick = ev => {
			this.play();
		};
		
		let next = document.getElementById('btn-next');
		next.onclick = ev => {
			this.stepForward();
		};
		
		let end = document.getElementById('btn-end');
		end.onclick = ev => {
			this.stepEnd();
		};
		
		let fullscreen = document.getElementById('btn-fullscreen');
		fullscreen.onclick = ev => {
			this.toggleFullscreen();
		};

		document.addEventListener('keydown', (ev) => {
			if(ev.keyCode === 33) this.stepBack();
			if(ev.keyCode === 34) this.stepForward();
		});
	};

	play()
	{
		this.endSeek();
		if (this.playing) this.playing = false;
		else {
			this.playing = true;
			for(let i = this.targetSlide + 1; i < this.snapshots.length; i++)
			{
				this.anim = this.anim.then(chart => {
					if (this.playing) {
						return this.gotoSlide(i);
					}
					else return chart;
				});
			}
		}
	}

	stepBegin()
	{
		this.endSeek();
		this.playing = false;
		this.gotoSlide(0, 0.1);
	}

	stepEnd()
	{
		this.endSeek();
		this.playing = false;
		this.gotoSlide(this.snapshots.length - 1, 0.1);
	}

	stepForward()
	{
		this.endSeek();
		this.playing = false;
		this.gotoSlide(this.targetSlide + 1);
	}

	stepBack()
	{
		this.endSeek();
		this.playing = false;
		this.gotoSlide(this.targetSlide - 1);
	}

	toggleFullscreen() 
	{
		if (!document.fullscreenElement) {
			let element = this.canvas;
			var requestMethod = element.requestFullscreen 
				|| element.webkitRequestFullscreen 
				|| element.webkitRequestFullScreen 
				|| element.mozRequestFullScreen 
				|| element.msRequestFullscreen;
			
			if (requestMethod) {
				try {
					requestMethod.apply(element)
				}
				catch (error) {
					alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
				}
			}
		}
		else {
			document.exitFullscreen()
		}
	}
}

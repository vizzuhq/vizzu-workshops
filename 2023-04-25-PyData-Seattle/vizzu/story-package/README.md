<p align="center">
  <a href="https://github.com/vizzuhq/vizzu-lib">
    <img src="https://github.com/vizzuhq/vizzu-lib-doc/raw/main/docs/readme/infinite-60.gif" alt="Vizzu" />
  </a>
  <p align="center"><b>Vizzu - Story</b> JavaScript Extension</p>
  <p align="center">
    <a href="https://vizzuhq.github.io/vizzu-ext-js-story/docs/">Example</a>
    · <a href="https://github.com/vizzuhq/vizzu-ext-js-story/">Repository</a>
  </p>
</p>

# About The Extension

Vizzu-Story is an extension for the [Vizzu](https://github.com/vizzuhq/vizzu-lib) 
JavaScript library that allows users to create interactive presentations from the animated data visualizations built with Vizzu.

The extension provides a Web Component that contains the presentation and adds 
controls for navigating between slides - predefined stages within the story.

# Installation

Install via [npm](https://www.npmjs.com/package/vizzu-story):

    npm install vizzu-story

Or use it from CDN:

    https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js

# Usage

![Readme example](assets/readme-example.gif)

Create a 'vizzu-player' element that will contain the rendered story:

```html
  <vizzu-player controller></vizzu-player>
```

In a script module element

```html
<script type="module">
```

Import the extension from CDN or local install:

```javascript
import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js';
```

Add the underlying data for the data story. You can use the same data definition 
formats as in the Vizzu library, but you must add the entire data set for the 
whole story in the initial step; you can not change this later. 
See [Vizzu tutorial - Data](https://lib.vizzuhq.com/latest/#chapter-0.1) for more details on data formats.

```javascript
const data = {
  series: [
    { name: 'Foo', values: ['Alice', 'Bob', 'Ted'] },
    { name: 'Bar', values: [15, 32, 12] },
    { name: 'Baz', values: [5, 3, 2] }
  ]
};
```

Create the data story by defining a sequence of slides. A slide can be a single 
chart corresponding to a single '[animation()](https://lib.vizzuhq.com/latest/#chapter-0.0)' call from Vizzu.
Or a slide can be a sequence of animation calls, in which case all of these animations 
will be played until the last one in the sequence, allowing for more complex transitions between slides. 
Navigation controls beneath the chart will navigate between the slides. You can use the PgUp and PgDn buttons, 
left and right arrows to navigate between slides, and the Home and End buttons to jump to the first or last slide.

```javascript
const slides = [
    {
      config: {
        x: 'Foo',
        y: 'Bar'
      }
    },
    {
      config: {
        color: 'Foo',
        x: 'Baz', 
        geometry: 'circle' 
      }
    }
]
```

On each chart, you can define the chart configuration and style with the same 
objects as in Vizzu. However, you can not modify the underlying data between the 
slides, only the data filter used.

```typescript
interface Chart
{
  config?: Vizzu.Config.Chart;
  filter?: Vizzu.Data.FilterCallback | null;
  style?: Vizzu.Styles.Chart;
}
```

Put the data object and the slide list into the story descriptor object.
Here you can also set the 'story' objects 'style' property to set the chart style used for the whole story.

```javascript
const story = {
  data: data,
  slides: slides
}
```

Then set up the created element with the configuration object:

```javascript
const vp = document.querySelector("vizzu-player");
vp.slides = story;
```

> [Check out a live example in JSFiddle!](https://jsfiddle.net/VizzuHQ/topcmuyf/3/)

See [vizzu-story.d.ts](https://github.com/vizzuhq/vizzu-ext-js-story/blob/main/src/vizzu-story.d.ts) 
and [vizzu.d.ts](https://cdn.jsdelivr.net/npm/vizzu@latest/dist/vizzu.d.ts) for detailed API type declarations.

Or check out the source of this example to see a more complex use case:
[code](https://github.com/vizzuhq/vizzu-ext-js-story/blob/main/docs/index.js).

# Contributing

We welcome contributions to the project; visit our [wiki page](https://github.com/vizzuhq/vizzu-lib/wiki) for further info.

# Contact

* Join our Slack: [vizzu-community.slack.com](https://join.slack.com/t/vizzu-community/shared_invite/zt-w2nqhq44-2CCWL4o7qn2Ns1EFSf9kEg)
* Drop us a line at hello@vizzuhq.com
* Follow us on Twitter: [https://twitter.com/VizzuHQ](https://twitter.com/VizzuHQ)

# License

Copyright © 2022-2023 [Vizzu Inc.](https://vizzuhq.com)

Released under the [Apache 2.0 License](https://github.com/vizzuhq/vizzu-lib/blob/main/LICENSE).

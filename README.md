# stimulus-toggle-util

An on/off toggle utility for [Stimulus](https://stimulusjs.org/).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [License](#license)

## Installation

```sh
$ yarn add stimulus-toggle-util
```

### Register the Controller

```js
// ./packs/application.js
import { Application } from 'stimulus';
// import Toggle
import Toggle from 'stimulus-toggle-util';

import { definitionsFromContext } from 'stimulus/webpack-helpers';
const application = Application.start();
const context = require.context('../controllers', true, /\.js$/);
application.load(definitionsFromContext(context));

// Manually register `stimulus-toggle-util` as a stimulus controller
application.register('toggle', Toggle);
```

## Usage

1. Attach the controller to an element. Recommended to attach to a top-level container, like `<body>` or `<main>` so it can be used anywhere.
    * **Example:**
    ```html
    <main data-controller="toggle">...</main>
    ```
2. Attach an `action` and a `toggle target` to an element that should _perform_ the toggling.
    * **Example:**
    ```html
    <button data-action="toggle#toggle" data-toggle-target="sidebar-1">Toggle</button>
    ```
    * `data-action="toggle#toggle"`: `toggle` is the `ToggleController`, `#toggle` is the _action_ that is performed when this element is clicked.
3. Attach a `toggle name` to an element that should _be toggled_.
    * **Example:**
    ```html
    <aside data-toggle-name="sidebar-1">...</aside>
    ```

### Toggle a single element

```html
<main data-controller="toggle">
  <button data-action="toggle#toggle" data-toggle-target="sidebar-1">
    Toggle Sidebar 1
  </button>
      
  <aside class="is-hidden" data-toggle-name="sidebar-1">
    <p>Here's "Sidebar 1".</p>
  </aside>
</main>
```

![1](https://user-images.githubusercontent.com/368723/79125630-145c0d00-7d64-11ea-892a-cfc543a394bd.gif)

### Toggle multiple elements

```html
<main data-controller="toggle">
  <button data-action="toggle#toggle" data-toggle-target="sidebar-1">
    Toggle Sidebar 1
  </button>
  <button
    data-action="toggle#toggle"
    data-toggle-target="sidebar-1,sidebar-2"
  >
    Toggle Sidebar 1 & 2
  </button>

  <aside class="is-hidden" data-toggle-name="sidebar-1">
    <p>Here's "Sidebar 1".</p>
  </aside>
  <aside class="is-hidden" data-toggle-name="sidebar-2">
    <p>Here's "Sidebar 2".</p>
  </aside>
</main>
```

![2](https://user-images.githubusercontent.com/368723/79125652-1b831b00-7d64-11ea-9915-7d13eb105fd7.gif)

### Customize the CSS class

```html
<main data-controller="toggle" data-hidden-class="custom-hidden-class">
  <button data-action="toggle#toggle" data-toggle-target="sidebar-1">
    Toggle Sidebar 1
  </button>
      
  <aside data-toggle-name="sidebar-1">
    <p>Here's "Sidebar 1".</p>
  </aside>
</main>
```

### Options

Option | Type | Required | Default | Description
--- | --- | :---: | --- | ---
`data-hidden-class` | `String` | 🚫 | `is-hidden` | The CSS class to toggle on/off

### License

This project is licensed under the MIT License.

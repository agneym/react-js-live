## JS Live

[![npm version](https://badge.fury.io/js/react-js-live.svg)](https://badge.fury.io/js/react-js-live)

A React Component for live rendering and editing of HTML, CSS and JS.

![screenshot](./screenshot.png)

## Usage

```
npm install react-js-live
```

```jsx
<JSLive
  snippets={snippets}
  mode="js"
/>
```

### Props:

1. snippets

Object containing keys: `html`, `css` and `js`. This is the initial code passed into the component.

```js
const snippets = {
  html: `<p>HTML Content goes here</p>`,
  css: `.title { color: red; }`,
  js: `alert(js)`
}
```

2. mode

    default: `js`

    values: 

    1. `html`: 
      Left tab defaults to HTML and Right defaults to Result
    2. `js`
      Left tab defaults to JS and Right tab to Console.


## Contributing

1. Clone the repo
2. `npm install` 
3. `npm start`

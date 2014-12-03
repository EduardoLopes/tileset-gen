var React = require('react');
var TopBar = require('./components/top-bar.js');
var TilesetBasesContainers = require('./components/tileset-bases-container.js');

React.render(
  <div>
    <TopBar/>
    <TilesetBasesContainers />
  </div>,
  document.getElementById('container')
);

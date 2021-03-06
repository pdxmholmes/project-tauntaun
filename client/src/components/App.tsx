import React from 'react';

import './App.css';

import { CampaignMap } from './CampaignMap';

function App() {
  return (
    <div className="App">
      <CampaignMap
        lat={43}
        lng={41}
        zoom={9}
        tileLayerUrl="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYm9ibW9yZXR0aSIsImEiOiJjazI4amV6eWswaWF2M2JtYjh3dmowdnQ1In0.XutSpPpaRm9LZudTNgVZwQ"
      />
    </div>
  );
}

export default App;

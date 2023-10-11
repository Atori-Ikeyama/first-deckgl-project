import React from 'react';
import DeckGL from '@deck.gl/react';
import {ColumnLayer} from '@deck.gl/layers';
import Map from 'react-map-gl';

// Set your mapbox access token here
const MY_ACCESS_TOKEN = 'pk.eyJ1IjoiYXRvcmluZ28iLCJhIjoiY2t6eTM3enExMDBraDJ1bnZ4MTU0NndpeiJ9.NU7QC03v3utkR1EKbcTQ-A';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 140.7163814,
  latitude: 41.75280871,
  zoom: 13,
  maxZoom: 15,
  minZoom: 10,
  pitch: 30,
  bearing: 0
};

function App({data}) {
  const layer = new ColumnLayer({
    id: 'column-layer',
    data,
    diskResolution: 12,
    radius: 30,
    // angle: 90,
    extruded: true,
    pickable: true,
    elevationScale: 5000,
    getPosition: d => d.position,
    getFillColor: d => [227 - d.value*114, 253 - d.value*52, 253 - d.value*47, 150],
    getLineColor: [0, 0, 0],
    getElevation: d => d.value
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      getTooltip={({ object }) => {
        return object && `名称(カナ) : ${object.name}\nトイレの数 : ${object.value*18}`;
      }}
      layers={[layer]}
      controller={true}
    >
      <Map
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MY_ACCESS_TOKEN}
        />;
    </DeckGL>
  );
}

export default App;
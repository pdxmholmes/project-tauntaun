import React, { useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { pick } from 'lodash';

import { UnitMarker } from './UnitMarker';
import { Unit } from '../models/unit';
import { gameService } from '../services/gameService';

export interface CampaignMapProps {
  tileLayerUrl: string;
  lat: number;
  lng: number;
  zoom: number;
}

export interface CampaignMapState {
  ships: Unit[];
  planes: Unit[];
}

export function CampaignMap(props: CampaignMapProps) {
  const isUnderway = (unit: Unit): boolean => {
    return unit.points[0].action === 'Turning Point';
  };

  const [state, setState] = useState<CampaignMapState>({
    ships: [],
    planes: []
  });

  useEffect(() => {
    gameService
      .getShips('blue')
      .then(ships => {
        setState(oldState => ({
          ...oldState,
          ships
        }));
      })
      .catch(error => console.error(`couldn't fetch ships`, error));

    gameService
      .getPlanes('blue')
      .then(planes =>
        setState(oldState => ({
          ...oldState,
          planes
        }))
      )
      .catch(error => console.error(`couldn't fetch planes`, error));
  }, []);

  return (
    <div data-testid="campaign-map">
      <Map center={pick(props, ['lat', 'lng'])} zoom={props.zoom}>
        <TileLayer
          url={props.tileLayerUrl}
          id="bobmoretti.3zp0vycr"
          maxZoom={13}
          attribution={
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          }
        />
        {[...state.planes, ...state.ships]
          .filter(unit => isUnderway(unit))
          .map(unit => (
            <UnitMarker key={unit.sidc} unit={unit} />
          ))}
      </Map>
    </div>
  );
}

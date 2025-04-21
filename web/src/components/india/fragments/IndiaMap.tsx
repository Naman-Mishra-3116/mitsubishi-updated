"use client";
import topoJson from "../data/india.topo.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

interface IProps {
  markers: { name: string; city: string; coordinates: [number, number] }[];
}

const IndiaMap: React.FC<IProps> = ({ markers }) => {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [82.8, 22.5],
        scale: 900,
      }}
      style={{ width: "auto", height: "auto" }}
    >
      <Geographies geography={topoJson}>
        {({ geographies }: { geographies: { rsmKey: string }[] }) => {
          return geographies.map((geo: { rsmKey: string }) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="white"
              stroke="black"
              strokeWidth={0.1}
            />
          ));
        }}
      </Geographies>

      {markers.map(({ name, city, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <g transform="translate(0, 10)">
            <circle r={4} fill="#E42A1D" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={-10}
              style={{
                fontFamily: "system-ui",
                fill: "black",
                fontSize: "8px",
              }}
            >
              {city}
            </text>
          </g>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default IndiaMap;

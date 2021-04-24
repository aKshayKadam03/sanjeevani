import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useSwr from "swr";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
const L = require("leaflet");
import styles from "../styles/Map.module.css";
import { useRouter } from "next/router";

const Map = () => {
  const [seeks, setSeeks] = React.useState([]);
  const [hosts, setHosts] = React.useState([]);
  const router = useRouter();
  // let storage = localStorage.getItem()

  const fetcher = (url) => {
    axios.get(url).then((res) => {
      setSeeks(res.data.data);
    });
  };
  useSwr("http://localhost:8080/seek/", fetcher);

  const fetcherTwo = (url) => {
    axios.get(url).then((res) => {
      setHosts(res.data.data);
    });
  };
  useSwr("http://localhost:8080/host/", fetcherTwo);

  const position = [21.146633, 79.08886];

  return (
    <div className={styles.Map}>
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGhlcmVhbGRydHJvbGwiLCJhIjoiY2tudXNmNmZjMGZ0cDJ1cm05OWJqd3F4eiJ9.ln3MWJpruxNHxuqSce56JA`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />

        {hosts.map((item) => (
          <Marker
            position={[
              item.location.coordinates[1],
              item.location.coordinates[0],
            ]}
            icon={L.icon({
              iconUrl: "/images/marker-icon.png",
              iconSize: [24, 32],
              iconAnchor: [10, 41],
            })}
          >
            <Popup className={styles.popup} iconAnchor={[10, 40]}>
              <div>{item.title}</div>
              <div>
                <button
                  onClick={() => router.push(`/hostcard/${item._id}`)}
                  className={styles.buttonOne}
                >
                  Ask for Help
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {seeks.map((item) => (
          <Marker
            className={styles.marker}
            position={[
              item.location.coordinates[1],
              item.location.coordinates[0],
            ]}
            icon={L.icon({
              iconUrl: "/images/marker2.png",
              iconSize: [28, 32],
              iconAnchor: [10, 41],
            })}
          >
            <Popup className={styles.popup} iconAnchor={[10, 40]}>
              <div>{item.title}</div>
              <div>
                <button
                  onClick={() => router.push(`/seekcard/${item._id}`)}
                  className={styles.buttonTwo}
                >
                  Provide Help
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

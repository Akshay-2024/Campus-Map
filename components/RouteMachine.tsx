"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

type Props = {
  start: [number, number] | null;
  end: [number, number] | null;
  setDistance: (distance: number) => void;
  setTime: (time: number) => void;
};

type RouteEvent = {
  routes: {
    summary: {
      totalDistance: number;
      totalTime: number;
    };
  }[];
};

export default function RouteMachine({
  start,
  end,
  setDistance,
  setTime,
}: Props) {
  const map = useMap();

  useEffect(() => {
    if (!start || !end) return;

    const routing = (L as unknown as {
      Routing: {
        control: (options: unknown) => L.Control & {
          on: (
            event: string,
            callback: (e: RouteEvent) => void
          ) => void;
        };
      };
    }).Routing;

    const routingControl = routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],

      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,

      lineOptions: {
        styles: [
          {
            color: "#2563eb",
            weight: 6,
            opacity: 0.9,
          },
        ],
      },

      createMarker: () => null,
    } as never);

    routingControl.on("routesfound", (e: RouteEvent) => {
      const route = e.routes[0];

      setDistance(route.summary.totalDistance);
      setTime(route.summary.totalTime);
    });

    routingControl.addTo(map);

    return () => {
  try {
    if (routingControl) {
      map.removeControl(routingControl);
    }
  } catch (err) {
    console.log("Routing cleanup skipped");
  }
};
  }, [map, start, end, setDistance, setTime]);

  return null;
}
"use client";

import { useEffect, useRef } from "react";
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
  routes: { summary: { totalDistance: number; totalTime: number } }[];
};

type RoutingControl = L.Control & {
  on: (event: string, cb: (e: RouteEvent) => void) => void;
};

export default function RouteMachine({ start, end, setDistance, setTime }: Props) {
  const map = useMap();
  const controlRef = useRef<RoutingControl | null>(null);

  useEffect(() => {
    // Always clean up previous control first
    if (controlRef.current) {
      try { map.removeControl(controlRef.current); } catch (_) {}
      controlRef.current = null;
    }

    // Only draw route when both points exist
    if (!start || !end) return;

    const Routing = (L as any).Routing;

    const control: RoutingControl = Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      lineOptions: {
        styles: [{ color: "#2563eb", weight: 6, opacity: 0.9 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      createMarker: () => null,
    });

    control.on("routesfound", (e: RouteEvent) => {
      setDistance(e.routes[0].summary.totalDistance);
      setTime(e.routes[0].summary.totalTime);
    });

    control.addTo(map);
    controlRef.current = control;

    // Cleanup on unmount or when deps change
    return () => {
      if (controlRef.current) {
        try { map.removeControl(controlRef.current); } catch (_) {}
        controlRef.current = null;
      }
    };
  }, [start?.[0], start?.[1], end?.[0], end?.[1]]);

  return null;
}
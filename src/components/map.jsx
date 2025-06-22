// components/Map.jsx
"use client"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState } from "react"

const containerStyle = {
  width: "100%",
  height: "400px",
}

export default function Map({ center, markers }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // set in .env.local
  })

  const [map, setMap] = useState(null)

  if (!isLoaded) return <p>Loading Map...</p>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={(map) => setMap(map)}
    >
      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position} />
      ))}
    </GoogleMap>
  )
}

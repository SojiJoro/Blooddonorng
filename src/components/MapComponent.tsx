"use client"

import React, { useEffect, useState, ChangeEvent } from "react"
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Droplet, MapPin, Hospital } from "lucide-react"
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png"
import iconUrl from "leaflet/dist/images/marker-icon.png"
import shadowUrl from "leaflet/dist/images/marker-shadow.png"

interface MapMarker {
  position: { lat: number; lng: number }
  title: string
  type: "donor" | "request" | "hospital"
}

interface MapComponentProps {
  markers?: MapMarker[]
  selectedLocation?: { lat: number; lng: number } | null
  height?: string
  width?: string
}

const nigerianHospitals = [
  { name: "Lagos University Teaching Hospital", position: { lat: 6.5169, lng: 3.3735 } },
  { name: "National Hospital Abuja",           position: { lat: 9.0579, lng: 7.4951 } },
  { name: "University College Hospital",       position: { lat: 7.4009, lng: 3.9047 } },
  { name: "Ahmadu Bello University Teaching Hospital", position: { lat: 11.1581, lng: 7.6489 } },
  { name: "University of Nigeria Teaching Hospital",     position: { lat: 6.4281, lng: 7.5422 } },
  { name: "University of Port Harcourt Teaching Hospital", position: { lat: 4.8996, lng: 6.9273 } },
  { name: "University of Benin Teaching Hospital",        position: { lat: 6.3350, lng: 5.6038 } },
  { name: "Aminu Kano Teaching Hospital",                 position: { lat: 12.0022, lng: 8.5920 } },
]

const nigerianCities = [
  { name: "Lagos",          position: { lat: 6.5244, lng: 3.3792 } },
  { name: "Abuja",          position: { lat: 9.0765, lng: 7.3986 } },
  { name: "Kano",           position: { lat: 12.0022, lng: 8.5920 } },
  { name: "Ibadan",         position: { lat: 7.3775, lng: 3.9470 } },
  { name: "Port Harcourt",  position: { lat: 4.8156, lng: 7.0498 } },
  { name: "Benin City",     position: { lat: 6.3350, lng: 5.6038 } },
  { name: "Enugu",          position: { lat: 6.4281, lng: 7.5422 } },
  { name: "Kaduna",         position: { lat: 10.5222, lng: 7.4383 } },
  { name: "Aba",            position: { lat: 5.1167, lng: 7.3667 } },
  { name: "Jos",            position: { lat: 9.8965, lng: 8.8583 } },
]

// fix Leaflet’s default icon paths
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

function MapUpdater({
  center,
  zoom,
}: {
  center: [number, number]
  zoom: number
}) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])
  return null
}

export function MapComponent({
  markers = [],
  selectedLocation = null,
  height = "400px",
  width = "100%",
}: MapComponentProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [selectedCity, setSelectedCity] = useState("Lagos")
  const [selectedHospital, setSelectedHospital] = useState("")

  const defaultCenter: [number, number] = [9.0820, 8.6753]
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter)
  const [mapZoom, setMapZoom] = useState(6)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => console.log("Error getting location")
      )
    }
  }, [])

  useEffect(() => {
    if (selectedLocation) {
      setMapCenter([selectedLocation.lat, selectedLocation.lng])
      setMapZoom(14)
    }
  }, [selectedLocation])

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const city = nigerianCities.find((c) => c.name === e.target.value)
    if (!city) return
    setSelectedCity(city.name)
    setMapCenter([city.position.lat, city.position.lng])
    setMapZoom(12)
  }

  const handleHospitalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const hospital = nigerianHospitals.find((h) => h.name === e.target.value)
    if (!hospital) return
    setSelectedHospital(hospital.name)
    setMapCenter([hospital.position.lat, hospital.position.lng])
    setMapZoom(15)
  }

  const colour: Record<MapMarker["type"], string> = {
    donor:   "#ef4444",
    request: "#3b82f6",
    hospital:"#10b981",
  }

  return (
    <div
      className="relative w-full rounded-md overflow-hidden bg-gray-100"
      style={{ height, width }}
    >
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      >
        <MapUpdater center={mapCenter} zoom={mapZoom} />
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <CircleMarker
            center={userLocation}
            pathOptions={{ color: "#4f46e5", fillColor: "#4f46e5" }}
            radius={8}
          >
            <Popup>Your Location</Popup>
          </CircleMarker>
        )}
        {markers.map((m, i) => (
          <CircleMarker
            key={i}
            center={[m.position.lat, m.position.lng]}
            pathOptions={{ color: colour[m.type], fillColor: colour[m.type] }}
            radius={8}
          >
            <Popup>{m.title}</Popup>
          </CircleMarker>
        ))}
        {nigerianHospitals.map((h, i) => (
          <CircleMarker
            key={i}
            center={[h.position.lat, h.position.lng]}
            pathOptions={{ color: colour["hospital"], fillColor: colour["hospital"] }}
            radius={8}
          >
            <Popup>{h.name}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <MapPin className="h-12 w-12 text-muted-foreground mb-2" />
        <p className="text-muted-foreground mb-4">
          Find blood donors and hospitals across Nigeria
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mb-6">
          <div>
            <label
              htmlFor="city"
              className="block text-sm text-gray-700 mb-1 text-left"
            >
              Select City
            </label>
            <select
              id="city"
              className="w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
              value={selectedCity}
              onChange={handleCityChange}
            >
              {nigerianCities.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="hospital"
              className="block text-sm text-gray-700 mb-1 text-left"
            >
              Select Hospital
            </label>
            <select
              id="hospital"
              className="w-full px-3 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
              value={selectedHospital}
              onChange={handleHospitalChange}
            >
              <option value="">Select a hospital</option>
              {nigerianHospitals.map((h) => (
                <option key={h.name}>{h.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="space-y-2 w-full max-w-xs mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm">Blood Donors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm">Blood Requests</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm">Hospitals & Donation Centers</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md">
            <Droplet className="mr-2 h-4 w-4" />
            Find Nearest Donor
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md">
            <Hospital className="mr-2 h-4 w-4" />
            Find Nearest Hospital
          </button>
        </div>
      </div>
    </div>
  )
}

export default MapComponent

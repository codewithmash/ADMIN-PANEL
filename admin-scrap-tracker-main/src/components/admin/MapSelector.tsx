// import { useState, useEffect, useRef } from 'react';
// import { Search, Map, MapPin } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';

// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// // interface MapSelectorProps {
// //   address: string;
// //   initialCoordinates?: string;
// //   onCoordinatesChange: (coordinates: string) => void;
// //   onAddressChange: (address: string) => void;
// //   apiKey: string; // Directly pass the API key
// // }

// // const MapSelector = ({ 
// //   address, 
// //   initialCoordinates, 
// //   onCoordinatesChange, 
// //   onAddressChange, 
// //   apiKey 
// // }: MapSelectorProps) => {
// //   const [searchQuery, setSearchQuery] = useState(address);
// //   const mapContainerRef = useRef<HTMLDivElement>(null);
// //   const mapRef = useRef<google.maps.Map | null>(null);
// //   const polygonRef = useRef<google.maps.Polygon | null>(null);
// //   const markersRef = useRef<google.maps.Marker[]>([]);

// //   // Initialize the map once the API key is set
// //   useEffect(() => {
// //     if (mapContainerRef.current) {
// //       // Load Google Maps script dynamically
// //       const script = document.createElement('script');
// //       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
// //       script.async = true;
// //       document.head.appendChild(script);

// //       window.initMap = () => {
// //         if (mapContainerRef.current) {
// //           const map = new google.maps.Map(mapContainerRef.current, {
// //             center: { lat: 18.5167, lng: 73.8567 },
// //             zoom: 15,
// //           });

// //           mapRef.current = map;

// //           // If initial coordinates are available, load the polygon
// //           if (initialCoordinates) {
// //             const coordinates = JSON.parse(initialCoordinates);
// //             const polygon = new google.maps.Polygon({
// //               paths: coordinates.map((coord: number[]) => ({ lat: coord[1], lng: coord[0] })),
// //               strokeColor: '#FF0000',
// //               strokeOpacity: 0.8,
// //               strokeWeight: 2,
// //               fillColor: '#FF0000',
// //               fillOpacity: 0.35,
// //             });
// //             polygon.setMap(map);
// //             polygonRef.current = polygon;
// //           }

// //           // Listen for clicks on the map to add points
// //           google.maps.event.addListener(map, 'click', (event) => {
// //             const latLng = event.latLng;
// //             addMarker(latLng);
// //           });
// //         }
// //       };
// //     }
// //   }, [apiKey, initialCoordinates]);

// //   // Handle adding marker and creating polygon
// //   const addMarker = (latLng: google.maps.LatLng) => {
// //     const marker = new google.maps.Marker({
// //       position: latLng,
// //       map: mapRef.current,
// //     });

// //     markersRef.current.push(marker);

// //     // Update polygon path
// //     const path = markersRef.current.map((marker) => marker.getPosition());
// //     if (polygonRef.current) {
// //       polygonRef.current.setPaths(path);
// //     }

// //     // Update coordinates in parent
// //     const coordinates = path.map((latLng) => [latLng.lng(), latLng.lat()]);
// //     onCoordinatesChange(JSON.stringify(coordinates));
// //   };

// //   const handleSearch = () => {
// //     onAddressChange(searchQuery);

// //     // Simulating geocoding search (use a real geocoding API in production)
// //     if (!initialCoordinates) {
// //       const dummyCoordinates = JSON.stringify([
// //         [73.856255, 18.516726],
// //         [73.856726, 18.516255],
// //         [73.857273, 18.516825],
// //         [73.856802, 18.517296],
// //         [73.856255, 18.516726],
// //       ]);
// //       onCoordinatesChange(dummyCoordinates);
// //     }
// //   };

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex gap-2">
// //         <Input
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           placeholder="Search for an address"
// //           className="flex-1"
// //         />
// //         <Button type="button" onClick={handleSearch}>
// //           <Search className="h-4 w-4 mr-1" />
// //           Search
// //         </Button>
// //       </div>
// //       <div
// //         ref={mapContainerRef}
// //         className="border rounded-md w-full h-[300px] flex items-center justify-center text-gray-500 p-4"
// //       >
// //         {/* Map will be initialized here */}
// //         Map loading...
// //       </div>
// //       <div className="text-sm text-gray-500">
// //         {initialCoordinates
// //           ? 'Existing polygon loaded. Click on the map to edit.'
// //           : 'Click on the map to create a polygon for this zone.'}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MapSelector;





// // interface MapSelectorProps {
// //   address: string;
// //   initialCoordinates?: string;
// //   onCoordinatesChange: (coordinates: string) => void;
// //   onAddressChange: (address: string) => void;
// //   apiKey: string; // Directly pass the API key
// // }

// // const MapSelector = ({ 
// //   address, 
// //   initialCoordinates, 
// //   onCoordinatesChange, 
// //   onAddressChange, 
// //   apiKey 
// // }: MapSelectorProps) => {
// //   const [searchQuery, setSearchQuery] = useState(address);
// //   const [mapMode, setMapMode] = useState<'user-select' | 'area-name'>('user-select');
// //   const [selectedAreaName, setSelectedAreaName] = useState('');
// //   const mapContainerRef = useRef<HTMLDivElement>(null);
// //   const mapRef = useRef<google.maps.Map | null>(null);
// //   const polygonRef = useRef<google.maps.Polygon | null>(null);
// //   const markersRef = useRef<google.maps.Marker[]>([]);

// //   // Initialize the map once the API key is set
// //   useEffect(() => {
// //     if (mapContainerRef.current) {
// //       // Load Google Maps script dynamically
// //       const script = document.createElement('script');
// //       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
// //       script.async = true;
// //       document.head.appendChild(script);

// //       window.initMap = () => {
// //         if (mapContainerRef.current) {
// //           const map = new google.maps.Map(mapContainerRef.current, {
// //             center: { lat: 18.5167, lng: 73.8567 },
// //             zoom: 15,
// //           });

// //           mapRef.current = map;

// //           // If initial coordinates are available, load the polygon
// //           if (initialCoordinates) {
// //             const coordinates = JSON.parse(initialCoordinates);
// //             const polygon = new google.maps.Polygon({
// //               paths: coordinates.map((coord: number[]) => ({ lat: coord[1], lng: coord[0] })),
// //               strokeColor: '#FF0000',
// //               strokeOpacity: 0.8,
// //               strokeWeight: 2,
// //               fillColor: '#FF0000',
// //               fillOpacity: 0.35,
// //             });
// //             polygon.setMap(map);
// //             polygonRef.current = polygon;
// //           }

// //           // Listen for clicks on the map to add points
// //           google.maps.event.addListener(map, 'click', (event) => {
// //             const latLng = event.latLng;
// //             addMarker(latLng);
// //           });
// //         }
// //       };
// //     }
// //   }, [apiKey, initialCoordinates]);

// //   // Handle adding marker and creating polygon
// //   const addMarker = (latLng: google.maps.LatLng) => {
// //     const marker = new google.maps.Marker({
// //       position: latLng,
// //       map: mapRef.current,
// //     });

// //     markersRef.current.push(marker);

// //     // Update polygon path
// //     const path = markersRef.current.map((marker) => marker.getPosition());
// //     if (polygonRef.current) {
// //       polygonRef.current.setPaths(path);
// //     }

// //     // Update coordinates in parent
// //     const coordinates = path.map((latLng) => [latLng.lng(), latLng.lat()]);
// //     onCoordinatesChange(JSON.stringify(coordinates));
// //   };

// //   const handleSearch = () => {
// //     onAddressChange(searchQuery);

// //     // Simulating geocoding search (use a real geocoding API in production)
// //     if (!initialCoordinates) {
// //       const dummyCoordinates = JSON.stringify([
// //         [73.856255, 18.516726],
// //         [73.856726, 18.516255],
// //         [73.857273, 18.516825],
// //         [73.856802, 18.517296],
// //         [73.856255, 18.516726],
// //       ]);
// //       onCoordinatesChange(dummyCoordinates);
// //     }
// //   };

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex gap-2">
// //         <Input
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           placeholder="Search for an address"
// //           className="flex-1"
// //         />
// //         <Button type="button" onClick={handleSearch}>
// //           <Search className="h-4 w-4 mr-1" />
// //           Search
// //         </Button>
// //       </div>
// //       <div
// //         ref={mapContainerRef}
// //         className="border rounded-md w-full h-[300px] flex items-center justify-center text-gray-500 p-4"
// //       >
// //         {/* Map will be initialized here */}
// //         Map loading...
// //       </div>
// //       <div className="text-sm text-gray-500">
// //         {initialCoordinates
// //           ? 'Existing polygon loaded. Click on the map to edit.'
// //           : 'Click on the map to create a polygon for this zone.'}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MapSelector;










// // import React, { useState, useEffect, useRef } from 'react';
// // import { Input } from './ui/input'; // Adjust path as per your project
// // import { Button } from './ui/button'; // Adjust path as per your project
// import {Eraser } from 'lucide-react'; // Assuming you use lucide-react for icons


// interface MapSelectorProps {
//   address: string;
//   initialCoordinates?: string;
//   onCoordinatesChange: (coordinates: string) => void;
//   onAddressChange: (address: string) => void;
//   apiKey: string; // Directly pass the API key
// }

// // Extend the Window interface to include initMap
// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }

// const MapSelector = ({
//   address,
//   initialCoordinates,
//   onCoordinatesChange,
//   onAddressChange,
//   apiKey,
// }: MapSelectorProps) => {
//   const [searchQuery, setSearchQuery] = useState(address);
//   // 'draw' mode for user drawing, 'display' for showing search results or initial polygon
//   const [mapMode, setMapMode] = useState<'draw' | 'display'>('display');
//   const [loadingMap, setLoadingMap] = useState(true);

//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const polygonRef = useRef<google.maps.Polygon | null>(null);
//   const markersRef = useRef<google.maps.Marker[]>([]);


  

//     if (!window.google) { // Only load if not already loaded
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry`; // Add geometry library for future use if needed
//       script.async = true;
//       document.head.appendChild(script);
//     }

//   // Function to initialize the map
//   const initMap = () => {
//     if (mapContainerRef.current) {
//       const map = new google.maps.Map(mapContainerRef.current, {
//         center: { lat: 18.5167, lng: 73.8567 }, // Default center (Pune, India)
//         zoom: 12,
//       });

//       mapRef.current = map;
//       setLoadingMap(false); // Map is loaded

//       // If initial coordinates are available, load the polygon
//       if (initialCoordinates) {
//         try {
//           const coordinates = JSON.parse(initialCoordinates);
//           if (Array.isArray(coordinates) && coordinates.length > 0) {
//             const path = coordinates.map((coord: number[]) => ({ lat: coord[1], lng: coord[0] }));
//             drawPolygon(path);
//             if (path.length > 0) {
//               const bounds = new google.maps.LatLngBounds();
//               path.forEach(coord => bounds.extend(coord));
//               map.fitBounds(bounds);
//             }
//           }
//         } catch (error) {
//           console.error("Error parsing initialCoordinates:", error);
//         }
//       }

//       // Add click listener for drawing mode
//       google.maps.event.addListener(map, 'click', (event) => {
//         if (mapMode === 'draw') {
//           addMarker(event.latLng);
//         }
//       });
//     }
//   };

//   // Effect to load Google Maps script
//   useEffect(() => {
//     // console.log("apiKey",apiKey)

//     if (!window.google) { // Only load if not already loaded
//       console.log("here")
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry`; // Add geometry library for future use if needed
//       script.async = true;
//       document.head.appendChild(script);

//       window.initMap = initMap; // Make initMap globally accessible
//     } else {
//       // console.log("init map")
//       initMap(); // If Google Maps is already loaded, just initialize
//     }

    

//     return () => {
//       // Cleanup: Remove the script if the component unmounts and it was added by this component
//       // This is a simplified cleanup; in a larger app, consider a more robust script loader
//       // if (window.initMap) {
//       //   delete window.initMap;
//       // }

//     };
//   }, [apiKey]); // Depend on apiKey to re-run if it changes

//   // Function to draw a polygon
//   const drawPolygon = (path: google.maps.LatLngLiteral[]) => {
//     if (polygonRef.current) {
//       polygonRef.current.setMap(null); // Remove existing polygon
//     }

//     const newPolygon = new google.maps.Polygon({
//       paths: path,
//       strokeColor: '#FF0000',
//       strokeOpacity: 0.8,
//       strokeWeight: 2,
//       fillColor: '#FF0000',
//       fillOpacity: 0.35,
//       map: mapRef.current,
//     });
//     polygonRef.current = newPolygon;

//     // Clear existing markers if we are redrawing from a path
//     markersRef.current.forEach(marker => marker.setMap(null));
//     markersRef.current = [];

//     // Add markers for each point in the polygon path
//     path.forEach(coord => {
//       const marker = new google.maps.Marker({
//         position: coord,
//         map: mapRef.current,
//         draggable: true, // Allow dragging markers to adjust polygon
//       });
//       markersRef.current.push(marker);

//       // Add listener for marker drag end
//       google.maps.event.addListener(marker, 'dragend', () => {
//         updatePolygonFromMarkers();
//       });
//     });
//   };

//   // Handle adding marker for drawing mode
//   const addMarker = (latLng: google.maps.LatLng) => {
//     const marker = new google.maps.Marker({
//       position: latLng,
//       map: mapRef.current,
//       draggable: true, // Allow dragging markers to adjust polygon
//     });

//     markersRef.current.push(marker);
//     updatePolygonFromMarkers();

//     // Add listener for marker drag end
//     google.maps.event.addListener(marker, 'dragend', () => {
//       updatePolygonFromMarkers();
//     });

//     // Add listener for right-click to remove marker
//     google.maps.event.addListener(marker, 'rightclick', () => {
//       marker.setMap(null);
//       markersRef.current = markersRef.current.filter(m => m !== marker);
//       updatePolygonFromMarkers();
//     });
//   };

//   // Update polygon based on current markers
//   const updatePolygonFromMarkers = () => {
//     const path = markersRef.current.map((marker) => marker.getPosition()?.toJSON() as google.maps.LatLngLiteral);

//     if (path.length > 2) { // Need at least 3 points to form a polygon
//       drawPolygon(path);
//       const coordinates = path.map((latLng) => [latLng.lng, latLng.lat]);
//       onCoordinatesChange(JSON.stringify(coordinates));
//     } else {
//       // If less than 3 points, remove the polygon
//       if (polygonRef.current) {
//         polygonRef.current.setMap(null);
//         polygonRef.current = null;
//       }
//       onCoordinatesChange(''); // Clear coordinates if no valid polygon
//     }
//   };


//   // Handle search (geocoding)
//   const handleSearch = () => {
//     onAddressChange(searchQuery);
//     setMapMode('display'); // Switch to display mode for search results

//     if (!mapRef.current) return;

//     const geocoder = new google.maps.Geocoder();
//     geocoder.geocode({ address: searchQuery }, (results, status) => {
//       if (status === 'OK' && results && results[0]) {
//         const location = results[0].geometry.location;
//         mapRef.current?.setCenter(location);
//         mapRef.current?.setZoom(15); // Zoom in on the location

//         // Clear existing polygon and markers
//         clearMap();

//         // If the place has a defined geometry (e.g., a city boundary), draw that
//         if (results[0].geometry.viewport) {
//           // For simplicity, we'll draw a rectangle around the viewport for now
//           // A more robust solution would use a Places API call for detailed boundaries
//           const ne = results[0].geometry.viewport.getNorthEast();
//           const sw = results[0].geometry.viewport.getSouthWest();
//           const polygonPath = [
//             { lat: ne.lat(), lng: sw.lng() }, // Top-left
//             { lat: ne.lat(), lng: ne.lng() }, // Top-right
//             { lat: sw.lat(), lng: ne.lng() }, // Bottom-right
//             { lat: sw.lat(), lng: sw.lng() }, // Bottom-left
//             { lat: ne.lat(), lng: sw.lng() }, // Close the loop
//           ];
//           drawPolygon(polygonPath);
//           const coordinates = polygonPath.map((latLng) => [latLng.lng, latLng.lat]);
//           onCoordinatesChange(JSON.stringify(coordinates));

//         } else if (results[0].geometry.location) {
//           // If no specific boundary, just place a marker
//           const marker = new google.maps.Marker({
//             map: mapRef.current,
//             position: location,
//             title: results[0].formatted_address,
//           });
//           markersRef.current.push(marker);
//           // If we just have a point, clear any previous polygon coordinates
//           onCoordinatesChange('');
//         }

//       } else {
//         alert('Geocode was not successful for the following reason: ' + status);
//         onCoordinatesChange(''); // Clear coordinates on failed search
//       }
//     });
//   };

//   // Clear map (polygon and markers)
//   const clearMap = () => {
//     if (polygonRef.current) {
//       polygonRef.current.setMap(null);
//       polygonRef.current = null;
//     }
//     markersRef.current.forEach(marker => marker.setMap(null));
//     markersRef.current = [];
//     onCoordinatesChange(''); // Clear coordinates in parent
//     setMapMode('draw'); // Switch to draw mode after clearing
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-2">
//         <Input
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search for an address"
//           className="flex-1"
//         />
//         <Button type="button" onClick={handleSearch} disabled={loadingMap}>
//           <Search className="h-4 w-4 mr-1" />
//           Search Place
//         </Button>
//         <Button type="button" onClick={() => { setMapMode('draw'); clearMap(); }} disabled={loadingMap}>
//           <Eraser className="h-4 w-4 mr-1" />
//           Mark Boundary
//         </Button>
//         {/* Only show Clear button if something is drawn or in draw mode */}
//         {(polygonRef.current || markersRef.current.length > 0 || mapMode === 'draw') && (
//           <Button type="button" onClick={clearMap} variant="outline" disabled={loadingMap}>
//             Clear
//           </Button>
//         )}
//       </div>
//       <div
//         ref={mapContainerRef}
//         className="border rounded-md w-full h-[300px] flex items-center justify-center text-gray-500 p-4"
//       >
//         {loadingMap ? 'Map loading...' : 'Map initialized. Click on "Mark Boundary" to draw, or "Search Place" to find a location.'}
//       </div>
//       <div className="text-sm text-gray-500">
//         {mapMode === 'draw'
//           ? 'Click on the map to add points and create a polygon. Right-click a marker to remove it. Drag markers to adjust.'
//           : initialCoordinates
//             ? 'Existing polygon loaded. Click "Mark Boundary" to draw a new one.'
//             : 'Search for a place above, or click "Mark Boundary" to draw a custom area.'}
//       </div>
//     </div>
//   );
// };

// export default MapSelector;





import { useState, useEffect, useRef } from 'react';
import { Search, Eraser } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface MapSelectorProps {
  address: string;
  initialCoordinates?: string;
  onCoordinatesChange: (coordinates: string) => void;
  onAddressChange: (address: string) => void;
  apiKey: string;
}

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const MapSelector = ({
  address,
  initialCoordinates,
  onCoordinatesChange,
  onAddressChange,
  apiKey,
}: MapSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState(address);
  const [mapMode, setMapMode] = useState<'draw' | 'display'>('display');
  const [loadingMap, setLoadingMap] = useState(false);
  const [mapError, setMapError] = useState('');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const drawPolygon = (path: google.maps.LatLngLiteral[]) => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }

    const newPolygon = new google.maps.Polygon({
      paths: path,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: mapRef.current,
    });
    polygonRef.current = newPolygon;

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    path.forEach(coord => {
      const marker = new google.maps.Marker({
        position: coord,
        map: mapRef.current,
        draggable: true,
      });
      markersRef.current.push(marker);

      google.maps.event.addListener(marker, 'dragend', () => {
        updatePolygonFromMarkers();
      });
    });
  };

  const addMarker = (latLng: google.maps.LatLng) => {
    const marker = new google.maps.Marker({
      position: latLng,
      map: mapRef.current,
      draggable: true,
    });

    markersRef.current.push(marker);
    updatePolygonFromMarkers();

    google.maps.event.addListener(marker, 'dragend', () => {
      updatePolygonFromMarkers();
    });

    google.maps.event.addListener(marker, 'rightclick', () => {
      marker.setMap(null);
      markersRef.current = markersRef.current.filter(m => m !== marker);
      updatePolygonFromMarkers();
    });
  };

  const updatePolygonFromMarkers = () => {
    const path = markersRef.current
      .map((marker) => marker.getPosition()?.toJSON())
      .filter(Boolean) as google.maps.LatLngLiteral[];

    if (path.length > 2) {
      drawPolygon(path);
      const coordinates = path.map((latLng) => [latLng.lng, latLng.lat]);
      onCoordinatesChange(JSON.stringify(coordinates));
    } else {
      if (polygonRef.current) {
        polygonRef.current.setMap(null);
        polygonRef.current = null;
      }
      onCoordinatesChange('');
    }
  };

  const handleSearch = () => {
    onAddressChange(searchQuery);
    setMapMode('display');

    if (!mapRef.current) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const location = results[0].geometry.location;
        mapRef.current?.setCenter(location);
        mapRef.current?.setZoom(15);

        clearMap();

        if (results[0].geometry.viewport) {
          const ne = results[0].geometry.viewport.getNorthEast();
          const sw = results[0].geometry.viewport.getSouthWest();
          const polygonPath = [
            { lat: ne.lat(), lng: sw.lng() },
            { lat: ne.lat(), lng: ne.lng() },
            { lat: sw.lat(), lng: ne.lng() },
            { lat: sw.lat(), lng: sw.lng() },
            { lat: ne.lat(), lng: sw.lng() },
          ];
          drawPolygon(polygonPath);
          const coordinates = polygonPath.map((latLng) => [latLng.lng, latLng.lat]);
          onCoordinatesChange(JSON.stringify(coordinates));
        } else if (results[0].geometry.location) {
          const marker = new google.maps.Marker({
            map: mapRef.current,
            position: location,
            title: results[0].formatted_address,
          });
          markersRef.current.push(marker);
          onCoordinatesChange('');
        }
      } else {
        alert('Geocode was not successful: ' + status);
        onCoordinatesChange('');
      }
    });
  };

  const clearMap = () => {
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    onCoordinatesChange('');
    setMapMode('draw');
  };

  const initMap = () => {
    try {
      // if (!mapContainerRef.current) return;

      // Check if map is already initialized to prevent re-initialization on re-renders
      // if (mapRef.current) {
      //   console.log("Map already initialized.");
      //   setLoadingMap(false);
      //   return;
      // }
      
      const map = new google.maps.Map(mapContainerRef.current, {
        center: { lat: 18.5167, lng: 73.8567 }, // Default center (Pune, India)
        zoom: 12,
      });

      mapRef.current = map;
      // setLoadingMap(false);
      // setMapError('');

      // if (mapRef.current) {
      //   console.log("Map already initialized.");
      //   setLoadingMap(false);
      //   return;
      // }

      if (initialCoordinates) {
        try {
          const coordinates = JSON.parse(initialCoordinates);
          if (Array.isArray(coordinates) && coordinates.length > 0) {
            const path = coordinates.map((coord: number[]) => ({ lat: coord[1], lng: coord[0] }));
            drawPolygon(path);
            if (path.length > 0) {
              const bounds = new google.maps.LatLngBounds();
              path.forEach(coord => bounds.extend(coord));
              map.fitBounds(bounds);
            }
          }
        } catch (error) {
          console.error("Error parsing initialCoordinates:", error);
          setMapError('Error loading initial coordinates.');
        }
      }

      google.maps.event.addListener(map, 'click', (event: google.maps.MapMouseEvent) => {
        if (mapMode === 'draw') {
          addMarker(event.latLng);
        }
      });

    } catch (error) {
      console.error("Error initializing map:", error);
      setLoadingMap(false);
      setMapError('Failed to load Google Maps. Please try again.');
    }
  };

  useEffect(() => {
    // Check if google maps script is already loaded
    if (window.google && window.google.maps) {
      initMap();
      return;
    }

    // Assign initMap to window for Google Maps callback
    window.initMap = initMap;

    // Check if script already exists to prevent duplicate appends
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js?key=${apiKey}"]`);
    if (existingScript) {
        setLoadingMap(false);
        console.log("Google Maps script already present.");
        return;
    }

    const script = document.createElement('script');
    console.log("Loading Google Maps with API Key:", apiKey);
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=geometry`;
    script.async = true;
    script.defer = true; // Added defer for potentially better performance in some scenarios
    script.onerror = () => {
      setLoadingMap(false);
      setMapError('Failed to load Google Maps script. Please check your API key.');
    };

    document.head.appendChild(script);

    return () => {
      // Clean up the global initMap function
      if (window.initMap) {
        delete window.initMap;
      }
      // Remove the script only if it was added by this component
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Also, destroy the map instance if it exists (helps with garbage collection)
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [apiKey]); // Dependency on apiKey is correct

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an address"
          className="flex-1"
        />
        <Button type="button" onClick={handleSearch} disabled={loadingMap}>
          <Search className="h-4 w-4 mr-1" />
          Search Place
        </Button>
        <Button 
          type="button" 
          onClick={() => { setMapMode('draw'); clearMap(); }} 
          disabled={loadingMap}
        >
          <Eraser className="h-4 w-4 mr-1" />
          Mark Boundary
        </Button>
        {(polygonRef.current || markersRef.current.length > 0 || mapMode === 'draw') && (
          <Button type="button" onClick={clearMap} variant="outline" disabled={loadingMap}>
            Clear
          </Button>
        )}
      </div>
      <div
        ref={mapContainerRef}
        className="border rounded-md w-full h-[300px] flex items-center justify-center text-gray-500 p-4"
      >
        {mapError ? (
          <div className="text-red-500">{mapError}</div>
        ) : loadingMap ? (
          'Loading map...'
        ) : (
          'Map initialized. Click on "Mark Boundary" to draw, or "Search Place" to find a location.'
        )}
      </div>
      <div className="text-sm text-gray-500">
        {mapMode === 'draw'
          ? 'Click on the map to add points and create a polygon. Right-click a marker to remove it. Drag markers to adjust.'
          : initialCoordinates
            ? 'Existing polygon loaded. Click "Mark Boundary" to draw a new one.'
            : 'Search for a place above, or click "Mark Boundary" to draw a custom area.'}
      </div>
    </div>
  );
};

export default MapSelector;
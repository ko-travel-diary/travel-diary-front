import React from 'react'
import { Map } from 'react-kakao-maps-sdk'

export default function Main() {
  return (
    <div>
        <Map center={{ lat: 37.5664056, lng: 126.9778222 }} style={{ width: "100%", height: "calc(100vh - 64px)" }}>
            
        </Map>
    </div>
  )
}

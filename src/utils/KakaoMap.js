/*global kakao*/ 
import React, { useEffect, useState } from 'react'



const Location=( {address} )=>{
  console.log(address);

  useEffect(()=>{
    var container = document.getElementById('map');

    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address , function(result, status){
      console.log(address);
      if(status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        var marker = new kakao.maps.Marker({
          map: map,
          position: coords
      });

    

      map.setCenter(coords);
      }

    });

    }, [address])


    return (
        <div>
        <div id="map" style={{width:"500px", height:"400px"}}></div>
       
        </div>
    )
}

export default Location;
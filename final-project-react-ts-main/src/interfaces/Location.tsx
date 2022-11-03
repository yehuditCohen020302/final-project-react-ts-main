import React from "react";


interface Location{
    manager_id: string; 
    system_id:string;
    location_geolocation:
        {lat:number,
         len:number};
    description:string;
    name: string;
    notes: string;
    // communication details (mail & phone) - if different then user details
    communication_details:{
        email:string;
        phone:string;
    };
}

export default Location;
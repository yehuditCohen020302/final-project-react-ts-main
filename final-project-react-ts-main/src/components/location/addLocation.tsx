 export interface Location {
    manager_id: string;
    system_id: string;
    location_geolocation:{
        lat: string;
        len: string;
    }
    description: string;
    name: string;
    notes: string;
    communicationDetails:{
        email: string;
        phone: string;
    }
   
}

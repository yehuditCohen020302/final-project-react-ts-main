import { CardContent, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import locationStore from "../../data/location";
import showLocationDetails from "../../data/location";


 function showLocation() { 
     let l ={
        address: "",
        owner:"",
        communication:"",
        details:"",
        notes:""
     }

     const [location, setLocation] = useState(l);
     const {id,name} =useParams();
    useEffect(() => {
        ShowDetails(id||'');
    }, []);

    const ShowDetails=async (id:string) => {
        
       const response= await locationStore.getLocationsBySystemId(id);
    //   setLocation(response);
        /////????
        }
     

    return (
            <Card  >
                {/* sx={{ maxWidth: 345 }} */}
        <CardContent>
        
       <img className='img'
                
                loading="lazy" height={"300"} width={"400"}></img>
            <form className='auth-inner'>
                <Typography >Location</Typography>
                <div className="mb-3">
                    <Typography >address:  {location.address}</Typography>
                </div>
                <div className="mb-3">
                    <Typography >owner:   {location.owner}</Typography>
                </div>
                <div className="mb-3">
                    <Typography >communication:   {location.communication}</Typography>
                </div>
                <div className="mb-3">
                    <Typography >details :   {location.details}</Typography>
                </div>
                <div className="mb-3">
                    <Typography >notes:   {location.notes}</Typography>
                </div>
            </form>
        </CardContent>
    </Card>
    );
}

export default observer(showLocation);
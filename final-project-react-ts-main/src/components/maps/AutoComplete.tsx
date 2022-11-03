import React, { useEffect, useState } from 'react';
// import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from "@reach/combobox";
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { TextField } from '@mui/material';
const values = ["Google, Breithaupt Street, Kitchener, ON, Canada", "Isabella", "Brasov", "Prosperity", "Jerusalem"];

type PlaceProps = {
    setOffice: (position: google.maps.LatLngLiteral) => void;
}
const AutoComplete = ({ setOffice }: PlaceProps) => {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();
    const [inputVal, setInputVal] = useState("");
    const center = { lat: 50.064192, lng: -130.605469  };
    const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
    };
    useEffect(() => {
        const input = document.getElementById("searchTextField") as HTMLInputElement;
        const options = {
            bounds: defaultBounds,
            componentRestrictions: { country: "us" },
            fields: ["address_components", "geometry", "icon", "name"],
            strictBounds: false,
            types: ["establishment"],
        };
        const autocomplete = new window.google.maps.places.Autocomplete(input, options);
        autocomplete.setFields(["place_id", "geometry", "name"]);
    }, []);
    
    const handleSelection = async (val: string) => {
    // const l= document.getElementById("searchTextField").value?document.getElementById("searchTextField").value:"";
        console.log(val) ;

        clearSuggestions();
        const result = await getGeocode({ address: val });

        console.log(result);

        const { lat, lng } = await getLatLng(result[0]);
        setOffice({ lat, lng });
    }
    return (
        <>
            <TextField fullWidth label="" id="searchTextField" placeholder="Where are you going?" 
            onChange={(e) => { setValue(e.target.value); }}/>
            <div id="search-overlay-search" className="search-input-overlay search">
                <button id="location-search-button" type='submit' 
                onClick={() => handleSelection(value)}>
                    <img className="icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/search/v11/24px.svg" alt="Search" />
                </button>
            </div>
        </>
    );
}
export default AutoComplete;
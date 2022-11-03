import React from "react";
import {useEffect, useState} from "react"
import User from "../interfaces/User";

import { observer } from "mobx-react";
import UserStore from '../data/user';

const List=()=>{
    
    const [users, setUsers] =useState<User[]>([]);

    useEffect(()=>{
       getAllUsers();
    } ,[]);

    const getAllUsers= async () =>{
        const data =await UserStore.get();
        console.log(data);
        setUsers(data);
    }
    
    const renderUser=(): JSX.Element[]=>{
        return users.map(user=>{
            return(
                <div>
                    <th>id: {user._id}</th>  
                    <tr>firstName: {user.firstName}</tr>
                    <tr>lastName: {user.lastName}</tr>
                    <tr>email: {user.email}</tr>
                    <br/>
                </div>
            )
        })
    }
   return(
    <ul>
        {renderUser()}
    </ul>
   )
};
export default observer(List) ;
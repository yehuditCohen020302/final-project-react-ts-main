
export enum Role{
    admin,
    manager,
    customer,
}
interface User {
    _id?: string,
    uid: string,
    role: Role;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    
}

export default User;
export enum status {
    SENT,PENDING,APPROVE,REJECT
}

interface Request{
    firstName:    string;
    lastName:     string;
    email:        string;
    phone:        string;
    system_id:    string;
    display_name: string;
    status:       status;
    notes:        string;
}
export default Request;
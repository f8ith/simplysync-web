import { useMemo } from "react";
import { useQuery as useUrqlQuery } from "urql";
import { useAuth } from "../components/Auth";

export const BookingQuery = `
    query ($gte: DateTime, $gt: DateTime, $lte: DateTime, $lt: DateTime) {
        bookings(where: {start_datetime: {gte: $gte, gt: $gt, lte: $lte, lt: $lt}}) {
            id
            code
            start_datetime
            end_datetime
            duration 
            service {
                id        
                name    
                price   
                currency
                is_active
                is_visible
                duration  
                capacity  
            } 
            service_id
            client {
                id    
                email 
                name  
                phone 
            } 
            client_id
        }
    }
`

export const useQuery = ({ query, variables, ...args }: {query: string, variables: any}) => {
    const {url} = useAuth()
    return useUrqlQuery({query: query, ...args, context: useMemo(() => ({ url: url + "/graphql" }), [])}
)}
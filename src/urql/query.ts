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
`;

export const UpdateProfileQuery = `
    mutation ($id: Int, $phone: String, $address: String) {
        updateUser(where: {id: $id}, data:{phone: {set: $phone}, address: {set: $address}}) {
            id
            gId
            email
            name
            phone
            address
            role
        }
    }
`;

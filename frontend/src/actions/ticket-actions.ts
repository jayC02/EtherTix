import { FETCH_ALL_TICKETS_REQUEST, FETCH_ALL_TICKETS_SUCCESS, FETCH_ALL_TICKETS_FAIL, FETCH_SINGLE_TICKET_REQUEST, FETCH_SINGLE_TICKET_SUCESS, FETCH_SINGLE_TICKET_FAIL } from './../constants/ticket-constants';
import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchAllTickets = (keyword = '', page = 1) => async (dispatch: any) => {

    try {

        dispatch({type: FETCH_ALL_TICKETS_REQUEST});

        const {data} = await axios.get(`http://localhost:5303/api/tickets?keyword=${keyword}`);

        console.log(`All Tickets : `, data.tickets);
        dispatch({type: FETCH_ALL_TICKETS_SUCCESS, payload: data.tickets});

    } 
    
    catch(error: any) {

        if(error) {
            console.log(`Fetch Event Tickets Fail : `, error);
            dispatch({type: FETCH_ALL_TICKETS_FAIL, payload: {error: error.response.data}  })
        }

    }


}

// @description: Returns a single ticket by its ID
// @parameters: Ticket ID

export const fetchTicketByID = (id: number) => async (dispatch: Dispatch): Promise<void> => {

       try {

           dispatch({type: FETCH_SINGLE_TICKET_REQUEST});
           const {data} = await axios.get(`http://localhost:5303/api/tickets/${id}`)

           dispatch({type: FETCH_SINGLE_TICKET_SUCESS, payload: {ticket: response.data}});
    } 
    
    catch(error: any) {

      if(error) {
          dispatch({type: FETCH_SINGLE_TICKET_FAIL, payload: error.response.data.message })
      }

    }

}

export const createTicket = ()

export const editTicketDetails = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    }
    
     catch(error) {

    }
}

export const deleteTicketByID = (id: string) => async (dispatch: Dispatch): Promise<void> => {
    try {

    }
}

export const deleteTickets = () => async (dispatch: Dispatch) => Promise<void> => {
    try {

    }
    
    catch(error) {

    }
}
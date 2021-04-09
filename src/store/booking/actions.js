import { createActions } from 'redux-actions';

import * as API from 'helpers/api';
const options = {
  prefix: 'BOOKING',
};

const bookingActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_BOOKING_PAYLOAD: undefined,
    SET_GUEST_CONTACT_INFORMATION: undefined,
    SET_BOOKING_HOTEL_PAYLOAD: undefined,
    SET_PAYMENT_TOKEN_PAYLOAD: undefined,
    REMOVE_ITINERARY_ITEM: undefined,
  },
  options,
);

const bookingHotel = (payload) => async (dispatch) => {
  try {
    const data = await API.bookingHotel(payload);
    console.log('booking action response', data)
    dispatch(bookingActions.setBookingHotelPayload(data));
  } catch (error) {
    dispatch(bookingActions.setFailure(error));
  }
};

export default {
  ...bookingActions,
  bookingHotel
};

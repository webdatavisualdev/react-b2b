import { handleActions } from 'redux-actions';
import bookingActions from 'store/booking/actions';

export const bookingReducer = handleActions(
  new Map([
    [
      bookingActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      bookingActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      bookingActions.setBookingPayload,
      (state, action) => ({
        ...state,
        loading: false,
        bookingPayload: action.payload,
      }),
    ],
    [
      bookingActions.setGuestContactInformation,
      (state, action) => ({
        ...state,
        loading: false,
        guestContactInformation: action.payload,
      }),
    ],
    [
      bookingActions.setBookingHotelPayload,
      (state, action) => ({
        ...state,
        loading: false,
        bookingHotelPayload: action.payload,
      }),
    ],
    [
      bookingActions.setPaymentTokenPayload,
      (state, action) => ({
        ...state,
        loading: false,
        paymentPayload: action.payload,
      }),
    ],
    [
      bookingActions.removeItineraryItem,
      (state, action) => {
        const newBookingPayload = {
          ...state.bookingPayload
        };

        newBookingPayload.room_rate.splice(
          action.payload, 1
        );

        return {
          ...state,
          loading: false,
          bookingPayload: newBookingPayload,
        };
      },
    ],
  ]),
  {
    loading: false,
    error: null,
    bookingPayload: null,
    guestContactInformation: null,
    bookingHotelPayload: null,
    paymentPayload: null,
  },
);

export default bookingReducer;

import { get } from "lodash";
import { ItineraryTypes } from "helpers/constants";
import { getRandomImageUrl } from "helpers/utils";

export const getLoading = (state) => state.booking.loading;
export const getBookingPayload = (state) => state.booking.bookingPayload;
export const getSelectedHotel = (state) => state.hotel.selectedHotel;
export const getPrimaryContact = (state) => state.booking.primaryContact;
export const getGuestContactInformation = (state) => state.booking.guestContactInformation;
export const getBookingHotelPayload = (state) => state.booking.bookingHotelPayload;
export const getPaymentPayload = (state) => state.booking.paymentPayload;
export const getTotalBookingAmount = (state) => {
  const bookings = getBookingPayload(state);
  const totalAmount = bookings
    ? (bookings.room_rate || []).reduce((acc, room) => {
        const amount = get(room, "roomDetails.total.amount", 0);
        return acc + Number(amount) * room.room_count;
      }, 0)
    : 0;

  return totalAmount;
};
export const getSelectedRoomItems = (state) => {
  const bookings = getBookingPayload(state);
  const selectedHotel = getSelectedHotel(state);
  let selectedRoomItems = [];

  if (bookings) {
    selectedRoomItems = bookings.room_rate.map((booking) => {
      const selectedRoom = selectedHotel.room_types.find(
        (room) => room.code === booking.code
      );
      const photos = selectedRoom?.photos || [];
      if (!photos.length) {
        photos.push(getRandomImageUrl());
      }

      return {
        ...selectedRoom,
        booking,
        photos,
        type: ItineraryTypes.Room,
        title: selectedRoom?.name,
      };
    });
  }

  return selectedRoomItems;
}

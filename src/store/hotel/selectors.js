
export const getFilteredHotels = (state) => state.hotel.filteredHotels;
export const getHotels = (state) => state.hotel.hotels;
export const getTotalCount = (state) => state.hotel.count;
export const getFilters = (state) => state.hotel.filters;
export const getLoading = (state) => state.hotel.loading;
export const getFetchingRecords = (state) => state.hotel.fetchingRecords;
export const getSelectedHotel = (state) => state.hotel.selectedHotel;
export const getvisibleHotels = (state) => state.hotel.visibleHotels;
export const getLocationData = (state) => state.hotel.locationData;
export const getTopFilters = (state) => state.hotel.topFilters;
export const getCancelLookupResponse = (state) => state.hotel.cancelLookupResponse;
export const getCancelOrderResponse = (state) => state.hotel.cancelOrderResponse;
export const getError = (state) => state.hotel.error;

import { createActions } from "redux-actions";
import moment from "moment";

import coreActions from 'store/core/actions';
import * as API from "helpers/api";
import { filterHotels, getVisibleHotels } from "helpers/utils";

const options = {
  prefix: "HOTELS",
};

const hotelActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    GET_HOTELS_DATA_REQUEST: undefined,
    GET_HOTELS_DATA_SUCCESS: undefined,
    SET_FILTERED_HOTELS: undefined,
    SET_PAGE: undefined,
    SET_PAGE_SIZE: undefined,
    SET_VISIBLE_HOTELS: undefined,
    SET_COUNT: undefined,
    UPDATE_FILTERS: undefined,
    SELECT_HOTEL: undefined,
    SET_TOP_FILTERS:undefined,
    CANCEL_LOOKUP_SUCCESS: undefined,
    CANCEL_ORDER_SUCCESS: undefined,
    CLEAR_STATE: undefined,
  },
  options
);

const onPageChange = (page, pageSize) => (dispatch, getState) => {
  const {
    hotel: { filteredHotels },
  } = getState();
  dispatch(hotelActions.setPage(page));
  dispatch(hotelActions.setPageSize(pageSize));
  const visibleHotels = getVisibleHotels(filteredHotels, page, pageSize);
  dispatch(hotelActions.setVisibleHotels(visibleHotels));
};

const topFilterData = (payload) => (dispatch, getState) =>{
  dispatch(hotelActions.setTopFilters(payload));
}



const onFilterChange = (changes) => (dispatch, getState) => {
  const {
    hotel: { hotels, page, pageSize, filters },
  } = getState();
  const updatedFilters = {
    ...filters,
    ...changes,
  };
  dispatch(hotelActions.updateFilters(updatedFilters));
  const filteredHotels = filterHotels(hotels, updatedFilters);
  dispatch(hotelActions.setFilteredHotels(filteredHotels));
  dispatch(hotelActions.setCount(filteredHotels.length));
  dispatch(onPageChange(page, pageSize));
};

const searchHotels = (requestObj) => async (dispatch, getState) => {
  try {
    dispatch(hotelActions.getHotelsDataRequest(true));

    let payload;
    if (requestObj) {
      payload = requestObj;
    } else {
      payload = {
        location_id: "5128581",
        start_date: moment().add(1, "day").format("YYYY-MM-DD"),
        end_date: moment().add(2, "day").format("YYYY-MM-DD"),
        occupancy: {
          adults: 2,
          children: 0,
        },
        language: "en",
      };
    }
    if (payload.currency) {
      dispatch(coreActions.setCurrency(payload.currency));
    } else {
      // use current state's currency
      const { core: { currency } } = getState();
      payload.currency = currency;
    }
    let data = await API.searchHotels(payload);
    dispatch(hotelActions.getHotelsDataSuccess(data));
    const filterObj = {};
    if(payload.hotel_id) {
      filterObj.hotel_id = payload.hotel_id
    }
    dispatch(onFilterChange(filterObj));
  } catch (error) {
    dispatch(hotelActions.setFailure(error));
  }
};

const searchHotelById = (id, searchData) => async (dispatch, getState) => {
  try {
    const {
      core: { currency },
    } = getState();

    dispatch(hotelActions.setLoading(true));
    const data = await API.searchHotelById(searchData);
    dispatch(hotelActions.selectHotel({ ...data, currency }));
  } catch (error) {
    dispatch(hotelActions.setFailure(error));
  }
};

const getLocationData = (payload) => async (dispatch, getState) => {
  const {
    core: { currency },
  } = getState();
  const data = await API.locations(payload, currency);
  return data;
};

const cancelLookup = (payload) => async (dispatch) => {
  try {
    dispatch(hotelActions.setLoading(true));
    const data = await API.cancelLookup(payload);
    dispatch(hotelActions.cancelLookupSuccess({ ...data, ...payload }));
  } catch (error) {
    dispatch(hotelActions.setFailure(error));
  }
};

const cancelOrder = (payload) => async (dispatch) => {
  try {
    dispatch(hotelActions.setLoading(true));
    const data = await API.cancelOrder(payload);
    dispatch(hotelActions.cancelOrderSuccess({ ...data, ...payload }));
  } catch (error) {
    dispatch(hotelActions.setFailure(error));
  }
};

export default {
  ...hotelActions,
  searchHotels,
  searchHotelById,
  onPageChange,
  onFilterChange,
  topFilterData,
  getLocationData,
  cancelLookup,
  cancelOrder,
};

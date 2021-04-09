import { handleActions } from "redux-actions";
import hotelActions from "store/hotel/actions";

export const hotelReducer = handleActions(
  new Map([
    [
      hotelActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      hotelActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        fetchingRecords: false,
        error: action.payload,
      }),
    ],
    [
      hotelActions.getHotelsDataRequest,
      (state, action) => ({
        ...state,
        loading: true,
        fetchingRecords: true,
        error: null,
        hotels: [],
        filteredHotels: [],
        visibleHotels: [],
      }),
    ],
    [
      hotelActions.getHotelsDataSuccess,
      (state, action) => ({
        ...state,
        loading: false,
        fetchingRecords: false,
        hotels: [...action.payload],
      }),
    ],
    [
      hotelActions.setFilteredHotels,
      (state, action) => ({
        ...state,
        loading: false,
        filteredHotels: [...action.payload],
      }),
    ],
    [
      hotelActions.setCount,
      (state, action) => ({
        ...state,
        count: action.payload,
      }),
    ],
    [
      hotelActions.setPage,
      (state, action) => ({
        ...state,
        page: action.payload,
      }),
    ],
    [
      hotelActions.setPageSize,
      (state, action) => ({
        ...state,
        pageSize: action.payload,
      }),
    ],
    [
      hotelActions.setVisibleHotels,
      (state, action) => ({
        ...state,
        visibleHotels: [...action.payload],
      }),
    ],
    [
      hotelActions.updateFilters,
      (state, action) => ({
        ...state,
        filters: action.payload,
      }),
    ],
    [
      hotelActions.setTopFilters,
      (state, action) => ({
        ...state,
        topFilters: action.payload
      }),
    ],
    [
      hotelActions.selectHotel,
      (state, action) => ({
        ...state,
        selectedHotel: action.payload,
        loading: false,
      }),
    ],
    [
      hotelActions.clearState,
      (state) => ({
        ...state,
        cancelLookupResponse: {},
        loading: false,
        cancelOrderResponse: {},
        error: ''
      })
    ],
    [
      hotelActions.cancelLookupSuccess,
      (state, action) => ({
        ...state,
        cancelLookupResponse: action.payload,
        loading: false,
      }),
    ],
    [
      hotelActions.cancelOrderSuccess,
      (state, action) => ({
        ...state,
        cancelOrderResponse: action.payload,
        loading: false,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    hotels: [],
    filteredHotels: [],
    filters: {},
    topFilters: {},
    count: 0,
    page: 1,
    pageSize: 10,
    visibleHotels: [],
    selectedHotel: null,
    cancelLookupResponse: {},
    cancelOrderResponse: {},
  }
);

export default hotelReducer;

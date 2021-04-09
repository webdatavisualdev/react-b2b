import { flatMapDeep } from 'lodash';
import popularBrandsJson from '../helpers/jsons/popular-brands';

export const getRandomImageUrl = (width = 500, height = 300) =>
  `http://placeimg.com/${width}/${height}/travel${(Math.random() * 10000).toFixed()}`;

export const filterHotels = (hotels, filters) => {
  let filteredHotels = hotels;
  if(filters.hotel_id) {
    filteredHotels = filteredHotels.filter(hotel => hotel.hotel_id === filters.hotel_id)
  }

  if (filters.keyword && filters.keyword !== '') {
    filteredHotels = filteredHotels.filter(hotel => {
      if (hotel.hotel_details && hotel.hotel_details.name && hotel.hotel_details.name.toLowerCase().indexOf(filters.keyword) >= 0)
        return true;
      if (hotel.hotel_details && hotel.hotel_details.description && hotel.hotel_details.description.toLowerCase().indexOf(filters.keyword) >= 0)
        return true;
      return false;
    });
  }

  if (filters.minPrice && filters.minPrice > 0) {
    filteredHotels = filteredHotels.filter(hotel => hotel.avg_nightly_rate >= filters.minPrice);
  }
  if(filters.location && filters.location !== ''){
    filteredHotels = filteredHotels.filter(hotel => hotel.hotel_details.address.city === filters.location);
  }

  if(filters.adult && filters.adult > 0) {
    filteredHotels = filteredHotels.filter(hotel => {
      for (let i = 0; i < hotel.room_types.length; i ++) {
        return hotel.room_types[i].capacity.adults >= filters.adult;
      }
      return false;
    });
  }
  if(filters.child && filters.child > 0) {
    filteredHotels = filteredHotels.filter(hotel => {
      for (let i = 0; i < hotel.room_types.length; i ++) {
        return hotel.room_types[i].capacity.child >= filters.child;
      }
      return false;
    });
  }
  if(filters.rooms && filters.rooms > 0) {
    filteredHotels = filteredHotels.filter(hotel => {
      for (let i = 0; i < hotel.room_types.length; i ++) {
        return hotel.room_types[i].capacity.num_rooms >= filters.rooms;
      }
      return false;
    });
  }

  if (filters.maxPrice) {
    filteredHotels = filteredHotels.filter(hotel => hotel.avg_nightly_rate <= filters.maxPrice);
  }
  if (filters.starRating && filters.starRating > 0) {
    filteredHotels = filteredHotels.filter(hotel => hotel.hotel_details.star_rating === filters.starRating);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filteredHotels = filteredHotels.filter(hotel => {
      for (let i = 0; i < filters.amenities.length; i ++) {

          if (hotel.hotel_details.amenities.indexOf(filters.amenities[i]) < 0) {
            return false;
          }

      }
      return true;
    });
  }
  if (filters.brands && filters.brands.length) {
    const brandsData = [];
    filters.brands.forEach(brand => brandsData.push(popularBrandsJson[brand]));
    filteredHotels = filteredHotels.filter(hotel => {
      const brandsDataAlias = flatMapDeep(brandsData);
      const chainCodes = brandsDataAlias.map(data => data.chainCode);
      const chainName = brandsDataAlias.map(data => data.chainName);
      return chainCodes.includes(hotel.hotel_details.chain_code) || chainName.includes(hotel.hotel_details.chain_name);
    });
  }
  return filteredHotels;
};

export const getVisibleHotels = (hotels, page, pageSize) => {
  return hotels.slice((page - 1) * pageSize, page * pageSize);
};

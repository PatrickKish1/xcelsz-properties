/**
 * Room Category enum
 * @typedef {'apartment' | 'house' | 'room' | 'studio'} RoomCategory
 */

/**
 * @typedef {Object} RoomPrice
 * @property {number} pricePerMonth - Monthly price
 * @property {number} [serviceCostsAndUtilities] - Additional services cost
 * @property {number} [deposit] - Deposit amount
 * @property {string} currency - Currency code (GHS, USD)
 */

/**
 * @typedef {Object} RoomAddress
 * @property {string} location - Specific location
 * @property {string} city - City
 * @property {string} region - Region
 * @property {string} country - Country
 */

/**
 * @typedef {Object} RoomAvailability
 * @property {string} status - 'available' | 'booked' | 'unavailable'
 * @property {string} availableFrom - Date from which the room is available
 */

/**
 * @typedef {Object} Room
 * @property {string} roomId - Unique identifier
 * @property {string} name - Name of the room
 * @property {string} description - Description
 * @property {RoomPrice} price - Price information
 * @property {string} posted - When the listing was posted
 * @property {string[]} images - Array of image URLs
 * @property {RoomAvailability} availability - Availability information
 * @property {RoomAddress} address - Address information
 * @property {RoomCategory} [roomCategory] - Type of room
 * @property {string[]} [amenities] - Amenities list
 * @property {number} [rating] - Rating score
 * @property {Object} [reviews] - Review information
 * @property {number} [capacity] - Maximum number of people
 */

// This file doesn't export anything, it's just for JSDoc typing
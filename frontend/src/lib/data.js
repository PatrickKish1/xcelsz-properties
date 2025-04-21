export const HERO_IMAGES = [
    "https://v17.angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
    "https://v17.angular.io/assets/images/tutorials/faa//brandon-griggs-wR11KBaB86U-unsplash.jpg",
    "https://v17.angular.io/assets/images/tutorials/faa//i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
  ];
  
  export const BENEFITS = [
    { 
      image: "/calendar.png", 
      title: "Flexible Booking", 
      description: "Choose your preferred duration of stay" 
    },
    { 
      image: "/money.png", 
      title: "Affordable Prices", 
      description: "Our prices are very kind to your budget"  
    },
    { 
      image: "/key-room.png", 
      title: "Access to fresh listings", 
      description: "Tenants can enjoy exclusive access to the latest property listings" 
    },
    { 
      image: "/gavel.png", 
      title: "Legal Assurance for Lease Agreements", 
      description: "To enhance peace of mind, the platform may offer legal assurance regarding lease agreements." 
    },
  ];
  
  // Dummy rooms data for the application
  export const dummyRooms = [
    {
      roomId: "room-1",
      name: "Modern Studio Apartment in Cantonments",
      description: "A beautiful modern studio apartment in the heart of Cantonments. Perfect for singles or couples looking for comfort and convenience.",
      price: {
        pricePerMonth: 1500,
        serviceCostsAndUtilities: 200,
        deposit: 1500,
        currency: "USD"
      },
      posted: "2 days ago",
      images: [
        "https://v17.angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        "https://v17.angular.io/assets/images/tutorials/faa//brandon-griggs-wR11KBaB86U-unsplash.jpg"
      ],
      availability: {
        status: "available",
        availableFrom: "Today"
      },
      address: {
        location: "Cantonments",
        city: "Accra",
        region: "Greater Accra",
        country: "Ghana"
      },
      roomCategory: "studio",
      amenities: ["WiFi", "Air Conditioning", "Kitchen", "Security"],
      rating: 4.8,
      capacity: 2
    },
    {
      roomId: "room-2",
      name: "Spacious 2-Bedroom in East Legon",
      description: "A spacious 2-bedroom apartment in the exclusive East Legon area. Features modern amenities and 24/7 security.",
      price: {
        pricePerMonth: 2000,
        serviceCostsAndUtilities: 300,
        deposit: 2000,
        currency: "USD"
      },
      posted: "1 week ago",
      images: [
        "https://v17.angular.io/assets/images/tutorials/faa//brandon-griggs-wR11KBaB86U-unsplash.jpg",
        "https://v17.angular.io/assets/images/tutorials/faa//i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg"
      ],
      availability: {
        status: "available",
        availableFrom: "Next month"
      },
      address: {
        location: "East Legon",
        city: "Accra",
        region: "Greater Accra",
        country: "Ghana"
      },
      roomCategory: "apartment",
      amenities: ["WiFi", "Air Conditioning", "Kitchen", "Security", "Swimming Pool", "Gym"],
      rating: 4.5,
      capacity: 4
    },
    {
      roomId: "room-3",
      name: "Cozy Single Room in Osu",
      description: "A cozy single room in the vibrant district of Osu. Close to restaurants, bars, and shopping centers.",
      price: {
        pricePerMonth: 5000,
        serviceCostsAndUtilities: 500,
        deposit: 5000,
        currency: "GHS"
      },
      posted: "3 days ago",
      images: [
        "https://v17.angular.io/assets/images/tutorials/faa//i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
        "https://v17.angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg"
      ],
      availability: {
        status: "available",
        availableFrom: "Next week"
      },
      address: {
        location: "Osu",
        city: "Accra",
        region: "Greater Accra",
        country: "Ghana"
      },
      roomCategory: "room",
      amenities: ["WiFi", "Shared Kitchen", "Security"],
      rating: 4.2,
      capacity: 1
    },
    {
      roomId: "room-4",
      name: "Luxury 3-Bedroom House in Airport Residential",
      description: "A luxurious 3-bedroom house in the prestigious Airport Residential area. Features premium finishes and a private garden.",
      price: {
        pricePerMonth: 3000,
        serviceCostsAndUtilities: 400,
        deposit: 3000,
        currency: "USD"
      },
      posted: "5 days ago",
      images: [
        "https://v17.angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        "https://v17.angular.io/assets/images/tutorials/faa//brandon-griggs-wR11KBaB86U-unsplash.jpg"
      ],
      availability: {
        status: "booked",
        availableFrom: "Not available"
      },
      address: {
        location: "Airport Residential",
        city: "Accra",
        region: "Greater Accra",
        country: "Ghana"
      },
      roomCategory: "house",
      amenities: ["WiFi", "Air Conditioning", "Full Kitchen", "Security", "Garden", "Parking"],
      rating: 4.9,
      capacity: 6
    },
    {
      roomId: "room-5",
      name: "Modern 1-Bedroom in Tema",
      description: "A modern 1-bedroom apartment in Tema. Ideal for professionals working in the industrial area.",
      price: {
        pricePerMonth: 1200,
        serviceCostsAndUtilities: 150,
        deposit: 1200,
        currency: "USD"
      },
      posted: "1 day ago",
      images: [
        "https://v17.angular.io/assets/images/tutorials/faa//brandon-griggs-wR11KBaB86U-unsplash.jpg",
        "https://v17.angular.io/assets/images/tutorials/faa//i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg"
      ],
      availability: {
        status: "available",
        availableFrom: "2 weeks"
      },
      address: {
        location: "Community 25",
        city: "Tema",
        region: "Greater Accra",
        country: "Ghana"
      },
      roomCategory: "apartment",
      amenities: ["WiFi", "Air Conditioning", "Kitchen", "Security", "Parking"],
      rating: 4.3,
      capacity: 2
    },
    {
      roomId: "room-6",
      name: "Studio Apartment in Kumasi",
      description: "A comfortable studio apartment in the heart of Kumasi. Close to public transportation and amenities.",
      price: {
        pricePerMonth: 3500,
        serviceCostsAndUtilities: 300,
        deposit: 3500,
        currency: "GHS"
      },
      posted: "4 days ago",
      images: [
        "https://v17.angular.io/assets/images/tutorials/faa//i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
        "https://v17.angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg"
      ],
      availability: {
        status: "available",
        availableFrom: "Today"
      },
      address: {
        location: "Ahodwo",
        city: "Kumasi",
        region: "Ashanti",
        country: "Ghana"
      },
      roomCategory: "studio",
      amenities: ["WiFi", "Air Conditioning", "Kitchenette", "Security"],
      rating: 4.0,
      capacity: 2
    }
  ];
  
  // Function to simulate fetching rooms from an API
  export const fetchRooms = () => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        resolve(dummyRooms);
      }, 1000);
    });
  };
  
  // Get a single room by ID
  export const fetchRoomById = (roomId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const room = dummyRooms.find(r => r.roomId === roomId);
        if (room) {
          resolve(room);
        } else {
          reject(new Error("Room not found"));
        }
      }, 800);
    });
  };
  
  // Get unique countries from rooms
  export const getCountries = () => {
    const countries = [...new Set(dummyRooms.map(room => room.address.country))];
    return countries;
  };
  
  // Get unique cities based on selected country
  export const getCities = (country) => {
    const filteredRooms = country 
      ? dummyRooms.filter(room => room.address.country === country)
      : dummyRooms;
    
    const cities = [...new Set(filteredRooms.map(room => room.address.city))];
    return cities;
  };
  
  // Get unique regions based on selected country and city
  export const getRegions = (country, city) => {
    let filteredRooms = dummyRooms;
    
    if (country) {
      filteredRooms = filteredRooms.filter(room => room.address.country === country);
    }
    
    if (city) {
      filteredRooms = filteredRooms.filter(room => room.address.city === city);
    }
    
    const regions = [...new Set(filteredRooms.map(room => room.address.region))];
    return regions;
  };
  
  // Get unique room categories
  export const getCategories = () => {
    const categories = [...new Set(dummyRooms.map(room => room.roomCategory).filter(Boolean))];
    return categories;
  };
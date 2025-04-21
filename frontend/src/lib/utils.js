import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// Format price in Ghana Cedis
export const formatPriceGh = (price) => {
    if (!price) return "GH₵ 0";
    
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^\d.]/g, '')) 
      : price;
    
    return `GH₵ ${numericPrice.toLocaleString('en-GH')}`;
  };
  
  // Format price in USD
  export const formatPriceUSD = (price) => {
    if (!price) return "$0";
    
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^\d.]/g, '')) 
      : price;
    
    return `$${numericPrice.toLocaleString('en-US')}`;
  };
  
  // Parse address from string to object
  export const parseAddress = (address) => {
    const parts = address.split(',').map(part => part.trim());
    
    if (parts.length >= 4) {
      return {
        location: parts[0],
        city: parts[1],
        region: parts[2],
        country: parts[parts.length - 1],
      };
    }
    
    return {
      location: parts[0] || "Unknown location",
      city: parts[1] || "Unknown city",
      region: parts[2] || "Unknown region",
      country: parts[3] || "Unknown country",
    };
  };
  
  // Format address object to string
  export const formatAddress = (address) => {
    if (!address) return "Location not specified";
    
    if (typeof address === 'object') {
      const parts = [
        address.location,
        address.city,
        address.region,
        address.country
      ].filter(Boolean);
      return parts.join(", ");
    }
  
    return "Location not specified";
  };
  
  // Format posted time
  export const formatPostedTime = (postedString) => {
    if (!postedString) return "Recently posted";
    if (postedString.includes("seconds") || postedString.includes("minutes")) {
      return "Just now";
    }
    return postedString;
  };
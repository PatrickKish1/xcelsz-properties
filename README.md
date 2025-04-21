# Property Listing Application - myrentfindr

A React-based property listing application that allows users to browse and book rental properties.

## Features

- Responsive landing page showcasing the benefits of the platform
- Property listing page with search and filtering options
- Filter properties by location (country, city, region) and property type
- Search properties by name or location
- Detailed property cards with key information

## Tech Stack

- React.js
- Material UI (MUI) Components
- Tailwind CSS for styling
- React Router for navigation

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation Steps

1. Clone the repository

   ```
   git clone https://github.com/yourusername/property-listing-app.git
   cd property-listing-app
   ```

2. Install dependencies

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Start the development server

   ```
   npm start
   ```

   or

   ```
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Page components
├── lib/             # Utilities and dummy data
├── assets/          # Static assets like images
├── App.jsx          # Main App component with routes
└── index.js         # Entry point
```

## Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`.

### Material UI Theme

The Material UI theme is customized in `src/App.jsx` to match the brand colors and typography.

## Deployment

### Build for Production

```
npm run build
```

or

```
yarn build
```

### Deploy to Vercel

1. Install Vercel CLI:

   ```
   npm install -g vercel
   ```

2. Deploy:
   ```
   vercel
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Project Link: [https://github.com/yourusername/property-listing-app](https://github.com/yourusername/property-listing-app)

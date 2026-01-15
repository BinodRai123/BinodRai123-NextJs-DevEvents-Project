# DevEvents

DevEvents is the hub for every developer to explore and book Hackathons, Meetups, and Conferences. It allows users to browse featured events, view detailed agendas, and book their spots.

## Tech Stack

This project is built using the following technologies:

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS** (v4)
- **MongoDB** (via Mongoose)
- **Cloudinary** (Image management)
- **TypeScript**

## Features

- **Event Listing**: Browse a curated list of developer events.
- **Event Details**: Comprehensive view including overview, agenda, organizer info, and similar events.
- **Booking System**: Simple booking workflow for users to join events.
- **Search**: Explore events easily.

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/BinodRai123/BinodRai123-NextJs-DevEvents-Project.git
cd nextjs-devents-projects
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following environment variables:

```env
# Database Connection
MONGODB_URI=your_mongodb_connection_string

# App Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000 OR YOUR DOMAIN URL

# Cloudinary Configuration
CLOUDINARY_URL=CLOUDINARY URL FROM CLOUDINARY WITH API KEY, API SECRET AND CLOUD NAME
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

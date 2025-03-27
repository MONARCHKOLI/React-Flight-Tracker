# ✈️ Flight Booking App  

A **React-based flight tracking and booking application** with a **local backend server**. Users can:  
✅ View **live flight details** in a **rolling slider UI**.  
✅ **Book seats** for flights with passenger details.  
✅ Store and manage bookings in **local storage**.  
✅ View and **edit/cancel bookings** in **My Bookings**.  

---

## 📌 Features  

### 🔍 Flight Tracking  
- Fetches **live flight data** from a **local server**.  
- Displays flights in a **scrolling slider UI**.  

### 🎟 Flight Booking  
- Users **search for flights** based on start and destination.  
- **Dynamic pricing formula**:  
  - If booking is within **5 days**, price = `5 × flight distance`.  
- **User details are saved in the local server**.  

### 📋 My Bookings  
- Users can **view, edit, or cancel** their bookings.  

---

## 🛠 Technologies Used  

| Tech | Purpose |
|------|---------|
| **React.js** | Frontend framework |
| **React Router** | Navigation between pages |
| **Context API** | State management |
| **Swiper.js** | Flight list slider effect |
| **Axios** | API requests |
| **LocalStorage** | Store booking data |
| **Express.js** | Local backend server |
| **JSON Server** | Mock API for development |

---

## 🚀 Setup & Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/yourusername/flight-booking-app.git
cd flight-booking-app
```

2️⃣ Install Dependencies

```
npm install
```

3️⃣ Start the Local Server

```
cd server
npm install
node server.js
```

📌 By default, the local server runs on `http://localhost:8080/.`

4️⃣ Start the Frontend App

```
npm run dev
```

## 📁 Project Structure
```
📦 flight-booking-app
 ┣ 📂 public
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 FlightList.jsx
 ┃ ┃ ┣ 📜 FlightDetail.jsx
 ┃ ┃ ┣ 📜 FlightBooking.jsx
 ┃ ┃ ┣ 📜 MyBookings.jsx
 ┃ ┣ 📂 context
 ┃ ┃ ┣ 📜 FlightContext.jsx
 ┃ ┣ 📂 styles
 ┃ ┃ ┣ 📜 FlightList.css
 ┃ ┃ ┣ 📜 FlightDetail.css
 ┃ ┃ ┣ 📜 MyBookings.css
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📜 flights.json
 ┃ ┣ 📜 App.js
 ┃ ┣ 📜 main.jsx
 ┣ 📂 server
 ┃ ┣ 📜 server.js  👈 **Local backend server**
 ┃ ┣ 📜 bookings.json  👈 **Stores user bookings**
 ┣ 📜 package.json
 ┣ 📜 README.md
 ```

 ## 🌐 Local API Setup (Backend Server)

 The server.js file handles API requests.

 1️⃣ API Endpoints

| Method | Endpoint | Description |
|----------|----------|----------|
| GET |	/flights |	Fetch all flight data
|GET	|/flights/:iata	|Get flight by IATA code
|POST	| /bookings	| Create a booking
|GET	| /bookings	| Get all user bookings
|PUT	| /bookings/:id	| Update a booking
|DELETE	| /bookings/:id	| Delete a booking


## 📸 Screenshots

🚀 Flight List (Slider UI)

🛫 Booking Page

📋 My Bookings Page

## 📌 How Bookings Are Stored

All bookings are saved in `bookings.json` using the local server.
Example POST request to book a flight:

```
{
  "id": "12345",
  "user": "John Doe",
  "flightIATA": "FY7170",
  "passengers": 2,
  "totalFare": 500,
  "bookingDate": "2025-03-26"
}
```

## 📞 Contact & Support


📧 Email: `monarchkoli12@gmail.com`

🐙 GitHub: `https://github.com/MONARCHKOLI/`

# Schedulink Frontend

A modern, responsive React frontend for the Schedulink appointment scheduling application.

## 🚀 Features

- **User Management**: Create and view users with full contact information
- **Appointment Slots**: Create and manage appointment slots with date/time selection
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Live updates when new users or slots are created
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **API Integration**: Seamless integration with FastAPI backend

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful, customizable SVG icons

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with navigation
│   │   ├── UserForm.jsx        # User creation form
│   │   ├── UsersList.jsx       # Display list of users
│   │   ├── SlotForm.jsx        # Appointment slot creation form
│   │   └── SlotsList.jsx       # Display list of appointment slots
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # React entry point
│   ├── axios.js               # Axios configuration
│   └── index.css              # Global styles and Tailwind imports
├── public/                    # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── Dockerfile               # Docker configuration
```

## 🏃‍♂️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐳 Docker Usage

### Build and run with Docker:

```bash
# Build the image
docker build -t schedulink-frontend .

# Run the container
docker run -p 3000:3000 schedulink-frontend
```

### Or use with Docker Compose (from project root):

```bash
docker compose up --build
```

## 🔧 Configuration

### Backend API URL

The frontend is configured to connect to the FastAPI backend at `http://localhost:8000`. 

To change this, edit the `baseURL` in `src/axios.js`:

```javascript
const api = axios.create({
  baseURL: 'http://your-backend-url:8000',
  // ... other config
});
```

### Environment Variables

Create a `.env` file in the frontend directory for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 📱 UI Components

### Forms
- **UserForm**: Create new users with name, email, and phone validation
- **SlotForm**: Create appointment slots with date/time selection and validation

### Data Display
- **UsersList**: Responsive table/card view of all users
- **SlotsList**: Responsive display of appointment slots with status indicators

### Features
- Form validation with error messages
- Loading states and error handling
- Responsive design for mobile and desktop
- Real-time refresh capabilities
- Professional styling with Tailwind CSS

## 🎨 Styling

The application uses Tailwind CSS with custom components defined in `src/index.css`:

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons  
- `.input-field` - Form input fields
- `.card` - Container cards
- `.table-header` - Table headers
- `.table-cell` - Table cells

## 🚀 Production Deployment

### Build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to cloud platforms:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **AWS S3**: Upload the `dist` folder contents
- **Docker**: Use the provided Dockerfile for containerized deployment

## 🤝 API Integration

The frontend integrates with the FastAPI backend through these endpoints:

- `POST /users` - Create new user
- `GET /users` - Fetch all users
- `POST /slots` - Create new appointment slot
- `GET /slots` - Fetch all appointment slots

API documentation is available at: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📝 License

This project is part of the Schedulink appointment scheduling system.


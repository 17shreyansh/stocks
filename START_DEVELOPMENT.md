# Stock Broker Dynamic Website - Development Setup

## Overview
This project has been converted to a dynamic website with a modern admin portal using Ant Design. The system includes:

- **Frontend**: React with dynamic content loading
- **Backend**: Node.js/Express with MongoDB
- **Admin Portal**: Ant Design interface for content management
- **File Management**: PDF upload/download with Multer
- **Authentication**: JWT-based admin authentication

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd fe
npm install
npm install concurrently --save-dev
```

### 2. Setup Environment

Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stockbroker
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

### 3. Setup Database

**Install MongoDB:**
- Download and install MongoDB Community Server
- Start MongoDB service

**Seed Database:**
```bash
cd backend
npm run seed
```

### 4. Start Development

**Option 1 - Start both servers:**
```bash
cd fe
npm run dev:full
```

**Option 2 - Start separately:**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd fe
npm run dev
```

## Access Points

- **Website**: http://localhost:3000
- **Admin Portal**: http://localhost:3000/admin
- **API**: http://localhost:5000/api

## Default Admin Credentials

- **Username**: admin
- **Password**: admin123

## Features

### Admin Portal Features
- **Dashboard**: Overview of pages, documents, and statistics
- **Page Management**: Edit homepage content dynamically
- **Document Management**: Upload, edit, delete PDF documents
- **User Authentication**: Secure login system

### Dynamic Content
- **Hero Section**: Editable title, description, buttons
- **About Section**: Editable story, milestones
- **Testimonials**: Add/edit client testimonials
- **Contact Info**: Editable contact details and team members
- **Documents**: Dynamic PDF management with categories

### Security Features
- JWT authentication
- File type validation (PDF only)
- File size limits
- Rate limiting
- CORS protection
- Helmet security headers

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register admin (restrict in production)
- `GET /api/auth/me` - Get current user

### Pages
- `GET /api/pages` - Get all pages
- `GET /api/pages/:name` - Get page by name
- `PUT /api/pages/:name` - Update page content
- `POST /api/pages` - Create new page

### Documents
- `GET /api/documents` - Get all documents (with filtering)
- `GET /api/documents/categories` - Get document categories
- `GET /api/documents/:id/download` - Download document
- `POST /api/documents` - Upload new document
- `PUT /api/documents/:id` - Update document metadata
- `DELETE /api/documents/:id` - Delete document

## File Structure

```
v4/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── uploads/         # File uploads directory
│   ├── scripts/         # Database seeding scripts
│   └── server.js        # Main server file
├── fe/
│   ├── src/
│   │   ├── admin/       # Admin portal components
│   │   ├── components/  # Website components
│   │   ├── pages/       # Website pages
│   │   └── utils/       # API utilities
│   └── package.json
└── START_DEVELOPMENT.md
```

## Customization

### Adding New Page Sections
1. Update `models/Page.js` schema
2. Add section to admin `PageEditor.jsx`
3. Update frontend components to use dynamic data

### Adding New Document Categories
1. Upload documents with new categories via admin
2. Categories are automatically populated

### Styling
- Frontend uses styled-components with theme
- Admin portal uses Ant Design components
- Responsive design for all screen sizes

## Production Deployment

1. **Environment Variables**: Update production values
2. **Database**: Use MongoDB Atlas or production MongoDB
3. **File Storage**: Consider cloud storage for uploads
4. **Security**: Change JWT secret, restrict admin registration
5. **Build**: Run `npm run build` in frontend directory

## Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running
2. **Port Conflicts**: Change ports in environment variables
3. **File Uploads**: Check upload directory permissions
4. **CORS Issues**: Update CORS origin for production

### Development Tips
- Use MongoDB Compass for database visualization
- Check browser console for frontend errors
- Monitor backend logs for API issues
- Use Postman for API testing

## Support

For issues or questions:
1. Check console logs for errors
2. Verify database connection
3. Ensure all dependencies are installed
4. Check file permissions for uploads directory
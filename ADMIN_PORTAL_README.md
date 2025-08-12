# 🏢 Focus Stock Brokers - Admin Portal

## 📋 Overview

A comprehensive, responsive admin portal for managing all aspects of the Focus Stock Brokers website. Built with React, Ant Design, and Node.js, featuring a modern design that matches your project theme.

## ✨ Features

### 🎯 Dashboard
- **Real-time Statistics**: Pages, documents, downloads count
- **Recent Activity**: Latest page updates and document uploads
- **Visual Analytics**: Beautiful cards with gradient designs
- **Quick Actions**: Direct access to most-used features

### 📄 Page Management
- **All Pages Covered**: Homepage, Downloads, Policies, Terms, Privacy, Refund, Grievance
- **Content Editing**: Rich text editing for all page content
- **SEO Management**: Meta titles, descriptions, keywords
- **Visibility Control**: Show/hide pages instantly
- **Responsive Preview**: See how changes look on different devices

### 🧩 Component Management
- **Complete Component Control**: Hero, About, Contact, Products, Testimonials, etc.
- **Visibility Toggles**: Show/hide any component
- **Content Editing**: Modify text, images, links for each component
- **Real-time Updates**: Changes reflect immediately on the website

### 👁️ Visibility Control Center
- **Centralized Management**: Control all pages, components, and features from one place
- **Bulk Operations**: Enable/disable multiple items at once
- **Status Overview**: See what's active/inactive at a glance
- **Feature Flags**: Control site-wide features like maintenance mode

### 📁 Document Management
- **File Upload**: Drag & drop document uploads
- **Categorization**: Organize documents by categories
- **Download Tracking**: Monitor download statistics
- **File Management**: Edit, delete, and organize files

### ⚙️ System Settings
- **General Settings**: Site name, contact info, business details
- **SEO Configuration**: Google Analytics, meta tags, search optimization
- **Email Settings**: SMTP configuration for notifications
- **Security Settings**: Password policies, session management
- **Feature Toggles**: Enable/disable site features

### 🔧 Advanced Features
- **Backup & Restore**: Create and restore system backups
- **Analytics Integration**: View website traffic and user behavior
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Matches your project's design system
- **Help Documentation**: Built-in help system with shortcuts

## 🎨 Design Features

### Modern UI/UX
- **Gradient Backgrounds**: Beautiful color gradients matching your theme
- **Glass Morphism**: Modern frosted glass effects
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Responsive Layout**: Adapts to all screen sizes
- **Professional Typography**: Clean, readable fonts

### Theme Integration
- **Color Scheme**: Uses your project's navy, gold, and blue colors
- **Typography**: Matches your Georgia/serif font family
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle depth and elevation
- **Border Radius**: Consistent rounded corners

## 📱 Responsive Design

### Mobile-First Approach
- **Collapsible Sidebar**: Slides in/out on mobile
- **Touch-Friendly**: Large buttons and touch targets
- **Optimized Tables**: Horizontal scrolling for data tables
- **Compact Forms**: Stacked form layouts on small screens
- **Mobile Navigation**: Hamburger menu and drawer navigation

### Breakpoints
- **Mobile**: < 768px - Stacked layout, collapsible sidebar
- **Tablet**: 768px - 1024px - Adaptive grid, medium spacing
- **Desktop**: > 1024px - Full layout, maximum features

## 🔐 Security Features

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Auto Logout**: Session timeout for security
- **Protected Routes**: All admin routes require authentication
- **Role-Based Access**: Different permission levels

### Data Protection
- **Input Validation**: All forms validate data
- **XSS Protection**: Sanitized inputs and outputs
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API request throttling

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- MongoDB running
- Admin user account created

### Installation
1. **Backend Setup**:
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend Setup**:
   ```bash
   cd fe
   npm install
   npm run dev
   ```

3. **Access Admin Portal**:
   - Navigate to `http://localhost:5173/admin`
   - Login with admin credentials

### Default Admin Account
- **Username**: admin
- **Password**: admin123
- **Note**: Change default credentials immediately

## 📊 API Endpoints

### Admin Routes
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET/PUT /api/admin/components` - Component management
- `GET/PUT /api/admin/settings` - System settings
- `POST /api/admin/backup` - Create backup
- `POST /api/admin/restore/:id` - Restore backup

### Page Routes
- `GET /api/pages` - List all pages
- `PUT /api/pages/:name` - Update page content
- `DELETE /api/pages/:name` - Delete page

### Document Routes
- `GET /api/documents` - List documents
- `POST /api/documents` - Upload document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

## 🎯 Usage Guide

### Managing Pages
1. Go to **Page Management** in sidebar
2. Click on any page card to edit
3. Modify content in the form
4. Use visibility toggle to show/hide
5. Save changes

### Managing Components
1. Navigate to **Component Management**
2. Toggle visibility with switches
3. Click **Edit Content** to modify
4. Update text, images, or settings
5. Changes apply immediately

### Controlling Visibility
1. Use **Visibility Control Center**
2. See all pages/components status
3. Use bulk enable/disable buttons
4. Individual toggles for fine control

### System Settings
1. Go to **Settings** page
2. Configure different sections:
   - General: Site info, contact details
   - SEO: Meta tags, analytics
   - Email: SMTP configuration
   - Features: Enable/disable features
   - Security: Password policies

## 🔧 Customization

### Adding New Pages
1. Update `pageConfig` in `PageManager.jsx`
2. Add route in `AdminApp.jsx`
3. Create backend API endpoint
4. Add to sidebar menu

### Adding New Components
1. Update `componentConfig` in `ComponentManager.jsx`
2. Add component data structure
3. Update backend storage
4. Add to sidebar menu

### Styling Changes
1. Modify `admin.css` for global styles
2. Update theme colors in component styles
3. Adjust responsive breakpoints
4. Customize animations and effects

## 📈 Performance

### Optimization Features
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Separate bundles for admin
- **Image Optimization**: Compressed uploads
- **Caching**: API response caching
- **Minification**: Production builds optimized

### Monitoring
- **Error Tracking**: Console error logging
- **Performance Metrics**: Load time monitoring
- **User Analytics**: Admin usage tracking
- **System Health**: Server status monitoring

## 🐛 Troubleshooting

### Common Issues
1. **Login Problems**: Check credentials and token expiry
2. **Upload Failures**: Verify file size and format
3. **Save Errors**: Check network connection and permissions
4. **Display Issues**: Clear browser cache and cookies

### Debug Mode
- Enable development mode for detailed error messages
- Check browser console for JavaScript errors
- Monitor network tab for API failures
- Use React DevTools for component debugging

## 🔄 Updates & Maintenance

### Regular Tasks
- **Backup Data**: Weekly automated backups
- **Update Dependencies**: Monthly security updates
- **Monitor Performance**: Daily health checks
- **Review Logs**: Weekly error log analysis

### Version Control
- All changes tracked in Git
- Feature branches for new development
- Production deployments tagged
- Rollback procedures documented

## 📞 Support

### Documentation
- **User Guide**: Step-by-step instructions
- **API Reference**: Complete endpoint documentation
- **Troubleshooting**: Common issues and solutions
- **FAQ**: Frequently asked questions

### Contact
- **Technical Support**: Available during business hours
- **Bug Reports**: Submit via GitHub issues
- **Feature Requests**: Contact development team
- **Training**: Available for new administrators

---

## 🎉 Congratulations!

You now have a fully functional, professional admin portal that provides complete control over your Focus Stock Brokers website. The portal is designed to be intuitive, powerful, and scalable for future needs.

**Key Benefits:**
- ✅ Complete website control
- ✅ Professional design
- ✅ Mobile responsive
- ✅ Secure and reliable
- ✅ Easy to use
- ✅ Scalable architecture

**Happy Managing! 🚀**
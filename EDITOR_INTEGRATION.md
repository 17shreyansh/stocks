# Editor.js Integration for Investor Charter

## Overview
Added a new "Rich Editor" content type to the Investor Charter admin page using Editor.js, providing full customization capabilities including images, tables, headers, lists, quotes, code blocks, and more.

## Features Added

### Frontend (Admin)
- **New Content Type**: Added "Rich Editor" option alongside existing "Text" and "List" types
- **Full Editor.js Integration**: Complete rich text editor with toolbar and inline editing
- **Image Upload**: Direct image upload capability within the editor
- **Table Support**: Create and edit tables directly in the editor
- **Rich Formatting**: Headers, paragraphs, lists, quotes, code blocks, links, embeds
- **Real-time Saving**: Editor content is automatically saved when changes are made

### Frontend (Display)
- **EditorRenderer Component**: Custom component to render Editor.js content on the frontend
- **Styled Output**: Properly styled rendering of all Editor.js block types
- **Responsive Design**: Editor content adapts to different screen sizes

### Backend
- **Updated Schema**: Content schema now supports 'editor' type in sections
- **Image Upload Routes**: New endpoints for handling image uploads
  - `POST /api/upload/image` - Upload images for Editor.js
  - `GET /api/upload/images/:filename` - Serve uploaded images
- **URL Fetching**: Basic URL metadata fetching for link previews
- **File Management**: Automatic file cleanup and security checks

## Editor.js Tools Included

1. **Header** - H2, H3, H4 headings
2. **Paragraph** - Rich text paragraphs with inline formatting
3. **List** - Ordered and unordered lists
4. **Image** - Image upload and display with captions
5. **Table** - Dynamic table creation and editing
6. **Quote** - Blockquotes with author attribution
7. **Delimiter** - Section dividers
8. **Code** - Code blocks with syntax highlighting
9. **Link** - Link tool with metadata fetching
10. **Embed** - YouTube and other embeds
11. **Marker** - Text highlighting
12. **Inline Code** - Inline code formatting

## File Structure

### New Files
- `fe/src/styles/editor.css` - Editor.js styling
- `backend/uploads/images/` - Directory for uploaded images

### Modified Files
- `fe/src/admin/components/InvestorCharterAdmin.jsx` - Added editor integration
- `fe/src/pages/InvestorCharter.jsx` - Added editor content rendering
- `backend/routes/upload.js` - Added image upload routes
- `backend/routes/content.js` - Updated schema to support editor type

## Usage

### Admin Interface
1. Navigate to Investor Charter admin page
2. Add a new section or edit existing section
3. Select "Rich Editor" from the Content Type dropdown
4. Use the rich text editor to create content:
   - Click the "+" button to add new blocks
   - Use inline toolbar for text formatting
   - Upload images by selecting the image tool
   - Create tables using the table tool
   - Add headers, lists, quotes, and other content types

### Content Types Available
- **Text**: Simple textarea input (existing)
- **List**: Bullet point list editor (existing)
- **Rich Editor**: Full Editor.js with all tools (new)

## API Endpoints

### Image Upload
```
POST /api/upload/image
Content-Type: multipart/form-data
Body: image file

Response:
{
  "success": 1,
  "file": {
    "url": "http://localhost:5000/uploads/images/img-123456789.jpg",
    "name": "original-filename.jpg",
    "size": 12345
  }
}
```

### Content Save/Retrieve
```
GET /api/content/investor-charter
POST /api/content/investor-charter
```

## Security Features
- File type validation for image uploads
- File size limits (5MB for images)
- Directory traversal protection
- Secure file serving with proper headers
- Authentication required for uploads

## Styling
- Custom CSS for Editor.js components
- Consistent with existing design theme
- Responsive layout
- Proper typography and spacing

## Browser Support
- Modern browsers supporting ES6+
- Chrome, Firefox, Safari, Edge
- Mobile responsive

## Future Enhancements
- Video upload support
- Advanced table features
- Custom block types
- Content versioning
- Collaborative editing
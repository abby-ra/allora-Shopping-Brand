# Allora Boutique - Shopping Website

A modern e-commerce platform for Allora Boutique featuring AI-powered product recommendations using CLIP image embeddings.

## Features

- 🛍️ **Modern E-commerce Interface**: Beautiful product listings and detail pages
- 🤖 **AI-Powered Recommendations**: CLIP model for intelligent similar product suggestions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Clean UI**: Inspired by modern boutique websites
- 🔐 **User Management**: Customer accounts and order tracking
- 📦 **Inventory Management**: Product catalog with detailed information

## Tech Stack

### Frontend
- **React** 18.2.0
- **React Router** for navigation
- **Axios** for API calls
- **React Icons** for UI elements

### Backend
- **Flask** 3.0.0 (Python web framework)
- **CLIP** (OpenAI's image embedding model)
- **PyTorch** for ML operations
- **SQLAlchemy** for database ORM
- **MySQL** (via PyMySQL) for data storage

### AI/ML
- **CLIP (ViT-B/32)**: Vision-language model for image understanding
- **Sentence Transformers**: For computing similarity scores
- **scikit-learn**: For cosine similarity calculations



## How AI Recommendations Work

The system uses OpenAI's CLIP (Contrastive Language-Image Pre-training) model:

1. **Image Embedding**: When a product is added, CLIP generates a 512-dimensional vector representing the image
2. **Storage**: The embedding is stored in the database alongside product data
3. **Similarity Search**: When viewing a product, the system:
   - Retrieves the product's embedding
   - Compares it with all other product embeddings using cosine similarity
   - Returns the top 4 most similar products
4. **Display**: Similar products are shown on the product detail page

## Adding Products with AI

To add products with automatic similar product detection:

## Future Enhancements

- [ ] Shopping cart functionality
- [ ] Payment gateway integration
- [ ] Order management dashboard
- [ ] Image upload functionality
- [ ] Search with filters
- [ ] Customer reviews and ratings
- [ ] Email notifications
- [ ] Admin panel for inventory management

## License

Private project for Allora Boutique

## Support

For any issues or questions, contact the development team.

import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import numpy as np
import json
from sklearn.metrics.pairwise import cosine_similarity
import os

class CLIPService:
    """
    Service for generating and comparing image embeddings using CLIP model.
    This enables AI-powered similar product recommendations.
    """
    
    def __init__(self, model_name="openai/clip-vit-base-patch32"):
        """Initialize CLIP model and processor."""
        print(f"Loading CLIP model: {model_name}...")
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = CLIPModel.from_pretrained(model_name).to(self.device)
        self.processor = CLIPProcessor.from_pretrained(model_name)
        self.model.eval()
        print(f"CLIP model loaded successfully on {self.device}")
    
    def generate_embedding(self, image_path):
        """
        Generate CLIP embedding for an image.
        
        Args:
            image_path (str): Path to the image file
            
        Returns:
            list: Normalized embedding vector
        """
        try:
            # Load and preprocess image
            image = Image.open(image_path).convert('RGB')
            inputs = self.processor(images=image, return_tensors="pt").to(self.device)
            
            # Generate embedding
            with torch.no_grad():
                image_features = self.model.get_image_features(**inputs)
                
            # Normalize the embedding
            embedding = image_features.cpu().numpy()[0]
            embedding = embedding / np.linalg.norm(embedding)
            
            return embedding.tolist()
        
        except Exception as e:
            print(f"Error generating embedding: {str(e)}")
            return None
    
    def find_similar_products(self, query_embedding, product_embeddings, top_k=4):
        """
        Find similar products based on embedding similarity.
        
        Args:
            query_embedding (list): Embedding of the query product
            product_embeddings (list): List of tuples (product_id, embedding)
            top_k (int): Number of similar products to return
            
        Returns:
            list: Product IDs of similar products
        """
        try:
            if not query_embedding or not product_embeddings:
                return []
            
            query_emb = np.array(query_embedding).reshape(1, -1)
            
            similarities = []
            for product_id, embedding_json in product_embeddings:
                try:
                    product_emb = np.array(json.loads(embedding_json)).reshape(1, -1)
                    similarity = cosine_similarity(query_emb, product_emb)[0][0]
                    similarities.append((product_id, similarity))
                except:
                    continue
            
            # Sort by similarity (descending) and get top_k
            similarities.sort(key=lambda x: x[1], reverse=True)
            
            # Return product IDs (excluding the query product itself if present)
            similar_ids = [pid for pid, _ in similarities[1:top_k+1]]
            
            return similar_ids
        
        except Exception as e:
            print(f"Error finding similar products: {str(e)}")
            return []
    
    def process_product_image(self, image_path):
        """
        Process a product image and return its embedding as JSON string.
        
        Args:
            image_path (str): Path to the product image
            
        Returns:
            str: JSON string of the embedding vector
        """
        embedding = self.generate_embedding(image_path)
        if embedding:
            return json.dumps(embedding)
        return None

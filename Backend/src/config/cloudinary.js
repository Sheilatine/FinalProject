// ROLE: Configures Cloudinary for storing profile pictures, task images and anything image related

// Import the Cloudinary SDK and use the v2 API version
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with credentials from your .env file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
    secure: true                                    // Ensures HTTPS URLs for security
});


// Helper function to upload an image to Cloudinary
const uploadImage = async (filePath, folder = 'neurafund') => {
    try {
        // Upload the image using Cloudinary's uploader
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,               // Organize images under a specific folder
            resource_type: "auto",        // Auto-detect if it's an image, video, etc.
            transformation: [             // Apply transformations to optimize the image
                { width: 1000, crop: "limit" }, // Resize image to max width of 1000px
                { quality: "auto" }             // Automatically adjust image quality
            ]
        });

        // Return the secure URL and public ID of the uploaded image
        return {
            url: result.secure_url,       // HTTPS link to the image
            publicId: result.public_id    // Unique ID used for future reference (e.g., deletion)
        };
    } catch (error) {
        // Throw a generic error if upload fails
        throw new Error("Image upload failed");
    }
};


// Helper function to delete an image from Cloudinary
const deleteImage = async (publicId) => {
    try {
        // Delete the image using its public ID
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        // Log any errors that occur during deletion
        console.error('Error deleting image:', error);
    }
};


// Export the configured Cloudinary instance and helper functions
module.exports = { cloudinary, uploadImage, deleteImage };
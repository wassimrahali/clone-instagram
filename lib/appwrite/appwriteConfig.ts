// Import statements for ES modules
import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

// Configuration object
export const appwriteConfig = {
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_HOST_URL as string,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
    // apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID as string,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID as string,
    savesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID as string,
    postCollectionId: process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID as string,
  },
};

// Initialize the client
const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL as string) // API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string) // Project ID


// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

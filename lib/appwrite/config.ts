import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  appwrite: {
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_HOST_URL as string,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
    apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string,
  },
}

const client = new Client();
client.setEndpoint(appwriteConfig.appwrite.endpoint); 
client.setProject(appwriteConfig.appwrite.projectId);  


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

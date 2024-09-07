import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./appwriteConfig";
import { URL } from "url";
import { Query } from 'appwrite'; // Ensure Query is correctly imported

export async function createUserAccount(user: INewUser) {
  try {
    // Create new account
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Failed to create account");

    // Generate avatar URL from initials
    const avatarUrl = avatars.getInitials(user.name);

    // Save the new user to the database
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.appwrite.databaseId, // Database ID
      appwriteConfig.appwrite.userCollectionId, // Collection ID
      ID.unique(), // Unique Document ID
      user
    );
    return newUser;
  } catch (error) {
    throw error; // Re-throw the error to be handled upstream
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    // Fetch the current account
    const currentAccount = await account.get();
    
    // If no account is found, throw an error
    if (!currentAccount) throw new Error("No current account found");

    // Fetch the current user document
    const currentUser = await databases.listDocuments(
      appwriteConfig.appwrite.databaseId, // Database ID
      appwriteConfig.appwrite.userCollectionId, // Collection ID
      [Query.equal('accountId', currentAccount.$id)] // Query condition
    );

    // If no user document is found, throw an error
    if (!currentUser.documents || currentUser.documents.length === 0) {
      throw new Error("No user document found");
    }

    // Return the first user document (assuming there's only one match)
    return currentUser.documents[0];
    
  } catch (error) {
    console.log(error);
    // Optionally re-throw the error or return null/undefined if needed
    throw error;
  }
}


import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./appwriteConfig";
import { Query } from 'appwrite';

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Failed to create account");

    const avatarUrl: string = avatars.getInitials(user.name).toString();

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user account:", error);
    throw error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: string;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.appwrite.databaseId,
      appwriteConfig.appwrite.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.error("Error saving user to DB:", error);
    throw error;
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
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    
    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.appwrite.databaseId,
      appwriteConfig.appwrite.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser.documents || currentUser.documents.length === 0) {
      throw new Error("No user document found");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

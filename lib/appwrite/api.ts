import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./appwriteConfig";
import { URL } from "url";

export async function createUserAccount(user: INewUser) {
  try {
    // Create new account
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
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




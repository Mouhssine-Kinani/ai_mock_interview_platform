"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;


// There was an error: FirebaseError: Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.).
export async function SignUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection("user").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    await db.collection("user").doc(uid).set({
      name,
      email,
    });
    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error: any) {
    console.log("Error creating a user", error);
    if (error.code === "auth/email-alrady-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Please sign up.",
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.log("Error signing in", error);
    return {
      success: false,
      message: "Something went wrong, try again",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000, // 7 days
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookiesStore = await cookies();
  const sessionCookie = cookiesStore.get("session")?.value;
  if (!sessionCookie) return null;
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection("user").doc(decodedClaims.uid).get();
    if (!userRecord.exists) return null;
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log("Error getting current user", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user; // true if user is authenticated, false if not
}

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy('createdAt','desc')
    .get();
  return interviews.docs.map((doc)=>({
    id:doc.id,
    ...doc.data()
  })) as Interview[]
}
export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  const {userId , limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy('createdAt','desc')
    .where("finalized", "==", true)
    .where("userId", '!=', userId)
    .limit(limit)
    .get();
  return interviews.docs.map((doc)=>({
    id:doc.id,
    ...doc.data()
  })) as Interview[]
}

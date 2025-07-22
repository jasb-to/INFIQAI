import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

// Sample users data
const users = [
  {
    email: "admin@infiqai.com",
    password: "admin123",
    name: "Admin User",
    plan: "enterprise",
    scansRemaining: 999999,
  },
  {
    email: "user@example.com",
    password: "user123",
    name: "Demo User",
    plan: "free",
    scansRemaining: 3,
  },
  {
    email: "pro@example.com",
    password: "pro123",
    name: "Pro User",
    plan: "pro",
    scansRemaining: 476,
  },
]

// Sample scans data
const scans = [
  {
    fileName: "Financial Report Q2.pdf",
    fileType: "application/pdf",
    fileSize: 2500000,
    status: "completed",
    piiCount: 5,
    complianceScore: 85,
    issues: ["Potential PII in section 3", "Missing compliance statement"],
    recommendations: ["Review section 3 for personal information", "Add required compliance statement"],
  },
  {
    fileName: "Patient Records.docx",
    fileType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileSize: 1800000,
    status: "completed",
    piiCount: 12,
    complianceScore: 68,
    issues: ["Multiple PII instances detected", "HIPAA compliance issues in section 2"],
    recommendations: ["Redact patient identifiers", "Update HIPAA compliance statements"],
  },
  {
    fileName: "Contract Agreement.pdf",
    fileType: "application/pdf",
    fileSize: 3200000,
    status: "completed",
    piiCount: 2,
    complianceScore: 92,
    issues: ["Minor PII in signature section"],
    recommendations: ["Consider anonymizing signatures"],
  },
]

// Seed the database
async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Create users and their documents
    for (const userData of users) {
      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
        const user = userCredential.user

        // Update profile with name
        await updateProfile(user, { displayName: userData.name })

        // Create user document in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: userData.name,
          email: userData.email,
          createdAt: serverTimestamp(),
          plan: userData.plan,
          scansRemaining: userData.scansRemaining,
        })

        console.log(`Created user: ${userData.email}`)

        // Create sample scans for this user
        if (userData.email !== "admin@infiqai.com") {
          for (const scanData of scans) {
            const scanRef = doc(collection(db, "scans"))
            await setDoc(scanRef, {
              ...scanData,
              userId: user.uid,
              createdAt: serverTimestamp(),
              fileUrl: "https://example.com/sample.pdf", // Placeholder URL
            })
            console.log(`Created scan: ${scanData.fileName} for user: ${userData.email}`)
          }
        }
      } catch (error) {
        console.error(`Error creating user ${userData.email}:`, error)
      }
    }

    console.log("Database seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    process.exit()
  }
}

// Run the seeding function
seedDatabase()

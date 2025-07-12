<artifacts>
<artifact identifier="firebase-service-file" type="application/vnd.ant.code" language="javascript" title="📁 src/services/firebase.js - Copia questo codice completo">
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc,
  addDoc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
// 🔥 Firebase Configuration
const firebaseConfig = {
apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
appId: process.env.REACT_APP_FIREBASE_APP_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// === ASSISTITI SERVICE ===
export const assistitiService = {
async getAll() {
try {
const q = query(collection(db, 'assistiti'), orderBy('createdAt', 'desc'))
const querySnapshot = await getDocs(q)
return querySnapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}))
} catch (error) {
console.error('Error fetching assistiti:', error)
return []
}
},
async save(assistito) {
try {
const docData = {
...assistito,
updatedAt: serverTimestamp(),
createdAt: assistito.createdAt || serverTimestamp()
};
  if (assistito.id) {
    const docRef = doc(db, 'assistiti', assistito.id.toString())
    await setDoc(docRef, docData, { merge: true })
    return { ...assistito, id: assistito.id }
  } else {
    const docRef = await addDoc(collection(db, 'assistiti'), docData)
    return { ...assistito, id: docRef.id }
  }
} catch (error) {
  console.error('Error saving assistito:', error)
  throw error
}
},
async updateFascicolo(assistitoId, fascicolo) {
try {
const docRef = doc(db, 'assistiti', assistitoId.toString())
await updateDoc(docRef, {
fascicolo,
updatedAt: serverTimestamp()
})
} catch (error) {
console.error('Error updating fascicolo:', error)
throw error
}
},
async addDiarioEntry(assistitoId, entry) {
try {
const docRef = doc(db, 'assistiti', assistitoId.toString())
const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const assistito = docSnap.data()
    const diario_entries = assistito.diario_entries || []
    
    const newEntry = {
      ...entry,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    
    diario_entries.push(newEntry)
    
    await updateDoc(docRef, {
      diario_entries,
      updatedAt: serverTimestamp()
    })
    
    return diario_entries
  }
} catch (error) {
  console.error('Error adding diario entry:', error)
  throw error
}
}
}
// === OPERATORI SERVICE ===
export const operatoriService = {
async getAll() {
try {
const querySnapshot = await getDocs(collection(db, 'operatori'))
return querySnapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}))
} catch (error) {
console.error('Error fetching operatori:', error)
return []
}
},
async save(operatore) {
try {
const docRef = doc(db, 'operatori', operatore.id.toString())
await setDoc(docRef, {
...operatore,
updatedAt: serverTimestamp()
}, { merge: true })
} catch (error) {
console.error('Error saving operatore:', error)
throw error
}
},
async updateFascicolo(operatoreId, fascicolo) {
try {
const docRef = doc(db, 'operatori', operatoreId.toString())
await updateDoc(docRef, {
fascicolo,
updatedAt: serverTimestamp()
})
} catch (error) {
console.error('Error updating operatore fascicolo:', error)
throw error
}
}
}
// === FILE STORAGE SERVICE ===
export const fileService = {
async uploadOperatorFile(operatoreId, file, type) {
try {
const path = operatori/${operatoreId}/${type}/${Date.now()}_${file.name}
const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  
  return {
    url: downloadURL,
    path: snapshot.ref.fullPath,
    name: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString()
  }
} catch (error) {
  console.error('Error uploading operator file:', error)
  throw error
}
},
async uploadFascicoloFile(assistitoId, file, category) {
try {
const path = assistiti/${assistitoId}/fascicolo/${category}/${Date.now()}_${file.name}
const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  
  return {
    url: downloadURL,
    path: snapshot.ref.fullPath,
    name: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString()
  }
} catch (error) {
  console.error('Error uploading fascicolo file:', error)
  throw error
}
},
async deleteFile(path) {
try {
const storageRef = ref(storage, path)
await deleteObject(storageRef)
return true
} catch (error) {
console.error('Error deleting file:', error)
throw error
}
}
}
// === INITIALIZATION ===
export const initializeFirebase = async () => {
try {
await getDocs(collection(db, 'test'))
console.log('✅ Firebase connesso con successo!')
return true
} catch (error) {
console.error('❌ Errore connessione Firebase:', error)
return false
}
}
</artifact>
</artifacts>

import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

/**
 * Service to handle Firebase Storage operations
 */

export const getFilesList = async (customerName, productName, folderType) => {
  const folderPath = `customers/${customerName}/${productName}/${folderType}/`;
  const folderRef = ref(storage, folderPath);
  
  try {
    const result = await listAll(folderRef);
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url,
          fullPath: itemRef.fullPath,
          ref: itemRef
        };
      })
    );
    return files;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      return []; // Folder might not exist yet
    }
    console.error("Error fetching files:", error);
    throw error;
  }
};

export const uploadFile = (customerName, productName, folderType, file, progressCallback) => {
  return new Promise((resolve, reject) => {
    const filePath = `customers/${customerName}/${productName}/${folderType}/${file.name}`;
    const storageRef = ref(storage, filePath);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progressCallback) progressCallback(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ url: downloadURL, name: file.name, fullPath: filePath });
      }
    );
  });
};

export const deleteFile = async (fullPath) => {
  const fileRef = ref(storage, fullPath);
  await deleteObject(fileRef);
};

// Functions to help discover structure (customers, products)
// Note: recursive listing is limited in client-side Firebase, this is a basic flat approach.
export const getCustomers = async () => {
  const rootRef = ref(storage, 'customers/');
  try {
    const result = await listAll(rootRef);
    return result.prefixes.map((folderRef) => folderRef.name);
  } catch (error) {
    console.error("Error listing customers:", error);
    return [];
  }
};

export const getProductsForCustomer = async (customerName) => {
  const customerRef = ref(storage, `customers/${customerName}/`);
  try {
    const result = await listAll(customerRef);
    return result.prefixes.map((folderRef) => folderRef.name);
  } catch (error) {
    console.error("Error listing products:", error);
    return [];
  }
};

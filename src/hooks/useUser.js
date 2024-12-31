import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import Swal from "sweetalert2";
import { db } from '../firebase';

const useUser = () => {
  const [loading, setLoading] = useState(false)

  const saveUser = async(user) => {
    try {
      setLoading(true)
      console.log('datos guardados', user)
      const userCollection = collection(db, 'users');
      const docRef = await addDoc(userCollection, user);
      const newIduser = docRef.id;
      console.log(newIduser)
      Swal.fire({
        title: 'Usuario creado con éxito',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      Swal.fire('Error', 'There was an error creating the user', 'error');
    }
  }

  const getUser = async (id) => {
    try {
      setLoading(true)
      
      // Create a query to find the user by their ID
      const userQuery = query(
        collection(db, "users"),
        where("id", "==", id)
      );
      
      const querySnapshot = await getDocs(userQuery);
      
      if (querySnapshot.empty) {
        console.log('No user found for this user');
        setLoading(false)
        return null;
      }

      // Get the first document from the query result
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      
      // Add the document ID to the user data
      const userWithId = {
        ...userData,
        docId: userDoc.id
      };
    
      setLoading(false)
      return userWithId;  // Return the user data with the document ID
      
    } catch (error) {
      setLoading(false)
      console.error("Error fetching user:", error);
      Swal.fire('Error', 'There was an error fetching your user', 'error');
      return null;
    }
  }

  return {
    saveUser, 
    getUser,
    loading
  }
}

export default useUser
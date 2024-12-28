import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from '../firebase';
import { profileSuccess } from "../state/Profileslice";

const useProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const saveProfile = async(profile) => {
    try {

      setLoading(true)
      console.log('datos guardados', profile)
      const profileCollection = collection(db, 'profile');

      const docRef = await addDoc(profileCollection, profile);
      const newIdProfile = docRef.id;
      console.log(newIdProfile)
      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const profile2 = {
            id: newIdProfile,
            idUser: profile.idUser,
            name: profile.name,
            lastName: profile.lastName,
            numberPhone: profile.numberPhone,
            avatar: profile.avatar,
          }

          dispatch(profileSuccess(profile2))
          navigate('/home');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/home');
        }
      });
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      
    }
  }

  const getProfile = async (idUser) => {
    try {
      setLoading(true)
      const profileQuery = query(
        collection(db, "profile"),
        where("idUser", "==", idUser)
      );
      const querySnapshot = await getDocs(profileQuery);
      
      if (querySnapshot.empty) {
        console.log('No profile found for this user');
        setLoading(false)
        return null;
      }

      const profileDoc = querySnapshot.docs[0];
      const profileData = profileDoc.data();
      const profile = {
        id: profileDoc.id,
        idUser: profileData.idUser,
        name: profileData.name,
        lastName: profileData.lastName,
        numberPhone: profileData.numberPhone,
        avatar: profileData.avatar,
      };

      dispatch(profileSuccess(profile));
      setLoading(false)
      return profile;
    } catch (error) {
      setLoading(false)
      console.error("Error fetching profile:", error);
      Swal.fire('Error', 'There was an error fetching your profile', 'error');
      return null;
    }
  }

  const updateProfile = async(profile) => {
    try {

      setLoading(true)
      console.log('datos actualizados', profile)
      const profileQuery = query(
        collection(db, "profile"),
        where("idUser", "==", profile.idUser)
      );
      const querySnapshot = await getDocs(profileQuery);
      const profileDoc = querySnapshot.docs[0].ref;
      await updateDoc(profileDoc, profile)
      setLoading(false)

      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const prof = {
            id: profile.id,
            idUser: profile.idUser,
            name: profile.name,
            lastName: profile.lastName,
            numberPhone: profile.numberPhone,
            avatar: profile.avatar,
          }

          dispatch(profileSuccess(prof))
          navigate('/home');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/home');
        }
      });
      
    } catch (error) {
      setLoading(false)
      
    }
  }

  return {
    saveProfile, 
    getProfile, 
    updateProfile,
    loading
  }
}

export default useProfile
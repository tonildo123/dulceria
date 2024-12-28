import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from '../firebase';
import { HomeSuccess } from "../state/HomeSlice";

const useAddress = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const saveAddress = async(adress) => {
    try {

      setLoading(true)
      console.log('datos guardados', adress)
      const adressCollection = collection(db, 'adress');

      const docRef = await addDoc(adressCollection, adress);
      const newIdadress = docRef.id;
      console.log(newIdadress)
      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const adress2 = {
            id: newIdadress,
            idUser: adress.idUser,
            address: adress.address, 
            number: adress.number,
            photo : adress.photo,
            latitude: adress.latitude,
            longitude: adress.longitude,
          }

          dispatch(HomeSuccess(adress2))
          navigate('/address');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/address');
        }
      });
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      
    }
  }

  const getAddress = async (idUser) => {
    try {
      setLoading(true)
      const adressQuery = query(
        collection(db, "address"),
        where("idUser", "==", idUser)
      );
      const querySnapshot = await getDocs(adressQuery);
      
      if (querySnapshot.empty) {
        console.log('No adress found for this user');
        setLoading(false)
        return null;
      }

      const adressDoc = querySnapshot.docs[0];
      const adressData = adressDoc.data();
      const adress = {
        id:adressDoc.id,
        idUser:adressData.idUser,
        address: adressData.address, 
        number: adressData.number,
        photo : adressData.photo,
        latitude:adressData.latitude,
        longitude: adressData.longitude,
      };

      dispatch(HomeSuccess(adress));
      setLoading(false)
      return adress;
    } catch (error) {
      setLoading(false)
      console.error("Error fetching adress:", error);
      Swal.fire('Error', 'There was an error fetching your adress', 'error');
      return null;
    }
  }

  const updateAddress = async(adress) => {
    try {

      setLoading(true)
      console.log('datos actualizados', adress)
      const adressQuery = query(
        collection(db, "adress"),
        where("idUser", "==", adress.idUser)
      );
      const querySnapshot = await getDocs(adressQuery);
      const adressDoc = querySnapshot.docs[0].ref;
      await updateDoc(adressDoc, adress)
      setLoading(false)

      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const prof = {
            id: adress.id,
            idUser: adress.idUser,
            address: adress.address, 
            number: adress.number,
            photo : adress.photo,
            latitude: adress.latitude,
            longitude: adress.longitude,
          }

          dispatch(HomeSuccess(prof))
          navigate('/address');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/address');
        }
      });
      
    } catch (error) {
      setLoading(false)
      
    }
  }

  return {
    saveAddress, 
    getAddress, 
    updateAddress,
    loading
  }
}

export default useAddress
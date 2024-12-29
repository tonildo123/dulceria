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

  const saveAddress = async (address) => {
    try {

      setLoading(true)
      console.log('datos guardados', address)
      const addressCollection = collection(db, 'address');

      const docRef = await addDoc(addressCollection, address);
      const newIdaddress = docRef.id;
      console.log(newIdaddress)
      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const address2 = {
            id: newIdaddress,
            idUser: address.idUser,
            address: address.address,
            number: address.number,
            photo: address.photo,
            latitude: address.latitude,
            longitude: address.longitude,
          }

          dispatch(HomeSuccess(address2))
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
      const addressQuery = query(
        collection(db, "address"),
        where("idUser", "==", idUser)
      );
      const querySnapshot = await getDocs(addressQuery);

      if (querySnapshot.empty) {
        console.log('No address found for this user');
        setLoading(false)
        return null;
      }

      const addressDoc = querySnapshot.docs[0];
      const addressData = addressDoc.data();
      const address = {
        id: addressDoc.id,
        idUser: addressData.idUser,
        address: addressData.address,
        number: addressData.number,
        photo: addressData.photo,
        latitude: addressData.latitude,
        longitude: addressData.longitude,
      };

      dispatch(HomeSuccess(address));
      setLoading(false)
      return address;
    } catch (error) {
      setLoading(false)
      console.error("Error fetching address:", error);
      Swal.fire('Error', 'There was an error fetching your address', 'error');
      return null;
    }
  }

  const updateAddress = async (address) => {
    try {

      setLoading(true)
      console.log('datos actualizados', address)
      const addressQuery = query(
        collection(db, "address"),
        where("idUser", "==", address.idUser)
      );
      const querySnapshot = await getDocs(addressQuery);
      const addressDoc = querySnapshot.docs[0].ref;
      await updateDoc(addressDoc, address)
      setLoading(false)

      Swal.fire({
        title: 'Guadado exitosamente!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'OK',

      }).then((result) => {
        if (result.isConfirmed) {
          const prof = {
            id: address.id,
            idUser: address.idUser,
            address: address.address,
            number: address.number,
            photo: address.photo,
            latitude: address.latitude,
            longitude: address.longitude,
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
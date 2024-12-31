import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { loggearme } from '../state/LoginSlice';
import useUser from './useUser';

const useFirebaseRegister = () => {

    const [error, setError] = useState(null);
    const distpach = useDispatch();
    const {saveUser} = useUser();

    const handleRegister = async (email, password, repassword) => {
        if (password !== repassword) {
            return setError('Las contraseñas no coinciden');
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = {
                        id: userCredential.user.uid,
                        email: email,
                        role: 'client',
                        createdAt: new Date().toISOString()
                    }
                    await saveUser(user)
                    sessionStorage.setItem("emailSession", email)
                    sessionStorage.setItem("passSession", password);
                    distpach(loggearme(user))
                    
                })
                .catch((error) => {
                    setError(error.message);
                });
        } catch (error) {
            setError(error.message);
        }
    };
    const handleRegisterPolice = async (email, password) => {
       

        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = {
                        id: userCredential.user.uid,
                        email: email,
                        role: 'police',
                        createdAt: new Date().toISOString()
                    }
                    await saveUser(user)
                    sessionStorage.setItem("emailSession", email)
                    sessionStorage.setItem("passSession", password);
                    distpach(loggearme(user))
                    
                })
                .catch((error) => {
                    setError(error.message);
                });
        } catch (error) {
            setError(error.message);
        }
    };


    return { handleRegister, error, setError, handleRegisterPolice };
};

export default useFirebaseRegister;

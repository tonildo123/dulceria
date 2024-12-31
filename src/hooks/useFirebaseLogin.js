import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { loggearme } from '../state/LoginSlice';
import useUser from './useUser';


const useFirebaseLogin = () => {

    const distpach = useDispatch();
    const {getUser} = useUser();
    const [error, setError] = useState(null)

    const handleLogin = async (email, password) => {

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    

                    const userData = await getUser(userCredential.user.uid)
                    
                    const user = {
                        id: userCredential.user.uid,
                        email: email,
                        role: userData.role,
                        createdAt: userData.createdAt
                    }
                    
                    sessionStorage.setItem("emailSession", email)
                    sessionStorage.setItem("passSession", password);
                    distpach(loggearme(user))

                })
                .catch((error) => {
                    setError(error.message);
                })

        } catch (error) {
            setError(error.message);

        }

    };

    return { handleLogin, error, setError }
}

export default useFirebaseLogin
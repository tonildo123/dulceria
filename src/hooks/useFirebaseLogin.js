import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { loggearme } from '../state/LoginSlice';


const useFirebaseLogin = () => {

    const distpach = useDispatch()

    const [error, setError] = useState(null)

    const handleLogin = async (email, password) => {

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = {
                        id: userCredential.user.uid,
                        email: email,
                        password: password
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
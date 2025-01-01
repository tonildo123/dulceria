import { off, onValue, push, ref, set } from "firebase/database";
import { useEffect, useState } from 'react';
import { database } from '../firebase';
const useRealTime = () => {

    const [alertLoading, setAlertLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [error, setError] = useState(null);

    const writeDataBaseAlert = async (alert) => {
        try {
            setAlertLoading(true);
            setError(null);
                    
            const alertsRef = ref(database, 'alerts');
            const newAlertRef = push(alertsRef);
            
            const alertWithTimestamp = {
                ...alert,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await set(newAlertRef, alertWithTimestamp);
            setAlertLoading(false);
            return newAlertRef.key; 
            
        } catch (error) {
            setError(error.message);
            setAlertLoading(false);
            throw error;
        }
    };

    
    const subscribeToAlerts = (callback, filterFn = null) => {
        const alertsRef = ref(database, 'alerts');        
        const handleData = (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setAlertData(null);
                callback && callback(null);
                return;
            }
            
            const alertsArray = Object.entries(data).map(([id, value]) => ({
                id,
                ...value
            }));

            const filteredData = filterFn ? alertsArray.filter(filterFn) : alertsArray;            
            setAlertData(filteredData);
            callback && callback(filteredData);
        };

        onValue(alertsRef, handleData, (error) => {
            setError(error.message);
            callback && callback(null, error);
        });

        
        return () => off(alertsRef);
    };

    
    const subscribeToAlert = (alertId, callback) => {
        const alertRef = ref(database, `alerts/${alertId}`);        
        onValue(alertRef, (snapshot) => {
            const data = snapshot.val();
            callback && callback(data);
        }, (error) => {
            setError(error.message);
            callback && callback(null, error);
        });
        
        return () => off(alertRef);
    };

    
    useEffect(() => {
        return () => {
            setAlertData(null);
            setError(null);
            setAlertLoading(false);
        };
    }, []);

    return {
        alertLoading,
        alertData,
        error,
        writeDataBaseAlert,
        subscribeToAlerts,
        subscribeToAlert
    };
};

export default useRealTime;
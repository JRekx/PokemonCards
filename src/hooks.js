import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to toggle a boolean state
function useFlip(initialFlipState = true) {
    const [isFlipped, setFlipped] = useState(initialFlipState);

    // Function to toggle the state
    const flip = () => {
        setFlipped(isUp => !isUp);
    };

    return [isFlipped, flip];
}

// Custom hook to fetch data using axios and store it in local storage
function useAxios(keyInLS, baseUrl) {
    const [response, setResponse] = useLocalStorage(keyInLS);
    const [error, setError] = useState(null); // Added state for error handling

    // Function to add data to the response state and local storage
    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
        try {
            const result = await axios.get(`${baseUrl}${restOfUrl}`);
            // Check if the data is not undefined before setting it
            if (result.data) {
                setResponse(data => [...data, formatter(result.data)]);
            } else {
                // Handle the case where result.data is undefined
                setError(new Error('Response data is undefined'));
            }
        } catch (err) {
            // Handle errors in fetching data
            setError(err);
        }
    };

    // Function to clear the response state and local storage
    const clearResponseData = () => setResponse([]);

    // Return response, addResponseData, clearResponseData, and error
    return [response, addResponseData, clearResponseData, error];
}

// Custom hook to manage local storage state
function useLocalStorage(key, initialValue = []) {
    // Initialize the state with data from local storage or the initial value
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    // Effect to update local storage whenever the key or value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

// Export hooks
export { useFlip, useAxios, useLocalStorage };

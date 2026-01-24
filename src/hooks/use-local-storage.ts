"use client";

import { useState, useEffect, useCallback } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, SetValue<T>, () => void] {
    // Get from local storage then parse stored json or return initialValue
    const readValue = useCallback((): T => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Read from localStorage on mount
    useEffect(() => {
        setStoredValue(readValue());
    }, [readValue]);

    // Return a wrapped version of useState's setter function
    const setValue: SetValue<T> = useCallback(
        (value) => {
            if (typeof window === "undefined") {
                console.warn(
                    `Tried setting localStorage key "${key}" even though environment is not a client`
                );
            }

            try {
                // Allow value to be a function for same API as useState
                const newValue = value instanceof Function ? value(storedValue) : value;

                // Save to local storage
                window.localStorage.setItem(key, JSON.stringify(newValue));

                // Save state
                setStoredValue(newValue);

                // Dispatch storage event for other tabs/windows
                window.dispatchEvent(new Event("local-storage"));
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    // Remove value from localStorage
    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
            window.dispatchEvent(new Event("local-storage"));
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    // Listen for changes in other tabs/windows
    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(readValue());
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("local-storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("local-storage", handleStorageChange);
        };
    }, [readValue]);

    return [storedValue, setValue, removeValue];
}

/* eslint-disable react-hooks/exhaustive-deps */
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const getLocalStorageItem = (key) => localStorage.getItem(key);
export const setLocalStorageItem = (key, value) => localStorage.setItem(key, value);
export const removeLocalStorageItem = (key) => localStorage.removeItem(key);
export const cleanLocalStorage = () => localStorage.clear();
export const getJWTToken = () => 'Bearer ' + localStorage.getItem('token');
export const API_BASE_URL = process.env.API_BASE_URL;


export const errorToast = (msg, toastId = '') =>
    toast.error(msg, {
        duration: 2500,
        id: toastId
    });

export const successToast = (msg, duration = 2000) =>
    toast.success(msg, {
        duration
    });

export const informativeToast = (msg, duration = 3000) =>
    toast.custom(
        (t) => (
            <div
                className={`${t.visible ? 'animate-enter' : 'animate-leave'
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-2">
                    <div className="flex items-start">
                        <div className="self-center">
                            <InformationCircleIcon className="w-[24px] text-shoorah-secondary" />
                        </div>
                        <div className="ml-3 self-center">
                            <p className="mt-1 text-gray-500">{msg}</p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            duration
        }
    );








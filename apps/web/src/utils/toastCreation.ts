import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
    title: string,
    expiredTime: number
}

export const SuccessToast = ({ title, expiredTime }: ToastProps) => {
    return toast.success(title, {
        position: "top-right", 
        autoClose: expiredTime, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true,
        progress: undefined,
    })
}

export const ErrorToast = ({ title, expiredTime }: ToastProps) => {
    return toast.error(title, {
        position: "top-right", 
        autoClose: expiredTime, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true,
        progress: undefined,
    })
}

import { toast } from 'react-toastify';

// https://fkhadra.github.io/react-toastify/api/toast

    // type?: 'success' | 'info' | 'warning' | 'error';
    // position?:
    //     | 'top-right'
    //     | 'top-center'
    //     | 'top-left'
    //     | 'bottom-right'
    //     | 'bottom-center'
    //     | 'bottom-left';


export function showNotification({message, type, position}) {
    toast(message, {
        type,
        position,
    });
}

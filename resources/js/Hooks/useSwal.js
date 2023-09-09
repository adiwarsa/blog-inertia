import { router } from '@inertiajs/react';
import swal from 'sweetalert';

export default function useSwal() {
    const ask = ({ url, message = 'Are you sure ?', method = 'post', data = [] }) => {
        swal(message, {
            buttons: ['Nope', 'Yap'],
        }).then((value) => {
            if (value === true) {
                router[method](url, data, {
                    preserveScroll: true,
                });
            }
        });
    };
    return { ask };
}
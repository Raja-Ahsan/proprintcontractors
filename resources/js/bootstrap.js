import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const csrf = document.head.querySelector('meta[name="csrf-token"]');
if (csrf && csrf.getAttribute('content')) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf.getAttribute(
        'content',
    );
}

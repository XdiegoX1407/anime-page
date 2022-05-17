// CSS
import 'modal-video/css/modal-video.min.css'

export const modalListener = event => {
    event.preventDefault();
    const img = event.target;
    const link = img.parentElement;
    const videoId = link.dataset.videoid;
    if(link && link.classList.contains('js-video-link')) {
        // Lazy loading
        import (/* webpackChunkName: "modal" */ './open-modal').then(({ openModal }) => {
            openModal(videoId)
        })
    }
}
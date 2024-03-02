'use strict';
import iziToast from 'izitoast';
export function displayErrorToast() {
  iziToast.error({
    title: 'Error',
    message: 'An error occurred. Please try again later.',
    messageColor: '#FFF',
    color: '#EF4040',
    position: 'topRight',
    timeout: 3000,
  });
}

export function showResult() {
  iziToast.show({
    message: "Sorry, there are no images matching your search query. Please try again!",
    messageColor: '#FFF',
    color: '#EF4040',
    position: 'topRight',
    timeout: 3000,
    messageSize: '16px',
    messageLineHeight: '24px',
    maxWidth: '432px',
  });
}
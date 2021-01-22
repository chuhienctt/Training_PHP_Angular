import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  constructor(private router:Router) {
  }

  success(callback = () => {}) {
    let timerInterval;
    Swal.fire({
      icon: 'success',
      title: 'Thành công',
      html: 'Chuyển hướng trong <b></b> giây.',
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
      willOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Math.floor((Swal.getTimerLeft())/1000);
            }
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval);
        callback();
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        callback();
      }
    })
  }

  error(message) {
    Swal.fire({
      icon: 'error',
      title: 'Thất bại!',
      text: message
    })
  }

  warning(message, callback) {
    Swal.fire({
      icon: 'warning',
      title: 'Thất bại!',
      text: message,
      backdrop: 'rgba(0,0,0,0.4)'
    }).then(result => {
        if(result.isConfirmed) {
            callback();
        }
    })
  }

}

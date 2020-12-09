import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  success(messenger, showbutton = true, textButton = 'OK', callback) {
    Swal.fire({
      title: 'Thành công',
      text: messenger,
      icon: 'success',
      showCancelButton: showbutton,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: textButton,
      showConfirmButton: showbutton
    }).then((result) => {
      if (result.isConfirmed) {
        callback()
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

}

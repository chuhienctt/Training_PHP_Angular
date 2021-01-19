import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-thu-tuc',
  templateUrl: './quan-ly-thu-tuc.component.html',
  styleUrls: ['./quan-ly-thu-tuc.component.css']
})
export class QuanLyThuTucComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login1']);
  }

}

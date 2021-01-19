import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.css']
})
export class QuanLyNguoiDungComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout()
  {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login1']);
  } 
}

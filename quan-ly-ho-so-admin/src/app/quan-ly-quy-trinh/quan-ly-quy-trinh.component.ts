import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-quy-trinh',
  templateUrl: './quan-ly-quy-trinh.component.html',
  styleUrls: ['./quan-ly-quy-trinh.component.css']
})
export class QuanLyQuyTrinhComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  logout()
  {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login1']);
  }

}

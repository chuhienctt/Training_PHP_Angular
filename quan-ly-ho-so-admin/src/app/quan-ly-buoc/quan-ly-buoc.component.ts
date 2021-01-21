import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-buoc',
  templateUrl: './quan-ly-buoc.component.html',
  styleUrls: ['./quan-ly-buoc.component.css']
})
export class QuanLyBuocComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login1']);
  }

}

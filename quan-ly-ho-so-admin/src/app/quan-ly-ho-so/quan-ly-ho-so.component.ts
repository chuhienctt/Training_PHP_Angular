import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quan-ly-ho-so',
  templateUrl: './quan-ly-ho-so.component.html',
  styleUrls: ['./quan-ly-ho-so.component.css']
})
export class QuanLyHoSoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login1']);
  }

}

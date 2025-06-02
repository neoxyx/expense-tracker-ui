import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) { }

  logout(): void {
    // Elimina datos de sesión
    localStorage.removeItem('token'); // o sessionStorage.removeItem('token');
    localStorage.removeItem('user');  // si guardas info del usuario

    // Redirige al login
    this.router.navigate(['/login']);
  }
}

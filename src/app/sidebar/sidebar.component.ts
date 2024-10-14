import {Component, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AppService} from "../app.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarCollapsed = signal<boolean>(false);

  constructor(protected appService: AppService) {
  }
}

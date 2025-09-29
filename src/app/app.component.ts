import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlipbookComponent } from './components/flipbook/flipbook.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FlipbookComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'flippbook';

}

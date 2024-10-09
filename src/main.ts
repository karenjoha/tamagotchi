import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tamagotchi">
      <h1>Mi Tamagotchi</h1>
      <div class="stats">
        <p>Hambre: {{ hunger }}</p>
        <p>Felicidad: {{ happiness }}</p>
        <p>Energía: {{ energy }}</p>
      </div>
      <div class="actions">
        <button (click)="feed()">Alimentar</button>
        <button (click)="play()">Jugar</button>
        <button (click)="sleep()">Dormir</button>
      </div>
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .tamagotchi {
      font-family: Arial, sans-serif;
      max-width: 300px;
      margin: 0 auto;
      text-align: center;
    }
    .stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .actions button {
      margin: 0 5px;
      padding: 5px 10px;
    }
  `]
})
export class App implements OnInit {
  hunger = 50;
  happiness = 50;
  energy = 50;
  message = '';

  ngOnInit() {
    setInterval(() => this.updateStats(), 10000);
  }

  updateStats() {
    this.hunger = Math.max(0, this.hunger - 5);
    this.happiness = Math.max(0, this.happiness - 3);
    this.energy = Math.max(0, this.energy - 2);
    this.checkStatus();
  }

  feed() {
    this.hunger = Math.min(100, this.hunger + 20);
    this.energy = Math.max(0, this.energy - 5);
    this.message = '¡Tu Tamagotchi ha comido!';
    this.checkStatus();
  }

  play() {
    this.happiness = Math.min(100, this.happiness + 15);
    this.energy = Math.max(0, this.energy - 10);
    this.hunger = Math.max(0, this.hunger - 5);
    this.message = '¡Tu Tamagotchi se divirtió jugando!';
    this.checkStatus();
  }

  sleep() {
    this.energy = Math.min(100, this.energy + 30);
    this.hunger = Math.max(0, this.hunger - 5);
    this.message = 'Tu Tamagotchi está durmiendo...';
    this.checkStatus();
  }

  checkStatus() {
    if (this.hunger <= 0 || this.happiness <= 0 || this.energy <= 0) {
      this.message = '¡Oh no! Tu Tamagotchi necesita atención urgente.';
    }
  }
}

bootstrapApplication(App);
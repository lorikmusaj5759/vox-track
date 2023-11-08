/*
 * Filename: sophisticated_code_example.js
 * 
 * Description: This code demonstrates a sophisticated and elaborate JavaScript program. 
 * It simulates a space battle game where players can command their spaceships to engage in combat.
 * The program includes various functionalities such as spaceship creation, battle mechanics, power-ups, and more.
 * Note: This is a simplified version for illustration purposes.
 */

class Spaceship {
  constructor(name, hull, firepower, accuracy) {
    this.name = name;
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }

  attack(target) {
    console.log(`${this.name} attacks ${target.name}!`);

    if (Math.random() < this.accuracy) {
      console.log(`${this.name} hits ${target.name}!`);
      target.hull -= this.firepower;

      if (target.hull <= 0) {
        console.log(`${target.name} has been destroyed!`);
      }
    } else {
      console.log(`${this.name} missed the attack!`);
    }
  }
}

class Game {
  constructor() {
    this.player = new Spaceship('USS Schwarzenegger', 20, 5, 0.7);
    this.aliens = [
      new Spaceship('Alien 1', 4, 2, 0.6),
      new Spaceship('Alien 2', 4, 3, 0.7),
      new Spaceship('Alien 3', 6, 4, 0.8),
      new Spaceship('Alien 4', 7, 3, 0.9),
      new Spaceship('Alien 5', 5, 2, 0.8)
    ];
  }

  start() {
    console.log('==== Space Battle Start ====');

    while (this.player.hull > 0 && this.aliens.length > 0) {
      this.player.attack(this.aliens[0]);

      if (this.aliens[0].hull > 0) {
        for (let i = 0; i < this.aliens.length; i++) {
          this.aliens[i].attack(this.player);

          if (this.player.hull <= 0) {
            console.log(`${this.player.name} has been destroyed! Game Over.`);
            return;
          }
        }
      } else {
        this.aliens.shift();
        console.log(`Enemy destroyed! ${this.aliens.length} alien(s) remaining.`);
      }
    }

    if (this.player.hull > 0) {
      console.log(`Congratulations! ${this.player.name} defeated all aliens. You win!`);
    } else {
      console.log(`You lose! ${this.player.name} has been destroyed.`);
    }
  }
}

const game = new Game();
game.start();

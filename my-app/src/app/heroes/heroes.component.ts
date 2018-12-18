import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";
import {HeroService} from "../hero.service";
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /*hero:Hero = {
    id:1,
    name:"abc"
  };*/
  heroes:Hero[];
  selectHero:Hero;
  constructor(private heroService:HeroService) { }
  onSelect(hero:Hero):void{
    this.selectHero = hero;
  }
  getHeroes():void{
    this.heroService.getHeroes().subscribe(heroes =>this.heroes = heroes); //订阅一下
  }
  ngOnInit() {
    this.getHeroes();
  }

}

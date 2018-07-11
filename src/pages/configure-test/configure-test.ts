import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestPage } from '../test/test';

import{TeoricoService} from '../../services/teorico.service';

//import question Class 
import{Question, Answers} from '../../services/question';

@IonicPage()
@Component({
  selector: 'page-configure-test',
  templateUrl: 'configure-test.html',
})
export class ConfigureTestPage {

  chapter:number;
  id_examen:number;
  quantity_questions:number = 10;
  quantity_time:number=60;
  nameUser:any=[];
  user:any;
  usuario:string="hormi";
  Level:string="FACIL";
  datos:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private servicio:TeoricoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigureTestPage');
   // console.log(this.quantity_questions);
   this.loadlastTest(this.usuario);
  }
  // cargar id prueba
  loadlastTest(username){
    this.servicio.getTest(username)
			.subscribe(
			rs => this.nameUser = rs,
				er => console.log('Error: %s', er),
				() => {
         this.id_examen = this.nameUser[0].id_prueba;
          this.id_examen= this.id_examen + 1;
         //this.insertarTest(this.id_examen,1,1, this.Level);
        }
			)

  }
  startTest(id_examen,time,Level){
    this.navCtrl.push( TestPage,{
      id_examen:this.id_examen,
      Level:this.Level,
      quantity: this.quantity_questions
    });
  }
  insertarTest(id_examen, usuario,id_capitulo, dificultad){    
    this.servicio.addTest(id_examen, usuario,id_capitulo, dificultad)
			.subscribe(
				rs=> console.log('OK'),
				er => console.log(er),
				() => { this.navCtrl.push( TestPage,{
          id_examen: this.id_examen,
          id_user:usuario,
          Level:dificultad,
          cantidad_Preguntas: this.quantity_questions,
          time: this.quantity_time
        }); }
			)
  }
}

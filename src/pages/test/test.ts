import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Time } from '@angular/common';

//import service
import{TeoricoService} from '../../services/teorico.service';
import{ ViewScorePage} from '../view-score/view-score';

//import question Class 
import{Question, Answers} from '../../services/question';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  id:number;
  Level:string;
  user_id:number;
  id_pregunta:number;
  pregunta: string;
  time: number;
  quantity_questions: number;
  A:string='';
  B:string='';
  C:string='';
  question: any = [];
  answer: any=[];

  minutos: number;
  segundos: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private servicio:TeoricoService ) {
    this.minutos = 2;
    this.segundos = 59;
    setInterval(()=> this.tick(), 1000);
    
  }


  ionViewWillEnter() {
    console.log('ionViewDidLoad TestPage');
    //id para cargar las preguntas
    this.id = this.navParams.get('id_examen');
    this.Level = this.navParams.get('Level');
    this.user_id = this.navParams.get('id_user');
    this.time = this.navParams.get('time');
    this.quantity_questions = this.navParams.get('cantidad_Preguntas');


      this.cargarTest(this.id,this.user_id,this.Level); 
    
  
  }
  cargarQuestions(){
    this.servicio.getQuestions()
			.subscribe(
			rs => this.question = rs[0],
				er => console.log('Error: %s', er),
				() => {
					console.log('OK');
				}
			)
  }
  cargarTest(id_examen,user_id,Level){
    if(this.quantity_questions <= 0){
      this.navCtrl.push(ViewScorePage);
     //console.log("Terminanos ya")
    }else{
		this.servicio.getOneQuestion(id_examen,user_id,Level)
			.subscribe(
			rs => this.question = rs,
				er => console.log('Error: %s', er),
				() => {
         
          this.pregunta = this.question[0].texto_pregunta;
          this.id_pregunta = this.question[0].id_preguntas;
         
          this.cargarAnswers(this.question[0].id_preguntas);
          console.log(id_examen);
          }
        
      )
    }
    }
    // cargamos las respuestas conforme al id de la pregunta
    cargarAnswers(id){
      this.servicio.getRespuestas(id)
			.subscribe(
			rs => this.answer = rs,
				er => console.log('Error: %s', er),
				() => {
          this.A = this.answer[0].texto_respuesta;
          this.B = this.answer[1].texto_respuesta;
          this.C = this.answer[2].texto_respuesta;
        }
			)
    }
    // volvemos a llamar la funcion cargar test
    // esta funcion se llama en el Onclick del bottom respuesta
    newQuestion(respuesta){
      this.servicio.addRespuesta(this.id,respuesta,this.id_pregunta )
			.subscribe(
				rs=> console.log('OK'),
				er => console.log(er),
				() => {
          this.quantity_questions = this.quantity_questions -1;
          this.cargarTest(this.id,this.user_id,this.Level); }
			)
     
    }
 
    private tick(){
      if(this.time<=0){
        this.insertarRespuestaNula();
        this.cargarTest(this.id,this.user_id,this.Level); 
      }else{
        this.time = this.time-1;
      }
    }

    private insertarRespuestaNula(){
       this.servicio.addRespuestaNula(this.id,this.id_pregunta )
			.subscribe(
				rs=> console.log('OK'),
				er => console.log(er),
				() => {
          this.quantity_questions = this.quantity_questions -1;
          this.cargarTest(this.id,this.user_id,this.Level); }
			)
    }

}

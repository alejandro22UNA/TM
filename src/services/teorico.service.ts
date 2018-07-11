import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Question, Answers }     from './question';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeoricoService {
  
  private options;
  private url = 'http://localhost:3000/question';
  private urlIdPrueba = 'http://localhost:3000/test';
  private urlGetTest = 'http://localhost:3000/getTest';
  private urlInsertarTest = 'http://localhost:3000/insertTest';
  private urlInsertarRespuesta = 'http://localhost:3000/insertRespuesta';
  private urlInsertarRespuestaNulla = 'http://localhost:3000/insertRespuestaNula';

  constructor (private http: Http) {
    let token = localStorage.getItem('token');
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + token
    });
    this.options = new RequestOptions({ headers: headers });
  }

  getQuestions(): Observable<Question[]> {
    let url = `${this.url}`;
    return this.http.get(url, this.options)
                    .map(r => r.json())
                    .catch(this.handleError);
  }
  
  getOneQuestion(id_examen: number,user_id:number, Level:string, ): Observable<Question[]> {
    let url = `${this.urlGetTest}/${id_examen}/${user_id}/${Level}`;
    return this.http.get(url, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }
  // service para la carga de la respuesta

  getRespuestas(id:number):Observable<Question[]>{
    let url = `${this.url}/${id}`;
    return this.http.get(url, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }
  //Obtener el id del examen
  getTest(name:string):Observable<Question[]>{
    let url = `${this.urlIdPrueba}/${name}`;
    return this.http.get(url, this.options)
                    .first()
                    .map(res => res.json())
                    .catch(this.handleError);;
  }


  addInventario (inventario: Question) {
    let url = `${this.url}`;
    let iJson = JSON.stringify(inventario);
    return this.http.post(url, iJson, this.options)
                    .map(response => response.json())
                    .catch(this.handleError);;
  }
  //Agregar un Test id examen, id capitulo , nivel de la prueba
  addTest (id_examen, usuario,id_capitulo, dificultad) {
  
    let url = `${this.urlInsertarTest}`;
    let iJson = JSON.stringify({
      "id_prueba_teorica":id_examen,
      "fecha":"2018-04-30",
      "id_usuarios":usuario,
      "id_capitulo":id_capitulo,
      "dificultad_prueba":dificultad
      });
   
    return this.http.post(url, iJson, this.options)
                    .map(response => response.json())
                    .catch(this.handleError);;
  }
  addRespuesta (id_examen, respuesta_usuario, id_pregunta) {
  
    let url = `${this.urlInsertarRespuesta}`;
    let iJson = JSON.stringify({
      "respuesta_usuario": respuesta_usuario,
      "tbl_prueba_teorica_id_prueba_teorica":id_examen,
      "id_pregunta": id_pregunta 
      });
   
    return this.http.post(url, iJson, this.options)
                    .map(response => response.json())
                    .catch(this.handleError);;
  }
  addRespuestaNula (id_examen, id_pregunta) {
  
    let url = `${this.urlInsertarRespuestaNulla}`;
    let iJson = JSON.stringify({
      "respuesta_usuario": 'Nulla',
      "tbl_prueba_teorica_id_prueba_teorica":id_examen,
      "id_pregunta": id_pregunta 
      });
   
    return this.http.post(url, iJson, this.options)
                    .map(response => response.json())
                    .catch(this.handleError);;
  }
  
/*
  putInventario (inventario: Question) {
    let url = `${this.url}`;
    let iJson = JSON.stringify(inventario);
    return this.http.put(url, iJson, this.options)
                    .map(response => response.json())
                    .catch(this.handleError);;
  }

  delInventario (id: number) {
    let url = `${this.url}/${id}`;
    return this.http.delete(url, this.options)
                    .map(res => res.json())
                    .catch(this.handleError);;
  }
*/
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
}
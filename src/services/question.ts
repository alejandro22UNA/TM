
export class Question {
	constructor(
		public id: number,
		public pregunta: string,
		public estado: string,
		public dificultad_pregunta: string

	) {

	}
}

export class Answers {
	constructor(
		public id: number,
		public respuesta: string,
		public estado: string,
		public veracidad_pregunta: string
	) {}
}
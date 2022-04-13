/* interface Task{
	name: String; //property
	run(arg: any):void; //method
}

class SortFile {
	constructor (
		private maxFileSizeBytes : number,
		private numberOfLinesPerSegment : number,
		private lineSizeBytes : number );

	public async Sort(inFilename : string , outFilename : string ) : Promise< void >;

	} */

	export default class SortFile {
		constructor (private test : number)
		{
			
		}

		public hey(str : string)
		{
			console.log(str);
		}
		}
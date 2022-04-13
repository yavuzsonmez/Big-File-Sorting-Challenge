import * as fs from 'fs';

export default class SortFile {

	constructor (
		private maxFileSizeBytes : number,
		private numberOfLinesPerSegment : number,
		private lineSizeBytes : number )
		{
			if ((maxFileSizeBytes > Number.MAX_SAFE_INTEGER) || (maxFileSizeBytes <= 0))
				throw new Error("Maximum file size in Byte is invalid: " + maxFileSizeBytes);
			else if ((numberOfLinesPerSegment > (Number.MAX_SAFE_INTEGER/2)) || (numberOfLinesPerSegment <= 0))
				throw new Error("Number of lines per segment is invalid: " + numberOfLinesPerSegment);
			else if ((lineSizeBytes > Number.MAX_SAFE_INTEGER) || (lineSizeBytes <= 0))
				throw new Error("Line size in Byte is invalid: " + lineSizeBytes);
			console.log("Object constructed");
		};

	public async Sort(inFilename : string , outFilename : string ) : Promise< void > {
		try {
			const fileContents = fs.readFileSync(inFilename, {encoding: 'utf-8'});
			  console.log(fileContents);
		  }
		  catch (e) {
			console.error(e);
		  }
	};
}
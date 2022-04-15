import * as fs from 'fs';
import { OpenFile } from './OpenFile';
import { ReadFile } from './ReadFile';
//import { promises as fsPromises } from 'fs';

export default class SortFile {

	constructor (
		private maxFileSizeBytes : number,
		private numberOfLinesPerSegment : number,
		private lineSizeBytes : number )
		{
			if ((maxFileSizeBytes > Number.MAX_SAFE_INTEGER) || (maxFileSizeBytes <= 0))
				throw new Error("Maximum file size in Byte is invalid: " + maxFileSizeBytes);
			else if ((2147483648 < (numberOfLinesPerSegment*lineSizeBytes)) || (numberOfLinesPerSegment <= 0))
				throw new Error("Number of lines per segment and/or lineSizeBytes are invalid: " + numberOfLinesPerSegment + " " + lineSizeBytes);
			else if (lineSizeBytes <= 0)
				throw new Error("Line size in Byte cannot be equal or less than 0: " + lineSizeBytes);
			this.maxFileSizeBytes = maxFileSizeBytes;
			this.numberOfLinesPerSegment = numberOfLinesPerSegment;
			this.lineSizeBytes = lineSizeBytes;
		};

		public async Sort(inFilename : string , outFilename : string ) : Promise <void> {
		const parameters = {
			maxFileSizeBytes: this.maxFileSizeBytes,
			numberOfLinesPerSegment: this.numberOfLinesPerSegment,
			lineSizeBytes: this.lineSizeBytes,
			inFilename: inFilename,
			outFilename: outFilename,
		};

		try {
			if (!fs.existsSync(inFilename))
				throw new Error("inFilename doesn't exist." );

			const stats = fs.statSync(inFilename);
			var arr : string[] = [];

			if (stats.size > this.maxFileSizeBytes)
				throw new Error("File size doesn't match with maxFileSizeBytes.");

			OpenFile(parameters).then((fd) => {
				const chunks = this.maxFileSizeBytes/this.lineSizeBytes/this.numberOfLinesPerSegment;
				for(let n = 0; n < chunks; n++)
				{
					ReadFile(fd, parameters).then(data => {
						arr.push(data.buffer.toString());
						console.log(arr);
					}).catch(err => {console.log(err)});
				}
				}).catch(err => {console.log(err)});
			}
		catch (err) {
			console.error(err);
		}
	};
}
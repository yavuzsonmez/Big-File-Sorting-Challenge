import * as fs from 'fs';
import { CreateChunks } from './CreateChunks';
import { promises as fsPromises } from 'fs';

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

	public Sort(inFilename : string , outFilename : string ) : void {
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

			if (stats.size > this.maxFileSizeBytes)
				throw new Error("File size doesn't match with maxFileSizeBytes.");

			CreateChunks(parameters).then((fd:any) => {

			const buffer: any = Buffer.alloc(this.maxFileSizeBytes);
				console.log(fd);
			fd.read(buffer, 0, this.lineSizeBytes, null)
				.then((data:any)=> {
					console.log(data);
					console.log(data.buffer.toString());
				})
				//console.log(data);



			}, (err) => { console.log(err);
			});

			}
		catch (err) {
			console.error(err);
		}
	};
}
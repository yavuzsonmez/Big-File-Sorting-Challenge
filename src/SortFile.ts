import * as fs from 'fs';
import { OpenInputFile } from './OpenInputFile';
import { ReadInputFile } from './ReadInputFile';
import { CreateChunk } from './CreateChunk';
import { CompareChunks } from './CompareChunks';

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
			tmpFilename: "_chunk_",
			n: -1,
			step: 0,
		};

		try {
			if (!fs.existsSync(inFilename))
				throw new Error("inFilename doesn't exist.");
			if (fs.statSync(inFilename).size > this.maxFileSizeBytes)
				throw new Error("File size doesn't match with maxFileSizeBytes.");

			const chunks:number = this.maxFileSizeBytes / this.lineSizeBytes / this.numberOfLinesPerSegment;
			const fd = await OpenInputFile(parameters);
			let data:string[];
			for (parameters.n = 0; parameters.n < chunks; parameters.n++)
			{
				data = await ReadInputFile(fd, parameters);
				data.sort();
				//console.log(data);
				await CreateChunk(parameters.n, data, parameters);
			}
			parameters.step++;
			await fd.close();
			data = await CompareChunks(parameters);
			console.log(data);
		}
		catch (err) {
			console.error(err);
		}
	};
}
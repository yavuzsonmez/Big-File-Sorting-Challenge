import * as fs from 'fs';
import { promises as fsPromises } from 'fs'
import { OpenInputFile } from './OpenInputFile';
import { ReadInputFile } from './ReadInputFile';
import { CreateChunk } from './CreateChunk';
import { ExternalSort } from './ExternalSort';

/*
*	Main function
*		- Error handling
*		- Open input file
*		- Read Loop through the input
*			and create the first batch of chunks
*		- External merge Sort
*/

export default	class SortFile {

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
			chunks: Math.ceil(this.maxFileSizeBytes / this.lineSizeBytes / this.numberOfLinesPerSegment),
			step: 0,
			inFileEndNewline: 1,
		};
		console.log("inital chunks:", parameters.chunks);
		try {
			if (!fs.existsSync(inFilename))
				throw new Error("inFilename doesn't exist.");
			if (fs.statSync(inFilename).size > this.maxFileSizeBytes)
				throw new Error("File size doesn't match with maxFileSizeBytes.");

			const	fd = await OpenInputFile(parameters);
			let		data:string[];
			for (let n = 0; n < parameters.chunks; n++)
			{
				data = await ReadInputFile(fd, parameters);
				data.sort();
				await CreateChunk(n, data, parameters);
			}
			parameters.step++;
			await fd.close();
			while(true)
			{
				await ExternalSort(parameters);
				try {
					await fsPromises.access(outFilename, fs.constants.F_OK);
					break ;
				}
				catch {
					continue ;
				}
			}
			if (parameters.inFileEndNewline == 0)
				await fsPromises.truncate(parameters.outFilename, (parameters.maxFileSizeBytes - 1));
		}
		catch (err) {
			console.error(err);
		}
	};
}

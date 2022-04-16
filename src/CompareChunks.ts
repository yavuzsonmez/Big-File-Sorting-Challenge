import { promises as fsPromises } from 'fs'

/*	Push the first lineSizeBytes of numberOfLinesPerSegment chunks in an array.
*	Remove them from their initial file
*	Sort the array and return it as promise
*/

export const CompareChunks = async (p:any): Promise <string[]> => {

	let data:string[] = [];
	let promise:any;
	const fd:any[] = [];
	const buffer: any = Buffer.alloc(p.lineSizeBytes);
	let inputChunk: string;
	let outputChunk: string;

	let i:number = 0;
	for(let n = 0; n < p.chunks + 1; n++)
	{
		for(let i = 0; i < p.numberOfLinesPerSegment; i++)
		{
			inputChunk = './testing/' + (p.step - 1).toString() + p.tmpFilename + i.toString();
			if (fd[i] === undefined)
				fd[i] = await fsPromises.open(inputChunk, 'r');
			promise = await fd[i].read(buffer, 0, p.lineSizeBytes, null);
			if (promise.bytesRead > 0)
				data.push(promise.buffer.toString());
			if (n === p.chunks)
			{
				console.log("hey");
				await fd[i].close();
				await fsPromises.rm(inputChunk);
			}
		}
		if (n < p.chunks)
		{
			outputChunk = './testing/' + (p.step).toString() + p.tmpFilename + n;
			data.sort();
			await fsPromises.writeFile(outputChunk, data, 'ascii')
			data = [];
		}
	}
	p.step++;
	return new Promise((resolve, reject) => {
		resolve(data);
		reject("An error occured while trying to compare chunks.");
	})
}

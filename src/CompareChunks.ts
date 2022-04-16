import { promises as fsPromises } from 'fs'

/*	Push the first lineSizeBytes of numberOfLinesPerSegment chunks in an array.
*	Remove them from their initial file
*	Sort the array and return it as promise
*/

export const CompareChunks = async (p:any): Promise <string[]> => {

	const data:string[] = [];
	let promise:any;
	const fd:any[] = [];
	const buffer: any = Buffer.alloc(p.lineSizeBytes);
	let inputChunk: string;
	let outputChunk

	for(let i = 0; i < p.numberOfLinesPerSegment; i++)
	{
		inputChunk = './testing/' + (p.step - 1).toString() + p.tmpFilename + i.toString();
		fd[i] = await fsPromises.open(inputChunk, 'r');
		promise = await fd[i].read(buffer, 0, p.lineSizeBytes, null);
		if (promise.bytesRead > 0)
			data.push(promise.buffer.toString());
		promise = await fd[i].read(buffer, 0, 1, null);
		await fd[i].close();
		if (promise.bytesRead === 0)
			await fsPromises.rm(inputChunk);
	}
	outputChunk = './testing/' + (p.step).toString() + p.tmpFilename + '&';
	data.sort();
	await fsPromises.writeFile(outputChunk, data, 'ascii')
	p.step++;
	return new Promise((resolve, reject) => {
		resolve(data);
		reject("An error occured while trying to compare chunks.");
	})
}

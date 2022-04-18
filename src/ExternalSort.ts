import { promises as fsPromises } from 'fs'
import { CompareChunks } from './CompareChunks';

/*
*	Merge sort externally a batch of chunks
*	until they're all merged and rdy for the next step
*/

export	const ExternalSort = async (p:any): Promise <void> => {

	const	inputTemplate = './tmp/' + (p.step - 1).toString() + p.tmpFilename;
	const	outputTemplate = './tmp/' + (p.step).toString() + p.tmpFilename;
	let		outputChunk:string;
	let		i:number = 0;

	for (let n = 0; n < p.chunks; n += 2)
	{
		p.chunks / 2 === 1 ? outputChunk = p.outFilename : outputChunk = outputTemplate + i;
		i++;
		if ((p.chunks % 2 === 1) && (n === p.chunks - 1))
		{
			await fsPromises.rename(inputTemplate + n.toString(), outputChunk);
			break ;
		}
		await CompareChunks(p, n, inputTemplate, outputChunk);
	}
	p.step++;
	p.chunks = Math.ceil(p.chunks/2);
	return new Promise((resolve, reject) => {
		resolve();
		reject("An error occured while trying to sort chunks.");
	})
}

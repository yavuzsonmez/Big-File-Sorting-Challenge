import { promises as fsPromises } from 'fs'
import { CompareChunks } from './CompareChunks';

/*	Push the first lineSizeBytes of numberOfLinesPerSegment chunks in an array.
*	Remove them from their initial file
*	Sort the array and return it as promise
*/

export	const ExternalSort = async (p:any): Promise <void> => {

	const	inputTemplate = './testing/' + (p.step - 1).toString() + p.tmpFilename;
	const	outputTemplate = './testing/' + (p.step).toString() + p.tmpFilename;
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

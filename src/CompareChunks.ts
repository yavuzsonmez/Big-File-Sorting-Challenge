import { promises as fsPromises } from 'fs'

/*	Push the first lineSizeBytes of numberOfLinesPerSegment chunks in an array.
*	Remove them from their initial file
*	Sort the array and return it as promise
*/

export const CompareChunks = async (p:any): Promise <void> => {

	const inputTemplate = './testing/' + (p.step - 1).toString() + p.tmpFilename;
	const outputTemplate = './testing/' + (p.step).toString() + p.tmpFilename;
	const tmp: any = Buffer.alloc(p.lineSizeBytes);
	for (let n = 0; n < p.chunks; n += 2)
	{
		let outputChunk:string;
		p.chunks / 2 === 1 ? outputChunk = p.outFilename : outputChunk = outputTemplate + n;
		if ((p.chunks % 2 === 1) && (n === p.chunks - 1))
		{
			await fsPromises.rename(inputTemplate + n.toString(), outputChunk);
			break ;
		}
		const data:string[] = [];
		const intputChunks:string[] = [inputTemplate + n.toString(), inputTemplate + (n + 1).toString()]
		const fd:any[] = await Promise.all([fsPromises.open(intputChunks[n], 'r'), fsPromises.open(intputChunks[n + 1], 'r')]);
		let read:boolean = true;
		let k:number = 1;

		const promiseRead:any[] = [await fd[n].read(tmp, 0, p.lineSizeBytes, null)];
		promiseRead[0].bytesRead > 0 ? data.push(promiseRead[0].buffer.toString()) : read = false;
		while (read === true)
		{
			promiseRead[k] = await fd[n + k].read(tmp, 0, p.lineSizeBytes, null);
			if (promiseRead[k] !== undefined && promiseRead[k].bytesRead > 0)
				data.push(promiseRead[k].buffer.toString());
			else
			{
				k === 0 ? k = 1 : k = 0;
				promiseRead[k] = await fd[n + k].read(tmp, 0, p.lineSizeBytes, null);
				if (promiseRead[k] !== undefined && promiseRead[k].bytesRead > 0)
					data.push(promiseRead[k].buffer.toString());
				else
					read = false;
			}
			data.sort();
			console.log(data);
			data[0] === promiseRead[0].buffer.toString() ? k = 0 : k = 1;
			await fsPromises.appendFile(outputChunk, data[0], 'ascii');
			console.log(read, k, data.shift());
		}
		await Promise.all([fd[n].close(), fd[n + 1].close()]);
		//await Promise.all([fsPromises.rm(intputChunks[0]), fsPromises.rm(intputChunks[1])]);
	}
	p.step++;
	p.chunks = Math.ceil(p.chunks/2);
	return new Promise((resolve, reject) => {
		resolve();
		reject("An error occured while trying to compare chunks.");
	})
}

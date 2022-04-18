import { promises as fsPromises } from 'fs'


/*
*	Merge chunks by iteratings over them
*		- Push the first lineSizeBytes of numberOfLinesPerSegment
*			chunks in an array.
*		- Sort the array and push the first element to the new chunk and shift it from the array
*		- if the pushed element is the one from the last read
*			then read the next string in the same file, otherwise read in the opposite file
*			(line 44)
*				data[0] === promiseRead[k].buffer.toString() ? k = k : (k === 0 ? k = 1 : k = 0);
*/

export	const CompareChunks = async (p:any, n:number, inputTemplate:string, outputChunk:string): Promise <void> => {

	const tmp: any = Buffer.alloc(p.lineSizeBytes);
	const data:string[] = [];
	const intputChunks:string[] = [inputTemplate + n.toString(), inputTemplate + (n + 1).toString()] ;
	const fd:any[] = await Promise.all([fsPromises.open(intputChunks[0], 'r'), fsPromises.open(intputChunks[1], 'r')]);
	let read:boolean = true;
	let k:number = 1;

	const promiseRead:any[] = [await fd[0].read(tmp, 0, p.lineSizeBytes, null)];
	promiseRead[0].bytesRead > 0 ? data.push(promiseRead[0].buffer.toString()) : read = false;
	while (read === true)
	{
		promiseRead[k] = await fd[k].read(tmp, 0, p.lineSizeBytes, null);
		if (promiseRead[k] !== undefined && promiseRead[k].bytesRead > 0)
			data.push(promiseRead[k].buffer.toString());
		else
		{
			k === 0 ? k = 1 : k = 0;
			promiseRead[k] = await fd[k].read(tmp, 0, p.lineSizeBytes, null);
			if (promiseRead[k] !== undefined && promiseRead[k].bytesRead > 0)
				data.push(promiseRead[k].buffer.toString());
			else
				read = false;
		}
		data.sort();
		data[0] === promiseRead[k].buffer.toString() ? k = k : (k === 0 ? k = 1 : k = 0);
		await fsPromises.appendFile(outputChunk, data[0], 'ascii');
		console.log("Compared data:");
		console.log(data);
		const pushed:any = data.shift();
		console.log(`Pushed to the next chunk: ${pushed}________________________________________`);
	}
	Promise.all([fd[0].close(), fd[1].close()]);
	Promise.all([fsPromises.rm(intputChunks[0]), fsPromises.rm(intputChunks[1])]);
	return new Promise((resolve, reject) => {
		resolve();
		reject("An error occured while trying to compare chunks.");
	})
}

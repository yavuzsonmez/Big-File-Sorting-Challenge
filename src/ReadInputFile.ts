
export const ReadInputFile = async (fd:any, p:any): Promise <string[]> => {

	const buffer: any = Buffer.alloc(p.lineSizeBytes);
	const arr: string[] = [];
	let promise: any;

	for(let i = 0; i < p.numberOfLinesPerSegment; i++)
	{
		promise = await fd.read(buffer, 0, p.lineSizeBytes, null)
		if (promise.bytesRead <= 0)
			break;
		arr.push(promise.buffer.toString());
	}

	return new Promise((resolve, reject) => {
		resolve(arr);
		reject("An error occured while trying to read the input file.");
	})
}

export const ReadInputFile = async (fd:any, p:any): Promise <string[]> => {

	const buffer: any = Buffer.alloc(p.lineSizeBytes);
	const arr: string[] = [];
	let promise: any;
	let tmp: any;

	for(let i = 0; i < p.numberOfLinesPerSegment; i++)
	{
		promise = fd.read(buffer, 0, p.lineSizeBytes, null)

		tmp = await promise;
		arr.push(tmp.buffer.toString());
	}

	return new Promise((resolve, reject) => {
		resolve(arr);
		reject("An error occured while trying to read the input file.");
	})
}
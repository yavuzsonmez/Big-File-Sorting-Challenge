
export const ReadFile = async (fd:any, p:any): Promise <string[]> => {

	const chunks = p.maxFileSizeBytes/p.lineSizeBytes/p.numberOfLinesPerSegment;
	const arr: string[] = [];
	let tmp: string;

	return new Promise((resolve, reject) => {
		for(let n = 0; n < chunks; n++)
		{
			const buffer: any = Buffer.alloc(p.lineSizeBytes);
			fd.read(buffer, 0, p.lineSizeBytes, null)
			.then((data:any) =>
			{
				arr.push(data.buffer.toString());
				console.log(arr);
			})
			.catch((err:any) => console.log(err));
		}
		resolve(arr);
		reject("An error occured while trying to read the input file.");
	})
}
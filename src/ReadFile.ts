
export const ReadFile = (fd:any, p:any): Promise <any> => {

	const buffer: any = Buffer.alloc(p.lineSizeBytes);

	return new Promise((resolve, reject) => {
		resolve(fd.read(buffer, 0, p.lineSizeBytes, null));
		reject("An error occured while trying to read the input file.");
	})
}
import { promises as fsPromises } from 'fs'

export const CreateChunk = async (n:number, data:string[], p:any): Promise <void> => {

	const outFile:string = "./testing/0" + p.tmpFilename + n.toString();

	return new Promise((resolve, reject) => {
		resolve(fsPromises.writeFile(outFile, data, 'ascii'));
		reject("An error occured while trying to create temporary chunks.");
	})
}

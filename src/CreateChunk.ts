import { promises as fsPromises } from 'fs'

/*
*	Create a chunk (a file)
*	and write to the file an array of sorted strings
*/

export	const CreateChunk = (n:number, data:string[], p:any): Promise <void> => {

	const	outFile:string = "./tmp/" + p.step + p.tmpFilename + n.toString();

	return new Promise((resolve, reject) => {
		resolve(fsPromises.writeFile(outFile, data, 'ascii'));
		reject("An error occured while trying to create temporary chunks.");
	})
}

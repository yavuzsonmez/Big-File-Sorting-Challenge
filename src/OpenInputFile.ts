import { promises as fsPromises } from 'fs'

/*
*	Open the input file and return a filedescriptor as promise
*/

export	const OpenInputFile = (p:any): Promise <any> => {

	return new Promise((resolve, reject) => {
		resolve(fsPromises.open(p.inFilename, 'r'));
		reject("An error occured while trying to open the input file.");
	})
}

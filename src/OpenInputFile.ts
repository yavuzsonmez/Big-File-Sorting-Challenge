import { promises as fsPromises } from 'fs'

export const OpenInputFile = async (p:any): Promise <any> => {

	return new Promise((resolve, reject) => {
		resolve(fsPromises.open(p.inFilename, 'r'));
		reject("An error occured while trying to open the input file.");
	})
}

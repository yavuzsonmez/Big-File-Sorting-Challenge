import { promises as fsPromises } from 'fs'
import * as fs from 'fs';

export const CreateChunks = (p:any) => {

	const data : string[] = [];
	const buffer: any = Buffer.alloc(p.maxFileSizeBytes);

	return new Promise((resolve, reject) => {
		resolve(fsPromises.open(p.inFilename, 'r'));
		reject("Cannot read the input file.");
	})
}

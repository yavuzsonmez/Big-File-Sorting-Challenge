import { promises as fsPromises } from 'fs'

/*	Push the first lineSizeBytes of numberOfLinesPerSegment chunks in an array.
*	Remove them from their initial file
*	Sort the array and return it as promise
*/

export const CompareChunks = (p:any): Promise <string[]> => {

	const data:string[] = [];
	
	return new Promise((resolve, reject) => {
		resolve(data);
		reject("An error occured while trying to compare chunks.");
	})
}
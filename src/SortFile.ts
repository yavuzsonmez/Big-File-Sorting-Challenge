import * as fs from 'fs';

export default class SortFile {

	constructor (
		private maxFileSizeBytes : number,
		private numberOfLinesPerSegment : number,
		private lineSizeBytes : number )
		{
			if ((maxFileSizeBytes > Number.MAX_SAFE_INTEGER) || (maxFileSizeBytes <= 0))
				throw new Error("Maximum file size in Byte is invalid: " + maxFileSizeBytes);
			else if ((numberOfLinesPerSegment > (maxFileSizeBytes/lineSizeBytes/2)) || (numberOfLinesPerSegment <= 0))/*TODO*/
				throw new Error("Number of lines per segment is invalid: " + numberOfLinesPerSegment);/*TODO*/
			else if ((lineSizeBytes > Number.MAX_SAFE_INTEGER) || (lineSizeBytes <= 0))
				throw new Error("Line size in Byte is invalid: " + lineSizeBytes);
			this.maxFileSizeBytes = maxFileSizeBytes;
			this.numberOfLinesPerSegment = numberOfLinesPerSegment;
			this.lineSizeBytes = lineSizeBytes;
		};

	public Sort(inFilename : string , outFilename : string ) : void {

		try {
			const stats = fs.statSync(inFilename);
			const data : string[] = [];
			if (stats.size > this.maxFileSizeBytes)
				throw new Error("File size doesn't match with maxFileSizeBytes.");

				fs.open(inFilename, 'r', (err, fd) => {
					if (err)
						return console.error(err);
					for(let i = 0; i < this.numberOfLinesPerSegment; i++)
					{
						const buffer: any = Buffer.alloc(this.lineSizeBytes);
						fs.read(fd, buffer, 0, this.lineSizeBytes, null, (err, bytesRead, buffer) => {
							if (err)
								return console.error(err);
							if (bytesRead > 0) {
								data.push(buffer.toString());
								console.log(data);
							}
						});
					}
					console.log(data);
					fs.close(fd, (err) => {
						if (err)
							console.error(err);
						else {
							console.log("\n> File Closed");
						}
						//data.sort();
					});
			});
		}
		catch (err) {
			console.error(err);
		}
	};
}
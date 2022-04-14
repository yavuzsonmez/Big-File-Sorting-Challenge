import * as fs from 'fs';

export default class SortFile {

	constructor (
		private maxFileSizeBytes : number,
		private numberOfLinesPerSegment : number,
		private lineSizeBytes : number )
		{
			if ((maxFileSizeBytes > Number.MAX_SAFE_INTEGER) || (maxFileSizeBytes <= 0))
				throw new Error("Maximum file size in Byte is invalid: " + maxFileSizeBytes);
			else if ((2147483648 < (numberOfLinesPerSegment*lineSizeBytes)) || (numberOfLinesPerSegment <= 0))
				throw new Error("Number of lines per segment and/or lineSizeBytes are invalid: " + numberOfLinesPerSegment + " " + lineSizeBytes);
			else if (lineSizeBytes <= 0)
				throw new Error("Line size in Byte cannot be equal or less than 0: " + lineSizeBytes);
			this.maxFileSizeBytes = maxFileSizeBytes;
			this.numberOfLinesPerSegment = numberOfLinesPerSegment;
			this.lineSizeBytes = lineSizeBytes;
		};

	public Sort(inFilename : string , outFilename : string ) : void {

		try {
			if (!fs.existsSync(inFilename))
				throw new Error("inFilename is doesn't exist." );
			const stats = fs.statSync(inFilename);
			const data : string[] = [];
			if (stats.size > this.maxFileSizeBytes)
				throw new Error("File size doesn't match with maxFileSizeBytes.");

				fs.open(inFilename, 'r', (err, fd) => {
					if (err)
						return console.error(err);
					for(let n = 0; n < (this.maxFileSizeBytes/this.lineSizeBytes/this.numberOfLinesPerSegment); n++)
					{
						for(let i = 0; i < this.numberOfLinesPerSegment; i++)
						{
							const buffer: any = Buffer.alloc(this.lineSizeBytes);
							fs.read(fd, buffer, 0, this.lineSizeBytes, null, async (err, bytesRead, buffer) => {
								if (err)
									return console.error(err);
								if (bytesRead > 0) {
									data.push(buffer.toString());
									console.log(data);
								return (data)
								}
							});
						}
						fs.close(fd, (err) => {
							if (err)
							console.error(err);
							else {
								console.log("\n> File Closed");
							}
							data.sort();
							console.log(data);
							fs.writeFile(outFilename + n, data.join(''), 'ascii', (err) => {
								if (err)
									return console.error(err);
							});
						});
					}
				});
			}
		catch (err) {
			console.error(err);
		}
	};
}
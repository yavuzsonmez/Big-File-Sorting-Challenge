import SortFile from "./SortFile";

const test = () => {

const param = {
	maxFileSizeBytes: 25,
	numberOfLinesPerSegment: 2,
	lineSizeBytes: 5,
}

const file = {
	inFilename: "./testing/input",
	outFilename: "./testing/output",
}

try {
	const test = new SortFile(param.maxFileSizeBytes, param.numberOfLinesPerSegment, param.lineSizeBytes);
	test.Sort(file.inFilename, file.outFilename);
}

catch (err) {
		console.error(err);
}

};

test();
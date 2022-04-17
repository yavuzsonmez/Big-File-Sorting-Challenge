import SortFile from "./SortFile";

const Big_File_Sorting = () => {

const param = {
	maxFileSizeBytes: 50,
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

Big_File_Sorting();
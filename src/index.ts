import SortFile from "./SortFile";
import * as data from "../testing/test.json"

const test = () => {

const p = data.parameters;
const f = data.files;

try {

	const test = new SortFile(p.maxFileSizeBytes, p.numberOfLinesPerSegment, p.lineSizeBytes);
	test.Sort(f.inFilename, f.outFilename);
	console.log("done.")
}

catch (e) {
		console.error(e);
}

};

test();
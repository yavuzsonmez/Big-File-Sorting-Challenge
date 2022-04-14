import SortFile from "./SortFile";
import * as p from "../testing/parameters.json"
import * as f from "../testing/files.json"

const test = () => {

try {

	const test = new SortFile(p.maxFileSizeBytes, p.numberOfLinesPerSegment, p.lineSizeBytes);
	test.Sort(f.inFilename, f.outFilename);
	//console.log("-> done.") make a promise with test.Sort .then this console.log
}

catch (err) {
		console.error(err);
}

};

test();
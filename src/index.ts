import SortFile from "./SortFile";

/*
*	Entry point
*		Define the parameters of the instance
*		Create an instance of the class
*		Call the asynchronous Sort() method
*/

const Big_File_Sorting = () => {

	const param = {
		maxFileSizeBytes: 5000,
		numberOfLinesPerSegment: 2,
		lineSizeBytes: 5,
	}

	try {
		const test = new SortFile(param.maxFileSizeBytes, param.numberOfLinesPerSegment, param.lineSizeBytes);
		//test.Sort("./testing/input", "./testing/output"); // maxFileSizeBytes = 50, no newline at the end of the file
		//test.Sort("./testing/input1", "./testing/output1"); // maxFileSizeBytes = 995, no newline at the end of the file
		//test.Sort("./testing/input2", "./testing/output2"); // maxFileSizeBytes = 995, newline at the end of the file
		test.Sort("./testing/input3", "./testing/output3"); // maxFileSizeBytes = 5000, no newline at the end of the file
		test.Sort("./testing/input4", "./testing/output4"); // maxFileSizeBytes = 5000, newline at the end of the file
	}
	catch (err) {
			console.error(err);
	}
};

Big_File_Sorting();
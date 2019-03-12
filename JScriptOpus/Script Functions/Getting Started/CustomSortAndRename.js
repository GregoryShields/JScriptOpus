// The point of this script is to establish a custom-sort for a set of  
// files before passing files to Run() or RunCommand().  
// This could be useful for AddFilesFromFolders.  
// As it stands, the script writes to the Other Log, sorting files by  
// name length ASC + name DESC.  
// If you uncomment Run(), the files are renamed one by one.  
// You could also do a bulk rename by adding files one by one before running Run().  

// Main script entry point. DO passes the ClickData object to the function.  
function OnClick(clickData) {  
	// Open the Other Logs.  
	clickData.func.command.RunCommand("Set UTILITY=otherlog");  

	// selected_files is a set. It cannot be sorted.  
	var selected_files = clickData.func.sourcetab.selected_files;  

	// In order to sort the files, create an array.  
	var fileList = [];  
	var enumFiles = new Enumerator(selected_files);  
	var currentFile;  
	while (!enumFiles.atEnd()) {  
		currentFile = enumFiles.item();  
		fileList.push(currentFile);  
		// If you want an array with the files and some custom computed item, do something like  
		// fileList.push( {item:currentFile, custom:something} );  
		enumFiles.moveNext();  
	}  

	// Establish a custom sort.  
	fileList.sort(function(a, b) {
		if (a.name.length - b.name.length !== 0) {
			return a.name.length > b.name.length ? 1 : -1;
		} else {
			return	b.name_stem.toLowerCase() >
					a.name_stem.toLowerCase()
					? 1 : -1;
		}
	});  

	DOpus.ClearOutput(); // Clear the output log.  
	DOpus.Output("\nCustom sort: name length ASC + name DESC\n");  

	// cmd is a Command object.  
	var cmd = DOpus.Create.Command();

	// Rename files one by one.
	// To actually rename, uncomment the cmd.Run() line.  
	for (var i = 0; i < fileList.length; i++) {  
		cmd.AddLine('Rename PATTERN ^(.*)$ TO "' + i.toString() + ' \\1" REGEXP');
		cmd.AddFile(fileList[i]);  
		// cmd.Run();  
		cmd.Clear();
		cmd.ClearFiles();
		DOpus.Output((i + 1).toString() + " - " + fileList[i].name);  
	}  
}  

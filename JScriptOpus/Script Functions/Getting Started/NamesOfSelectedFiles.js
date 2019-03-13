// The point of this script is to show how you can access the  
// files selected in the tab and start to do something with them.  
// The script just outputs some text to the Other Log.  

// Main script entry point. DO passes the ClickData object to the function.  
function OnClick(clickData) {
	// sourcetab is a Tab object.  
	// Here we use its selected_files property.  
	// It also has selected_dirs and many more goodies.  
	var selected_files = clickData.func.sourcetab.selected_files;  

	// Start to set up a simple alert -- displayed later with dlg.Show().  
	var dlg = clickData.func.Dlg;
	dlg.buttons = "OK";  

	DOpus.ClearOutput(); // Clear the output log.  

	// Note that numbers of files and more info can be obtained in  
	// sourcetab.stats or sourcetab.selstats (see Tab object).  
	var num_files = selected_files.count;  
	if (num_files > 5) {  
		dlg.message = "There are " + num_files.toString() +  
			" files\nOnly the first five will be shown.";  
		dlg.Show();  
	}  

	var cmd = clickData.func.command;
	cmd.deselect = false; // Prevent automatic deselection
	// The details of outputting to the Other Logs utility pane  
	// are covered in the previous script.  
	//clickData.func.command.RunCommand("Set UTILITY=otherlog");
	cmd.RunCommand("Set UTILITY=otherlog");

	// Create an enumerator object to enumerate the selected files.  
	// JS enumerators: https://tinyurl.com/ybkplgax  
	var enumFiles = new Enumerator(selected_files);  

	// Enumerate the files in the tab.  
	var counter = 1;  
	var currentFile;  
	while (!enumFiles.atEnd() && counter < 6) {  
		currentFile = enumFiles.item();  
		DOpus.Output(currentFile.name);  
		enumFiles.moveNext();  
		counter++;  
	}  
}  

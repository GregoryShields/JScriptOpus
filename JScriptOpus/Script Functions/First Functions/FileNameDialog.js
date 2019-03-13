// Display the file names of the selected files in a message box.

function OnClick(clickData) {
	var message;
	var selected_files = clickData.func.sourcetab.selected_files;  

	var enumFiles = new Enumerator(selected_files);  
	var counter = 1;
	var currentFile;

	while (!enumFiles.atEnd() && counter < 6) {
		currentFile = enumFiles.item();
		message += currentFile.name + "\n";
		enumFiles.moveNext();
		counter++;
	}  

	var dlg = clickData.func.Dlg;
	dlg.buttons = "OK";
	dlg.message = message;
	dlg.Show();
}

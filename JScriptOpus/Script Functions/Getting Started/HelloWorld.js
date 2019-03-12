// Every script that lives in a button or hotkey needs the OnClick function, seen below.  
// It is the script's main entry point.  
// The function has one argument, clickData, which is an object that Opus passes to the function.  
// clickData has a func property, which is a Func object which has useful attributes and methods.  

function OnClick(clickData) {  
	// 1. Print to the Output Log.  
	// This is a convenient way to examine variables when debugging a script,  
	// or to output a lot of text.  

	clickData.func.command.RunCommand("Set UTILITY=otherlog"); // First open the log.  
	DOpus.ClearOutput(); // Clear the output log.  
	DOpus.Output("'Hello World' in the Output Log"); // Display the text.  

	// 2. Create a simple alert dialog.  

	var dlg = clickData.func.Dlg; // Create a dialog object.  
	dlg.message = "'Hello World' in an alert dialog";  
	dlg.buttons = "OK";  
	dlg.Show(); // Nothing happens until you invoke the Show() method.  

	// 3. Create a multi-button dialog.  

	// Recycle the dialog object.
	dlg.message = "Pick a Color";  
	dlg.buttons = "Red|Black";  

	// Test which button was clicked.  
	if (dlg.Show() === 1) {  
		dlg.message = "You picked red";  
	}  
	else {  
		dlg.message = "You picked black";  
	}  

	// Recycle the dialog object again.  
	dlg.title = "Another Dialog";  
	dlg.buttons = "All Done";  
	dlg.icon = "Info";  
	dlg.Show();  
}  

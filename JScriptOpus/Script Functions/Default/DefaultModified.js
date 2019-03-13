// This is a cleaned-up version of the default function script.
// I will break this up into multiple files, each containing just a single focused example,
// as opposed to this very long function containing miscellaneous example code.

function OnClick(clickData) {
	// This is the default example OnClick script to help get you started.
	// (You can use the "Default" menu in the Command Editor to the right of
	// "Script type" to replace this with your own default script function.)
	// See "Scripting Reference" in the Opus manual for full documentation.

	// Some essentials:

	// - clickData.func.command:
	//     Command object which you will typically create a reference to like this:
	//     var cmd = clickData.func.command;
	//     and then use that reference variable to make configuration assignments.
	//     Preconfigured with source, destination, and selected items.

	//     To change source/destination:
	//       cmd.SetSource, .SetSourceTab, .SetDest, .SetDestTab.
	//
	//     The 'source' property is a Path object representing the source directory for the command.
	//     The 'dest' property is a Path object representing the destination directory for the command.
	//     The 'sourcetab' property is a Tab object representing the source tab for the command.
	//     The 'desttab' property is a Tab object representing the destination tab for the command.
	//
	//     SetSource/SetDest sets the command's source/dest property to the specified Path,
	//     and then clears its sourcetab/desttab property.
	//     SetSourceTab/SetDestTab sets the command's sourcetab/desttab Tab property,
	//     and then sets its source/dest Path property from that tab object.

	//     To change files/folders acted upon:
	//       cmd.ClearFiles, .AddFile, .AddFilesFromFile, .RemoveFile, etc.

	//     To run a simple, single-line command:
	//       cmd.RunCommand("Help ABOUT");

	//     To run a multi-line command:
	//       cmd.Clear();
	//       cmd.AddLine("Help ABOUT");
	//       cmd.AddLine("Help LICENCEMANAGER");
	//       cmd.Run();

	// - clickData.func.Dlg
	//     Dialog object for showing message boxes and other UI.
	//     Preconfigured with the sourcetab as its parent window.

	// - clickData.func.sourcetab and clickData.func.desttab
	//     Source and destination folder Tab objects
	//     You can assign these to a temporary reference variable:
	//     var tab = clickData.func.sourcetab;

	//     With these you can access data such as:
	//       tab.selected, .selected_dirs, .selected_files
	//       tab.all, .dirs, .files
	//       tab.path (tab's folder path)
	//       tab.lister (top-level lister that contains the tab)
	//       tab.right (tells you if tab is on the left or right)
	//       etc.

	DOpus.ClearOutput(); // Clear the Script Output log.

	var cmd = clickData.func.command;
	cmd.deselect = false; // Prevent automatic deselection
	cmd.RunCommand("Set VIEW=Details");

	var tab = clickData.func.sourcetab;
	DOpus.Output("Selected items in " + tab.path + ":");

	if (tab.selected.count === 0) {
		DOpus.Output("  (none)");
	} else {
		for (var eSel = new Enumerator(clickData.func.sourcetab.selected); !eSel.atEnd(); eSel.moveNext()) {
			if (eSel.item().is_dir) {
				DOpus.Output("  (d) " + eSel.item().RealPath);
			} else {
				DOpus.Output("  (f) " + eSel.item().RealPath);
			}
		}
	}

	DOpus.Output("Folders below C:\\ root:");
	var folderEnum = DOpus.FSUtil.ReadDir("C:\\", false);
	while (!folderEnum.complete) {
		var folderItem = folderEnum.Next;
		if (folderItem.is_dir) {
			DOpus.Output("  " + folderItem.RealPath);
		}
	}

	DOpus.Output("Folder tabs open across all windows:");
	for (var eListers = new Enumerator(DOpus.listers); !eListers.atEnd(); eListers.moveNext()) {
		for (var eTabs = new Enumerator(eListers.item().tabs); !eTabs.atEnd(); eTabs.moveNext()) {
			DOpus.Output("  " + eTabs.item().path);
		}
	}
}

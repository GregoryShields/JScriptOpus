// The below is the default example script that comes with Opus and appears every time you create a new script function, usually by creating a new button and then setting the Function drop-down to "Script Function".
// Simply copy this file and paste it to use it as a template. Actually I could make a ReSharper template of it so that all you have to do is create a new JavaScript file and then type the template name.
// I could have templates with boilerplate for enumerating selected files, or other tasks which are commonly reused.

function OnClick(clickData) {
	// This is the default example OnClick script, to help get you started.
	// (You can use the "Default" menu above to replace this with your own default.)
	// 
	// Some essentials (see Scripting Reference in the manual for the rest):
	// - clickData.func.command:
	//     Command object.
	//     Preconfigured with source, destination and selected items.
	//     To change source/dest:
	//       cmd.SetSource, .SetSourceTab, .SetDest, .SetDestTab.
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
	//     Preconfigured with the source tab as its parent window.
	// - clickData.func.sourcetab and .desttab
	//     Source and destination folder tabs.
	//     Access to data such as:
	//       tab.selected, .selected_dirs, .selected_files
	//       tab.all, .dirs, .files
	//       tab.path (tab's folder path)
	//       tab.lister (top-level lister that contains the tab)
	//       tab.right (tells you if tab is on the left or right)
	//       etc.
	// --------------------------------------------------------
	DOpus.ClearOutput();
	// --------------------------------------------------------
	var cmd = clickData.func.command;
	cmd.deselect = false; // Prevent automatic deselection
	// --------------------------------------------------------
	cmd.RunCommand("Set VIEW=Details");
	// --------------------------------------------------------
	DOpus.Output("Selected items in " + clickData.func.sourcetab.path + ":");
	if (clickData.func.sourcetab.selected.count === 0) {
		DOpus.Output("  (none)");
	}
	else {
		for (var eSel = new Enumerator(clickData.func.sourcetab.selected); !eSel.atEnd(); eSel.moveNext()) {
			if (eSel.item().is_dir) {
				DOpus.Output("  (d) " + eSel.item().RealPath);
			}
			else {
				DOpus.Output("  (f) " + eSel.item().RealPath);
			}
		}
	}
	// --------------------------------------------------------
	DOpus.Output("Folders below C:\\ root:");
	var folderEnum = DOpus.FSUtil.ReadDir("C:\\", false);
	while (!folderEnum.complete) {
		var folderItem = folderEnum.Next;
		if (folderItem.is_dir) {
			DOpus.Output("  " + folderItem.RealPath);
		}
	}
	// --------------------------------------------------------
	DOpus.Output("Folder tabs open across all windows:");
	for (var eListers = new Enumerator(DOpus.listers); !eListers.atEnd(); eListers.moveNext()) {
		for (var eTabs = new Enumerator(eListers.item().tabs); !eTabs.atEnd(); eTabs.moveNext()) {
			DOpus.Output("  " + eTabs.item().path);
		}
	}
	// --------------------------------------------------------
}

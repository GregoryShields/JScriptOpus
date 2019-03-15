Option Explicit On

Public Class ImageFunctions

	' https://www.gpsoft.com.au/help/opus11/index.html#!Documents/Opus11/New_Scripting_Interface.htm
	' Select all high-definition images in the current source file display
	' having a vertical resolution greater than or equal to 700 pixels.
	Function OnClick(ByRef ClickData)
		' Use this function on 
		' lib://Pictures/Wacky Packages/Series 01 
		' to see it work.
		' Temporary code to do that automatically:
		ClickData.func.command.RunCommand("Go ""lib://Pictures/Wacky Packages/Series 01""")

		' Add to the command only files that match an image height greater than 700.
		Dim file
		For Each file In ClickData.func.sourcetab.all
			If file.metadata.image.picheight > 700 Then '1080 Then
				ClickData.func.command.AddFile(file)
				DOpus.Output(file)
			End If
		Next
		ClickData.func.command.RunCommand("Select FROMSCRIPT")

		' The original version of the script had this, but I realized that DESELECTNOMATCH isn't
		' needed here because only matching files were added to the command above.
		' DESELECTNOMATCH is therefore useless here.
		'ClickData.func.command.RunCommand("Select FROMSCRIPT DESELECTNOMATCH")
	End Function
End Class

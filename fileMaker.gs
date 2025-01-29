function fileMaker(folderIds = []) {
  var helperFolder = DriveApp.getFoldersByName("Helper Folder").next().getId();
  var helperFolderIDs = helperCASorted(getHelperFolderIDs(helperFolder));
  var helperFolderFiles = DriveApp.getFolderById(helperFolderIDs[0]).getFiles();

  //so now with having the files of the inner, we need to take the first folder ID and duplicate the helperFolderFiles into it
  var mainFolderId = folderIds[0];
  while (helperFolderFiles.hasNext()) {
    var temp = helperFolderFiles.next();
    temp.makeCopy(DriveApp.getFolderById(mainFolderId));

  }
  //I put the TBP template in the 'Helper Folder' (the root one), so duplicate that and put it in folderIds[1][4]
  DriveApp.getFolderById(helperFolder).getFiles().next().makeCopy(DriveApp.getFolderById(folderIds[1][4]));

  //Now to duplicate all CA spreadsheets into their respective folders, and have them also in the outside (folderIds[1][0])
  for (i in folderIds[2]) {
    var section = parseInt(i) + 1;
    var tbpFileId = duplicateSpreadsheets(folderIds[2][i], DriveApp.getFolderById(helperFolderIDs[1]).getFiles(), section);
    makeSmartSheets(tbpFileId,folderIds[5][i]);

  }
  var _ = duplicateSpreadsheets(folderIds[1][0], DriveApp.getFolderById(helperFolderIDs[1]).getFiles());
}


function makeSmartSheets(tbpFileId,folderId){
  //how the FUCK doI do this ok let me lay it out
  /**so I have this tbp document that I need to copy 16 lines from into their own documents
   * what if I took the tbp order and hard coded it here, then thats how we name the files 
   */
  var tbpFile = SpreadsheetApp.setActiveSpreadsheet(tbpFileId);
}
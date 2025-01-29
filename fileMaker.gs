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
    makeSmartSheets(tbpFileId,folderIds[5][i][0], helperFolderIDs[2]);

  }
  var _ = duplicateSpreadsheets(folderIds[1][0], DriveApp.getFolderById(helperFolderIDs[1]).getFiles());
}


function makeSmartSheets(tbpFileId,folderId,smartSheetHelperFolderID){
  //how the FUCK doI do this ok let me lay it out
  /**so I have this tbp document that I need to copy 16 lines from into their own documents
   * what if I took the tbp order and hard coded it here, then thats how we name the files 
   */
 // var tbpFile = SpreadsheetApp.setActiveSpreadsheet(tbpFileId);
  //**I dont need above because I can just import the formula into temp with the id */
  //so basically I hardcoded the top part into a new spreadsheet (in helper folder: '3. smart sheet' or whatever i named it)
  //so we gotta retrieve it
  var smartSheetTemplate = DriveApp.getFolderById(smartSheetHelperFolderID).getFiles().next();
  //so then we want copy and add to this the formula (=importrange("{fileurl}","B{i+3}:L{i+3}")) to the second row
  //which files take the form of https://docs.google.com/spreadsheets/d/{FILEID}/edit 
  //but I will start with generating smartsheets for a class
  for(var i = 0; i< firstSixteenPres.length;i++){
    var temp = smartSheetTemplate.makeCopy(firstSixteenPres[i] + " - [Student Name]",DriveApp.getFolderById(folderId));
    var tempID = temp.getId();
    var ss = SpreadsheetApp.openById(tempID);      
    ss.getActiveSheet().getRange(2,1).setFormula('=importrange("https://docs.google.com/spreadsheets/d/'+tbpFileId+'","B{i+3}:L{i+3}"');
  }

}



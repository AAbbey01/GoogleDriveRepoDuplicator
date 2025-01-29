function generateSections(numberOfSections) {
  var ret = [];
  for (var i = 1; i <= numberOfSections; i++) {
    ret[i - 1] = "A0" + i;
  }
  return ret;
}

function getLetter(folderMakerSpreadsheet, month) {
  if (folderMakerSpreadsheet.getRange(2, 2).getValue() != "") { return folderMakerSpreadsheet.getRange(2, 2).getValue(); }
  else {
    for (i in springMonths) {
      if (springMonths[i] == month) {
        return "S";
      }
    }
  }
  return "F"
}


function createFirstSubfolderSet(mainFolderId){
  var ret = [];
  for(var i = 0; i<5; i++){
    ret[i] = DriveApp.getFolderById(mainFolderId).createFolder(innerFolderNames[i]).getId();
    
  }
  return ret;
}

function createSecondSubFolderSet(folderId, listOfSections = []){
  var ret = [];
  for(var i=0;i<listOfSections.length;i++){
    ret[i] = DriveApp.getFolderById(folderId).createFolder(listOfSections[i]).getId();
  }
  return ret;
}















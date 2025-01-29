function folderMaker(folderMakerSpreadsheet) {

  var date = new Date();
  var currentYearAndMonth = Utilities.formatDate(date, "EST", "yyyy MMM").split(" ");
  var semesterLetter = getLetter(folderMakerSpreadsheet, currentYearAndMonth[1]);

  var numberOfSections = folderMakerSpreadsheet.getRange(1, 2).getValue() ? folderMakerSpreadsheet.getRange(1, 2).getValue() != undefined : 6;
  var listOfSections = generateSections(numberOfSections);

  //Here we generate every single folder and subfolder correctly
  var mainFolderId = DriveApp.createFolder("CA CS301 " + semesterLetter + currentYearAndMonth[0]).getId();

  var firstSubsetOfFolders = createFirstSubfolderSet(mainFolderId);


  var atsSubfolders = createSecondSubFolderSet(firstSubsetOfFolders[0], listOfSections);
  var caMeetingSubfolders = createSecondSubFolderSet(firstSubsetOfFolders[1], listOfSections);
  var tbPresSubfolders = createSecondSubFolderSet(firstSubsetOfFolders[4], listOfSections);

  //Creates the Smartsheet folder and TBP folder, nothing is added into these so no need to send out
  //The comment above is now stupid and obselete as I am adding smartsheet creation to this document
  var aggregateSmartSheetFolderIDs = [];
  for (i in atsSubfolders) {
  aggregateSmartSheetFolderIDs.push(createSecondSubFolderSet(atsSubfolders[i], insideATSSectionFolderNames).map(checkforSS));
  //the map here is overkill but useful incase I do something wrong during program time
  //because I dont sort the id's before returning
  }

  //within the first subset of folders, put template for TBP in firstSubset[3]
  //1,5,N,N,N,2N
  var returnedFolderIds = [mainFolderId, firstSubsetOfFolders, atsSubfolders, caMeetingSubfolders, tbPresSubfolders, aggregateSmartSheetFolderIDs];
  return returnedFolderIds;

}

function checkforSS(val){
  if(DriveApp.getFolderById(val).getName() == insideATSSectionFolderNames[0]){
    return val
  }
  return -1
}
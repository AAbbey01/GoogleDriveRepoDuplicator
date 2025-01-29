/** main function. Takes no parameters and runs folder maker and file maker */
function main() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (spreadsheet.getName() != "options") { return; }
  var folders = folderMaker(spreadsheet);
  console.log(folders);
  var tbpFileIDs = fileMaker(folders);
  //makeSmartSheets(folders[5],tbpFileIDs);
}
/**so I think within fileMaker, I can grab the files that are named ['textbook presentations'] and then create 16 blanket smartsheets*/

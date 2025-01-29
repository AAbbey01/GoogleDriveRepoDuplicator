//in here, get info if the filename is what I need it to be
function duplicateSpreadsheets(folderId, files, section = 0) {
  var returnedID = -1;
  while (files.hasNext()) {
    var temp = files.next();
    var fileName = temp.getName();

    if (section > 0) {
      fileName = "[A0" + section + "] " + temp.getName();
      if (fileName == realJuicerFileNameIForgot) {
        returnedID = temp.getId();
      }
    } else { fileName = "Example of " + temp.getName(); }
    temp.makeCopy(fileName, DriveApp.getFolderById(folderId));

  }
  return returnedID;
}

function getHelperFolderIDs(helperFolder) {

  var t = DriveApp.getFolderById(helperFolder).getFolders();
  var foldersInHelper = [];
  while (t.hasNext()) {
    foldersInHelper.push(t.next().getId());
  }
  return foldersInHelper;
}

function helperCASorted(helperFolderIDs = []) {
  //of N helper folders, sort their ids in helperFolderChildrenNames order
  var ret = [];
  for (var i = 0; i < helperFolderChildrenNames.length; i++) {
    for (var j = 0; j < helperFolderIDs.length; j++) {
      if (DriveApp.getFolderById(helperFolderIDs[j]).getName() == helperFolderChildrenNames[i]) {
        ret[i] = helperFolderIDs[j];
        continue;
      }
    }
  }
  return ret;
}

/**Layout of folderIds
 * [ '1HagZSoyuLfwBqCfbSjIw23CyjmE1ttnY',
  [ '1lLxI2uy_MmrzJ8ZhI2DplLC2owRGlFVh',
    '1tAxQy8O_JYuN96WjbjjM4LPhXoT9i_Q2',
    '1EIyFxOt30fMuaMT77MB7uv_4VnA0VA6W',
    '1otAy3sGPdmgBndguuvRPcwIHhhCrygSu',
    '1gILNR5eJHGfGupigTppKLPSAcOs4CWxW' ],
  [ '1HI_ZLnu-6BAgno_GkzO2J9xiqCC2x0V0',
    '1KS03gXr-72ENAonX7ECyRhQOao9KUf9h',
    '1AuGCIJ9fKKytwqtT5eyXpL4P78-GXWjI',
    '1SIvfrKMeG_yPK5yMO2dRQ-xCzRVbc1lQ',
    '1Z3MnSlfbw5wPcO-wYh8_nh-skXI8Qo6L',
    '19_C4MU7NLXSDK9jTfXqCExikMeA0LRJO' ],
  [ '182oxvFknge-ryf_SN9uir81z4VYQzWn0',
    '10bfRc6r4Lcq7FLYDvILjOssu9G-H-4of',
    '1eJIHlh82Ys9e_brZMHzJ565g9ncS065G',
    '1lORpqr7ipsT52gfjtHznPCfe9hihrInr',
    '1A1OPiwdSScMgS__XwqfhStiTdKjq_JpW',
    '1GpJkOArrpE8XsaxDWG9lvPI_rgM0HLrp' ],
  [ '1SCQw3GSxa162C0eWp4rw3opeGZq3YnWS',
    '1jQPOF_Z8zaOPpeg_BNkbdnUhSAo9gMNT',
    '1f9Z9y2tHVYytV1wAz0TtkH1eQCLNKuMf',
    '11HELqlMVQ2epJDESjBFvBmTLAoBN3Zp8',
    '1_LlomHTo0YmkBSD2GAOLJR-Hx_UHZf7O',
    '1ZhMUoNd6gzlYbVeEZkImHwajryPFI5lu' ],
  [ [ '1xLkxhYODNIeKGaUs95bdCzQSKyzuJXSW', -1 ],
    [ '1IXqhT48JB5RsnE8Z0P1xIPY82ITVqNre', -1 ],
    [ '1VDW3SF7LF8LgLzmsGONbSUnnECBHio5d', -1 ],
    [ '14-ZVLavWUphVjkQgBcg92tUP9-bG8b1Y', -1 ],
    [ '1t2GgbcL7uC5cFGwN_XPZsk7Ds8aWbdwC', -1 ],
    [ '12ch__kwTpb8Yby1RzPfPOLr-f0Bi9uZc', -1 ] ] ] */














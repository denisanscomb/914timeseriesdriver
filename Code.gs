function usercreator(){ // gets the user
  
  var ss1 = SpreadsheetApp.openById("1W8ECF6uqytFJJ927CH3Z5-Ki5sYR0mgv69UWHRt-wSk").getSheetByName("Sheet2"); // 1301
  var l1 = ss1.getLastRow();
  var dt1 = ss1.getRange(2,1,l1,1).getValues(); // this is the data history
  var ss = SpreadsheetApp.openById("1a1lle8sE3Rpqp2YjP9UTJtHHD3rboVr4uvtIVpaSG-4").getSheetByName("Sheet1"); // 911 Timestamp Data
  var dts = ss.getRange("a3:az3").getValues();
  var l2 = ss.getLastRow();
  var data = ss.getRange(11,1,l2,52).getValues(); // all the users beside each account 911
  
  for(var x =0; x<60; x++)
  { var trig = dts[0][x];
  // Logger.log(trig)
   if(trig == "no"){
    var d = x;
     var x = 59;
   
   
 // Logger.log("why no d")
 // Logger.log(d)
  var endac = ss.getRange(1,d).getValue(); // start date from sheet
  var tDate = ss.getRange(2,d).getValue(); // end date from sheet
  
  var edt = tDate.valueOf();
  var sdt = endac.valueOf();
  
  var userdetail = SpreadsheetApp.openById("1PDSr53kxFwWGDk9CdEu3KGu8mysSMxtExj7VRXV13nY").getSheetByName("UserList"); // 500 iDatabase
  var userlist = userdetail.getRange(2,2,30,1).getValues();
  for(var i = 0; i < 30; i++){ // ** back to 30
    
    var use = userlist[i][0];
   //Logger.log(use)
    if(use !="") // for each of the up to 30 (?) users in the live file in UserList
    {
      
      for(var t = 0; t<l2; t++)
      { var u = data[t][0];
       //Logger.log(u)
       if(u == use){var uline = t; // gives the first line when the user appears in the 911 timestamp sheet
        var t = l2-1;
        } 
      }
    }
      
   // Logger.log(uline) 
      AutoReportER(dt1,use,edt,sdt,uline,l2,l1,data,d)
    
  }
   }
   
   
  }
  ss.getRange(3,d+1).setValue("");
}



function AutoReportER(dt1,use,edt,sdt,uline,l2,l1,data,d){ // creates a sub array with the user name and defined by the dates

  var col = 3;
  var count = 0;
  
  
  //var nom = ss.getRange(6,1).getValues(); // gets the user name
  //ss.getRange(8,1,500,10).clearContent();
 // var userdetail = SpreadsheetApp.openById("1PDSr53kxFwWGDk9CdEu3KGu8mysSMxtExj7VRXV13nY").getSheetByName(nom); // declares gets the individual sheet from 
 // var length = userdetail.getLastRow();
 // var coredata = userdetail.getRange(3,1,length,2).getValues();
//  ss.getRange(8,1,length,2).setValues(coredata);
  
  //Logger.log(l2)
  
  var sub = new Array(); // creates a new array that is just featuring the user
  for (var h = 1; h<l1; h++){
  var row = dt1[h];
  var lame = row.toString();
   if(lame.indexOf(use)>=0){
     sub.push(row);
     var count = count + 1;
    }
  }
  //Logger.log("size of sub")
  //Logger.log(count)

  var startpoint = 1000000;
  var endpoint = 1000000;
  
  for (var g = 0; g<count; g++){ 
  var row1 = sub[g];
 
  var rts = row1.toString();  // now each input is a searchable string
  var pos = rts.indexOf("GMT-0700 (PDT)"); // will search for the first date in the string
  var time = rts.substring(pos-25,pos+14); // scrapes out the date
 
  var dt6 = new Date(time); // puts the date into a structured form
  var dtform1 = dt6.valueOf(); // turns the date into milliseconds
   
    
   
  if((dtform1 - edt)<0 ){if(g < startpoint){var startpoint = g;}}
  if((sdt - dtform1)>0 ){if(g < endpoint){var endpoint = g;}}
  }
  
  if(startpoint = 1000000){var startpoint = 1;}
  if(endpoint = 1000000){var endpoint = count;}
  Logger.log(startpoint)
  Logger.log(endpoint)
  
  
 dataproc(sub,startpoint,endpoint,l2,edt,sdt,use,uline,data,d) // sub is the subset of events relating to the user, startpoint & endpoint define a further date related subset
 dataproc1(sub,startpoint,endpoint,l2,edt,sdt,use,uline,data,d)

  
}

  
function dataproc(sub,startpoint,endpoint,l2,edt,sdt,use,uline,data,d){
  
   var col = d;
   var roli = 1;
   var ss3 = SpreadsheetApp.openById("1a1lle8sE3Rpqp2YjP9UTJtHHD3rboVr4uvtIVpaSG-4").getSheetByName("Sheet1"); // 911 Timestamp Data
  
  Logger.log(use)
  Logger.log(uline)
  
  
  for (var z = uline; z<l2+1; z++){
    var user = data[z][0];
    Logger.log("proc")
    Logger.log(user)
    if(user != use){z = l2;} // as soon as it moves to a new user the loop ends.
    else if (user == use){
    var count = 0;
    var account = data[z][1];
    var contact = data[z][2];
    
  for (var k = startpoint-1; k<endpoint; k++){ // the range for this report
  var row2 = sub[k];
  
  var lame = row2.toString(); // now each input is a searchable string
  var pos = lame.indexOf("GMT-0700 (PDT)"); // will search for the first date in the string
  var time = lame.substring(pos-25,pos+14); // scrapes out the date
 
  var dt5 = new Date(time); // puts the date into a structured form
  var dtform = dt5.valueOf(); // turns the date into milliseconds
  
    
    if((dtform - sdt)>0 && (edt - dtform)>0){
     
        if(lame.indexOf(contact)>=0 || lame.indexOf(account)>0){ 
         // ss4.getRange(roli,col).setValue(lame);
      var count = count + 1; 
        //  var roli = roli+1
          
      }
    }   
  }
  
 ss3.getRange(z+11,col).setValue(count);
    }
}
}


function dataproc1(sub,startpoint,endpoint,l2,edt,sdt,use,uline,data,d){
  
   var col = d+1;
   var roli = 1;
   var ss3 = SpreadsheetApp.openById("1a1lle8sE3Rpqp2YjP9UTJtHHD3rboVr4uvtIVpaSG-4").getSheetByName("Sheet1"); // 911 Timestamp Data
 
   Logger.log(use)
   Logger.log(uline)
  
    
  for (var z = uline; z<l2+1; z++){
    var user = data[z][0];
    //Logger.log("proc1")
    //Logger.log(user)
    if(user != use){z = l2;} // as soon as it moves to a new user the loop ends.
    else if (user == use){
      //Logger.log("count started")
    var count = 0;
    var account = data[z][1];
    var contact = data[z][2];
    
  for (var k = startpoint-1; k<endpoint; k++){ // the range for this report
  var row2 = sub[k];
  
  var lame = row2.toString(); // now each input is a searchable string
  var pos = lame.indexOf("GMT-0700 (PDT)"); // will search for the first date in the string
  var time = lame.substring(pos-25,pos+14); // scrapes out the date
 
  var dt5 = new Date(time); // puts the date into a structured form
  var dtform = dt5.valueOf(); // turns the date into milliseconds
  
    
    if((dtform - sdt)>0 && (edt - dtform)>0){
      if(lame.indexOf(contact)>=0){
        if(lame.indexOf("indexed4")>0){
         //  ss4.getRange(roli,col).setValue(lame);
         // var roli = roli+1
      
      var count = count + 1; 
          }
        }
    }   
  }
  
 ss3.getRange(z+11,col).setValue(count);
  
} 
  
  }
}

function dataproc2(sub,startpoint,endpoint,l2,edt,sdt){
  
   var col = 5;
   
   var roli = 1;
   var ss3 = SpreadsheetApp.openById("12BM2B3QxVU0sciBqrUCrejVUK5FbIvNxbzdlUx14g7Y").getSheetByName("Account Report");
  // var ss4 = SpreadsheetApp.openById("12BM2B3QxVU0sciBqrUCrejVUK5FbIvNxbzdlUx14g7Y").getSheetByName("Sheet7"); // ***investigation
  for (var z = 8; z<l2+1; z++){
    var count = 0;
    var account = ss3.getRange(z,1).getValues();
    var user = ss3.getRange(z,2).getValues();
    
  for (var k = startpoint-1; k<endpoint; k++){ // the range for this report
  var row2 = sub[k];
  
  var lame = row2.toString(); // now each input is a searchable string
  var pos = lame.indexOf("GMT-0700 (PDT)"); // will search for the first date in the string
  var time = lame.substring(pos-25,pos+14); // scrapes out the date
 
  var dt5 = new Date(time); // puts the date into a structured form
  var dtform = dt5.valueOf(); // turns the date into milliseconds
  
    
    if((dtform - sdt)>0 && (edt - dtform)>0){
      if(lame.indexOf(user)>=0){
        if(lame.indexOf("PASS")>0){
          
        //  ss4.getRange(roli,col).setValue(lame);
        //  var roli = roli+1
      
      
      var count = count + 1; 
          }
        }
    }   
  }
  
 ss3.getRange(z,col).setValue(count);
  
} 
}


function ContactReport(){

  var col = 3;
  var count = 0;
  var ss = SpreadsheetApp.openById("12BM2B3QxVU0sciBqrUCrejVUK5FbIvNxbzdlUx14g7Y").getSheetByName("Account Report"); // 
  var ss2 = SpreadsheetApp.openById("12BM2B3QxVU0sciBqrUCrejVUK5FbIvNxbzdlUx14g7Y").getSheetByName("Sheet7"); // 
  var nom = ss.getRange(6,1).getValues(); // gets the user name
  var user = ss.getRange(6,7).getValue(); // gets specific contact

  var l2 = ss.getLastRow();
  ss.getRange(7,8,1000,3).clearContent();
  
  var ss1 = SpreadsheetApp.openById("1W8ECF6uqytFJJ927CH3Z5-Ki5sYR0mgv69UWHRt-wSk").getSheetByName("Sheet2"); // 1301
  var l1 = ss1.getLastRow();
  var l2 = ss.getLastRow();
  
  var dt1 = ss1.getRange(2,1,l1,1).getValues(); // this is the data history
  var acc = ss.getRange(1,8,l2,2).getValues(); // to get the account to map to the user
  for (var q = 1; q<l2; q++){
    var accrow = acc[q];
    if(accrow[1] == user){
  var account = accrow[0];
      }
  }
  Logger.log(account)
  
  var sub = new Array();
  for (var h = 1; h<l1; h++){
  var row = dt1[h];
  var lame = row.toString();
   if(lame.indexOf(nom)>=0){
     sub.push(row);
     var count = count + 1;
    }
  }
 
  
  var endac = ss.getRange(2,8).getValue(); // end date from sheet
  var tDate = ss.getRange(3,8).getValue(); // start date from sheet
  
  var edt = tDate.valueOf();
  var sdt = endac.valueOf();

  var startpoint = 1000000;
  var endpoint = 1000000;
  
  for (var g = 0; g<count; g++){ 
  var row1 = sub[g];
 
  var rts = row1.toString();  // now each input is a searchable string
  var pos = rts.indexOf("GMT-0700 (PDT)"); // will search for the first date in the string
  var time = rts.substring(pos-25,pos+14); // scrapes out the date
 
  var dt6 = new Date(time); // puts the date into a structured form
  var dtform1 = dt6.valueOf(); // turns the date into milliseconds
   
    
   
  if((dtform1 - edt)<0 ){if(g < startpoint){var startpoint = g;}}
  if((sdt - dtform1)>0 ){if(g < endpoint){var endpoint = g;}}
  }
  
  if(startpoint = 1000000){var startpoint = 1;}
  if(endpoint = 1000000){var endpoint = count;}
  
  
 dataproc3(sub,startpoint,endpoint,l2,edt,sdt) 
 dataproc4(sub,startpoint,endpoint,l2,edt,sdt)
 dataproc5(sub,startpoint,endpoint,l2,edt,sdt)
 
  
}

function dataproc3(sub,startpoint,endpoint,l2,edt,sdt){
  
   var col = 8;
   var roli = 8;
   var ss3 = SpreadsheetApp.openById("12BM2B3QxVU0sciBqrUCrejVUK5FbIvNxbzdlUx14g7Y").getSheetByName("Account Report");
  
    var user = ss3.getRange(6,7).getValues();
    
  for (var k = startpoint-1; k<endpoint; k++){ // the range for this report
  var row2 = sub[k];
  
  var lame = row2.toString(); // now each input is a searchable string
  var pos = lame.indexOf("GMT-0700 (PDT)"); // will search for the first date in the string
  var time = lame.substring(pos-25,pos+14); // scrapes out the date
 
  var dt5 = new Date(time); // puts the date into a structured form
  var dtform = dt5.valueOf(); // turns the date into milliseconds
  
    
    if((dtform - sdt)>0 && (edt - dtform)>0){
      if(lame.indexOf(user)>=0 ){
          
          ss3.getRange(roli,col).setValue(lame);
          var roli = roli+1
      
      
    
          }
        }
    }   
}

function dataproc4(sub,startpoint,endpoint,l2,edt,sdt){
  
   var col = 9;
   var roli = 8;
   var ss3 = SpreadsheetApp.openById("12BM2B3QxVU0sciBqrUCrejVUK5FbIvNxbzdlUx14g7Y").getSheetByName("Account Report");
  
    var user = ss3.getRange(6,7).getValues();
    
  for (var k = startpoint-1; k<endpoint; k++){ // the range for this report
  var row2 = sub[k];
  
  var lame = row2.toString(); // now each input is a searchable string
  var pos = lame.indexOf("GMT-0700 (PDT)"); // will search for the first date in the string
  var time = lame.substring(pos-25,pos+14); // scrapes out the date
 
  var dt5 = new Date(time); // puts the date into a structured form
  var dtform = dt5.valueOf(); // turns the date into milliseconds
  
    
    if((dtform - sdt)>0 && (edt - dtform)>0){
      if(lame.indexOf(user)>=0 && lame.indexOf("indexed2")>0){
          
          ss3.getRange(roli,col).setValue(lame);
          var roli = roli+1
      
      
    
          }
        }
    }   
}


function dataproc5(sub,startpoint,endpoint,l2,edt,sdt){
  
   var col = 10;
   var roli = 8;
   var ss3 = SpreadsheetApp.openById("12BM2B3QxVU0sciBqrUCrejVUK5FbIvNxbzdlUx14g7Y").getSheetByName("Account Report");
  
    var user = ss3.getRange(6,7).getValues();
    
  for (var k = startpoint-1; k<endpoint; k++){ // the range for this report
  var row2 = sub[k];
  
  var lame = row2.toString(); // now each input is a searchable string
  var pos = lame.indexOf("GMT-0700 (PDT)"); // will search for the first date in the string
  var time = lame.substring(pos-25,pos+14); // scrapes out the date
 
  var dt5 = new Date(time); // puts the date into a structured form
  var dtform = dt5.valueOf(); // turns the date into milliseconds
  
    
    if((dtform - sdt)>0 && (edt - dtform)>0){
      if(lame.indexOf(user)>=0 && lame.indexOf("PASS")>0){
          
          ss3.getRange(roli,col).setValue(lame);
          var roli = roli+1
      
      
    
          }
        }
    }   
}


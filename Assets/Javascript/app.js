// Setup Firebase Config
var config = {
    apiKey: "AIzaSyAzFwL3w9FmSuopiAy4nY2NtlBj9YqWVQY",
    authDomain: "super-awesome-project-cc7c4.firebaseapp.com",
    databaseURL: "https://super-awesome-project-cc7c4.firebaseio.com",
    projectId: "super-awesome-project-cc7c4",
    storageBucket: "super-awesome-project-cc7c4.appspot.com",
    messagingSenderId: "863944090108"
};
firebase.initializeApp(config);


// Setup Global Variables
var database = firebase.database();
var firstTrain = 0;
var freq = 0;
var remainingTime = 0;
var diffTime = 0;
// initializing moment.js
moment().format();
console.log(moment());

// Get a snapshot of Firebase Data
database.ref().on("value", function (snapshot) {
    console.log(snapshot.val());
});
// Jquery form Inputs
$("#tForm").on("submit", function (event) {
    event.preventDefault();
    var name = $("#trainName").val();
    console.log("Train name: " + name);
    var dest = $("#trainDestination").val();
    console.log("Train Destination" + dest);
    var firstTrain = $("#trainFirst").val();
    console.log("First Train Time: " + firstTrain);
    var freq = $("#trainFrequency").val();
    console.log("Train Frequency (Mins)" + freq);
    database.ref().push({
        name: name,
        dest: dest,
        freq: freq,
        firstTrain: firstTrain,
    });

});
// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")

database.ref().on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log("Reading Values");
    var name = childSnapshot.val().name;
    console.log("Trian Name: " + name);
    var dest = childSnapshot.val().dest;
    console.log("Trian Destination: " + dest);
    var freq = childSnapshot.val().freq;
    console.log("Trian Frequency: " + freq);
    var firstTrain = childSnapshot.val().firstTrain;
    console.log("First Train (mins): " + firstTrain);
var obj = 0;
    var newtr = $("<tr>");
    var newtd = $("<td>");
    var soonTD = $("<td>", {style:'background-color:#FF0000'});

    // show name in table
    newtd.append(childSnapshot.val().name);
    newtr.append(newtd);
    newtd = $("<td>");
    // show role in table
    newtd.append(childSnapshot.val().dest);
    newtr.append(newtd);
    newtd = $("<td>");
    // show start date in table
    newtd.append(childSnapshot.val().freq);
    newtr.append(newtd);
    newtd = $("<td>");
    // Show the first train start time
    newtd.append(childSnapshot.val().firstTrain);
    newtr.append(newtd);
    newtd = $("<td>");
    // calculate the minutes away train time
    // First Train Time
    var firstTimeConverted = moment(firstTrain, 'HH:mm');
    console.log(" First Time Converted: " + firstTimeConverted);
    //  Set Var to Current Time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format('HH:mm'));
    // Get Difference between current time and first train time
    var diffTime = currentTime.diff(firstTimeConverted, "minutes");
    console.log("Differnce in Time: " + diffTime);
    // Show the remaining time
    var remainingTime = diffTime % freq;
    console.log("Remaining Time: " + remainingTime);
    // calculate the minutes until the next train
    var minutesTillTrain = freq - remainingTime;
    console.log('Minutes until next train123: ' + minutesTillTrain);
    if(minutesTillTrain <= 2) {
        //  Display the next train time minutes in red if less than 2 minutes away
        soonTD.append(minutesTillTrain);
        newtr.append(soonTD);
        newtd = $("<td>")
    } else {
        // display the next train time in minutes
        newtd.append(minutesTillTrain);
        newtr.append(newtd);
        newtd = $("<td>");
    }
    ;
    // calcualte the exact time the next train will arrive (local Time)
    var nexttrain = currentTime.add(minutesTillTrain, "minutes").format('hh:mm A');
    console.log("Next Arrival Time: " + nexttrain);
    newtd.append(nexttrain);
    newtr.append(newtd);
    newtd = $("<td>");

newtd = $("<td>");
$("tbody").append(newtr);
});


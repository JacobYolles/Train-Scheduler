$(document).ready(function() {

    // LOAD FIREBASE:
  var config = {
    apiKey: "AIzaSyD3IJWGZVt6nfGeMNNtibr4yYElQmVl8ac",
    authDomain: "train-scheduler-7002e.firebaseapp.com",
    databaseURL: "https://train-scheduler-7002e.firebaseio.com",
    projectId: "train-scheduler-7002e",
    storageBucket: "train-scheduler-7002e.appspot.com",
    messagingSenderId: "234382501826"
  }; // CONFIG END.
  firebase.initializeApp(config);

// CREATE DATABASE REFERENCE FOR FIREBASE

var database = firebase.database();

// CREATE AN ON CLICK FUNCTION: 
$("#add-train-btn").on("click", function(event) {
  // PREVENTS THE APP FROM SENDING
  event.preventDefault();
  //GRAB THE FORM INPUT ON THE TRAIN
  // CHANGES THE HTML
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = $("#first-train-input").val().trim(); // CHANGE TO TRAIN FIRST TIME
  var trainRate = $("#frequency-input").val().trim(); // CHANGE TO TRAIN FREQUENCY
  // CREATES THE TEMPORARY VARIABLE FOR HOLDING THE DATA OF THE TRAIN, THIS ALLOWS IT TO BECOME MULTIPLE SUBMISSIONS.
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    rate: trainRate
  }; // END FOR THE NEW TRAIN VARIABLE
  //PUSH THE DATA THE IS THERE TO THE NEW TRAIN VARIABLE.
  // DATABASE .REF .push
  database.ref().push(newTrain);

  // CLEARS ALL OF THE DATA AFTER THE FORM IS SUBMITTED.
  $("#train-name-input").val(""); // TRAIN NAME
  $("#destination-input").val("");  // TRAIN DESTINATION
  $("#first-train-input-input").val("");  //FIRST TRAIN TIME
  $("#frequency-input").val("");  // TRAIN FREQUENCY
}); // END OF THE ON CLICK EVENT.
//
database.ref().on('child_added', getData, error);

function getData(snapshot) {
  var data = snapshot.val();

  var startTime = moment(data.start, 'HH:mm');
  console.log(startTime);
  var difference = moment().diff(moment(startTime), 'minutes');
  console.log(difference);
  var remainder = difference % parseInt(data.rate);
  console.log(remainder);
  var minutesAway = parseInt(data.rate) - remainder;
  console.log(minutesAway);
  var nextArrival = moment().add(minutesAway, 'minutes');
  nextArrival = moment(nextArrival).format('HH:mm');
  console.log(nextArrival);

} // END OF THE FUNCTION GET DATA(SNAPSHOT) FUNCTION.

}); // DOCUMENT READY FUNCTION END.
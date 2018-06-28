var config = {
    apiKey: "AIzaSyC7BlFg2lu6swS2QM1JeZR0acgUk-MVFn4",
    authDomain: "week7homework-2045f.firebaseapp.com",
    databaseURL: "https://week7homework-2045f.firebaseio.com",
    projectId: "week7homework-2045f",
    storageBucket: "week7homework-2045f.appspot.com",
    messagingSenderId: "879662765221"
};

firebase.initializeApp(config);

dataref = firebase.database();

var currentTime = moment()

$("#submittrain").on("click", function (event) {
    var trainName = $("#trainname").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firsttraintime").val().trim();
    var frequency = parseInt($("#frequency").val().trim());
    var firstTimeConvert = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConvert + " ftc")
    var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
    console.log(diffTime + " diftime");
    var tRemainder = diffTime % frequency;
    console.log(tRemainder + " tremain")
    console.log(frequency)
    var minAway = frequency - tRemainder;
    console.log(minAway + " final");
    var preNextArrival = moment().add(minAway, "minutes");
    console.log(preNextArrival + " lord save me")
    var nextArrival = moment(preNextArrival).format("hh:mm");
    console.log(nextArrival + " last effort")
    var tbody = $("tbody");


    event.preventDefault();

    var newRow = $("<tr><td>" + trainName + "</td><td>" + destination + 
        "</td><<td>" + frequency + "</td><td>" + nextArrival + 
        "</td><td>" + minAway + "</td></tr>");
    //tbody.append(newRow);

    var trainInfo = {
        train_name: trainName,
        d_estination: destination,
        first_train_time: firstTrainTime,
        f_requency: frequency,
        next_arrival: nextArrival,
        min_away: minAway,
    }

    dataref.ref().push({
        trainInfo
    });

    $("#trainname").val("");
    $("#destination").val("");
    $("#firsttraintime").val("");
    $("#frequency").val(0);
});

dataref.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainInfo.train_name;
    var destination = childSnapshot.val().trainInfo.d_estination;
    var frequency = childSnapshot.val().trainInfo.f_requency;
    var nextArrival = childSnapshot.val().trainInfo.next_arrival;
    var minAway = childSnapshot.val().trainInfo.min_away;
    var tbody = $("tbody");

    var newRow = $("<tr><td>" + trainName + "</td><td>" + destination + 
    "</td><<td>" + frequency + " minutes </td><td>" + nextArrival + 
    "</td><td>" + minAway + "</td></tr>");
    tbody.append(newRow);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);

});
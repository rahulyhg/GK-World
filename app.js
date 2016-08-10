(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBb9ZBTaQ0gZRGxFNCR5Do7wSfaX4kDlNw",
    authDomain: "gk-india.firebaseapp.com",
    databaseURL: "https://gk-india.firebaseio.com",
    storageBucket: "gk-india.appspot.com",
  };
  firebase.initializeApp(config);

  //Get the Elements
  const textIndia=document.getElementById('textIndia');
  const btnIndia=document.getElementById('btnIndia');
  const lblIndia=document.getElementById('lblIndia');
  //Get Element for File Upload
  //const progressBar=document.getElementById('p2');
  //const fileButton=document.getElementById('fileButton');

  //Create Reference of Firebase Database
  const dbRefObject = firebase.database().ref().child('aboutIndia');

  //Insert Data Changes to firebase database
  btnIndia.addEventListener('click',function(){
    dbRefObject.set(textIndia.value);
    textIndia.value='';
  });

  //print data to dashboard from firebase database
  dbRefObject.on('value',function(snapshot){
    lblIndia.innerText=snapshot.val();
  });

  //listen for the file selection
  var uploader=document.getElementById('uploader');
  var fileButton=document.getElementById('fileButton');

  fileButton.addEventListener('change', function(e){
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('AboutIndiaImages/AboutIndia.png');
    var task= storageRef.put(file);

    task.on('state_changed',
      function progress(snapshot){
        var per=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        uploader.value=per;
      },
      function error(err){

      },
      function complete(){

      }
    );

  });

}());

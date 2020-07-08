import 'bootstrap';
import './../css/styles.css';
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Person} from './person-class';
import {DayActivity} from './day-activity';
import {AerobicExercise} from './aerobic-exercise';
import {StrengthExercise} from './strength-exercise';
import {OurCharts} from './OurCharts'

// Maybe won't use these
// import './css/font-awesome.min.css';
//import '../css/aos.css';
//import '../css/tooplate-gymso-style.css';

/*function getFullDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; //"7 7 2020"
}*/

$(document).ready(function() {
  let person;
  // Test Data
  let testPerson = new Person("Test", "155")
  testPerson.addDayActivity(new DayActivity("2020-07-08"));
  testPerson.addDayActivity(new DayActivity("2020-07-07"));
  testPerson.addDayActivity(new DayActivity("2020-07-06"));
  testPerson.addDayActivity(new DayActivity("2020-07-05"));
  testPerson.findDayActivityObject("2020-07-08").addAerobicActivity(new AerobicExercise("walking", "20", "11", "Slow"));
  testPerson.findDayActivityObject("2020-07-07").addAerobicActivity(new AerobicExercise("walking", "25", "9", "Slow"));
  testPerson.findDayActivityObject("2020-07-06").addAerobicActivity(new AerobicExercise("walking", "34", "10", "Slow"));
  testPerson.findDayActivityObject("2020-07-05").addAerobicActivity(new AerobicExercise("walking", "15", "9", "Slow"));

  let strengthExercise;
  let aerobicExercise; 
  let newDayActivity;
  let chart = new OurCharts();

  $(".membership-form").submit(function(event) {
    event.preventDefault();
    let nameInput = $("#name").val();
    let weightInput = parseInt($("#weight").val());
    person = new Person (nameInput, weightInput);
    console.log(person);
  });

  $("#strength-exercise-form").submit(function(event) {
    event.preventDefault();
    let strengthType = $("#strength-type").val();
    let reps = parseInt($("#reps").val());
    let sets = parseInt($("#sets").val());
    //make date input required or default !?!?!??!
    let date = $("#strength-exercise-date").val();
    strengthExercise = new StrengthExercise(strengthType, sets, reps);
    if(!person.findDayActivityObject(date)) {
      newDayActivity = new DayActivity(date);
      person.addDayActivity(newDayActivity);
      newDayActivity.addStrengthActivity(strengthExercise);
    } else {
      person.findDayActivityObject(date).addStrengthActivity(strengthExercise);
    }
    console.log(newDayActivity);
    console.log(person);
  });

  $("#aerobic-exercise-form").submit(function(event) {
    event.preventDefault();
    let aerobicType = $("#aerobic-type").val();
    let time = parseInt($("#time").val());
    let distance = parseInt($("#distance").val());
    let intensity = $("#intensity").val();
    let date = $("#aerobic-exercise-date").val();
    aerobicExercise = new AerobicExercise(aerobicType, time, distance, intensity);
    if(!person.findDayActivityObject(date)) {
      newDayActivity = new DayActivity(date);
      person.addDayActivity(newDayActivity);
      newDayActivity.addAerobicActivity(aerobicExercise);
    } else {
      person.findDayActivityObject(date).addAerobicActivity(aerobicExercise);
    }
    console.log(newDayActivity);
    console.log(person);
  });

  $("input[name$='exercise-type']").click(function(){
    let radio_value = $(this).val();
    if(radio_value=='muscle') {
      $("#aerobic-exercise-divider").hide("slow");
      $("#strength-exercise-divider").show("slow");
    } else if(radio_value=='aerobic') {
      $("#strength-exercise-divider").hide("slow");
      $("#aerobic-exercise-divider").show("slow");
    }
  });

  $('[name="exercise-type"]:checked').trigger('click');

  $('#aerobic-calorie-burn-chart').click(function(){
    chart.calorieLineChart(testPerson);
    $('#myChart').show();
  });

});
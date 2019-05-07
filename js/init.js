

function loadData() {
	$.getJSON( "https://morphkurt-strava-api.herokuapp.com/stravaapi/activities/run/weekly", function( json ) {
  		let weeklyData=json;
		let fdow = createWeeklyData();
  		renderWeeklyLoadGraph(weeklyData,fdow);
  		renderWeeklyPerformanceGraph(weeklyData,fdow);
  		renderWeeklyPerformanceSpeedGraph(weeklyData,fdow);
	});
}


$( document ).ready(function() {
	loadData();
	//renderWeeklyPerformanceGraph(weeklyData);
});


function createWeeklyData(){
	let endDate = new Date(); // today
	
	let startDate = new Date();
	startDate.setDate( endDate.getDate() - 365 );
	let firstDayOfWeek = [] ;
	for (let day = startDate;day <= endDate; day.setDate(day.getDate() + 7)) {
	     firstDayOfWeek.push(getMonday(day).setHours(0,0,0,0)); 
	}
	//console.log(firstDayOfWeek);
	return firstDayOfWeek;
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

window.Cartlidge = window.Cartlidge || {};
window.Cartlidge.F1 = window.Cartlidge.F1 || {};
window.Cartlidge.F1.DataLoader = window.Cartlidge.F1.DataLoader || {};

window.Cartlidge.F1.DataLoader.Drivers = function (jQuery) {
	'use strict';

	var preconditions = Cartlidge.F1.utils.preconditions,
		driverInfoQuery = 'http://ergast.com/api/f1/drivers/{0}.json?callback=?',
		driveRaceResultQuery = 'http://ergast.com/api/f1/{0}/drivers/{1}/results.json?callback=?',

		getDriverInformation = function (driverCode, callback) {
			preconditions.checkArgument(driverCode, "Argument: 'driverCode' may not be null");
			preconditions.checkArgument(callback, "Argument: 'callback' may not be null");

			var query = driverInfoQuery.format(driverCode);

			jQuery.getJSON(query, function (data) {
				var driversTable = data.MRData.DriverTable.Drivers,
					result,
					driverInfoModel;

				if (driversTable !== null && driversTable.length === 1) {
					result = driversTable[0];

					driverInfoModel = {
						id : result.driverId,
						code : result.code,
						firstName : result.givenName,
						surname : result.familyName,
						dob : result.dateOfBirth
					};

					callback(driverInfoModel);
				}
			});

		},

		getDriverRaceResults = function (driverCode, year, round, callback) {
			preconditions.checkArgument(driverCode, "Argument: 'driverCode' may not be null");
			preconditions.checkArgument(year, "Argument: 'year' may not be null");
			preconditions.checkArgument(year, "Argument: 'round' may not be null");
			preconditions.checkArgument(callback, "Argument: 'callback' may not be null");

			var query = driveRaceResultQuery.format(year, driverCode);

			jQuery.getJSON(query, function (data) {
				var raceResults = data.MRData.RaceTable.Races,
					info,
					raceResultModel,
					i;

				if (raceResults !== null && raceResults.length >= round) {
					for (i = 0; i < raceResults.length; i += 1) {
						if (parseInt(raceResults[i].round, 10) === round) {
							info = raceResults[i];

							raceResultModel = {
								driverId : driverCode,
								circuitId : info.Circuit.circuitId,
								round : info.round,
								gridPosition : info.Results[0].grid,
								finishingPosition : info.Results[0].position
							};

							break;
						}
					}

					callback(raceResultModel);
				}
			});
		};

	return {
		getDriverInformation : getDriverInformation,
		getDriverRaceResults : getDriverRaceResults
	};
};
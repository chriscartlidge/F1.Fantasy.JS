window.Cartlidge = window.Cartlidge || {};
window.Cartlidge.F1 = window.Cartlidge.F1 || {};
window.Cartlidge.F1.DataLoader = window.Cartlidge.F1.DataLoader || {};

window.Cartlidge.F1.DataLoader.Constructors = function (jQuery) {
	'use strict';

	var preconditions = Cartlidge.F1.utils.preconditions,
		constructorsInfoQuery = 'http://ergast.com/api/f1/constructors/{0}.json?callback=?',
		constructorsForYearQuery = 'http://ergast.com/api/f1/{0}/constructors.json?callback=?',

		getConstructorInformation = function (constructorName, callback) {
			preconditions.checkArgument(constructorName, "Argument: 'constructorName' may not be null");
			preconditions.checkArgument(callback, "Argument: 'callback' may not be null");

			var query = constructorsInfoQuery.format(constructorName);

			jQuery.getJSON(query, function (data) {
				var constructorsTable = data.MRData.ConstructorTable.Constructors,
					result,
					constructorsInfoModel;

				if (constructorsTable !== null && constructorsTable.length === 1) {
					result = constructorsTable[0];

					constructorsInfoModel = {
						id : result.constructorId,
						name : result.name,
						nationality : result.nationality
					};

					callback(constructorsInfoModel);
				}
			});
		},

		getConstructorsForYear = function (year, callback) {
			preconditions.checkArgument(year, "Argument: 'constructorName' may not be null");
			preconditions.checkArgument(callback, "Argument: 'callback' may not be null");

			var query = constructorsForYearQuery.format(year);

			jQuery.getJSON(query, function (data) {
				var constructorsTable = data.MRData.ConstructorTable.Constructors,
					result,
					i,
					current,
					constructors = [];

				if (constructorsTable !== null && constructorsTable.length > 0) {
					for (i = constructorsTable.length - 1; i >= 0; i -= 1) {
						current = constructorsTable[i];
						result = {
							id : current.constructorId,
							name : current.name,
							nationality : current.nationality,
							year : year
						};
						constructors.push(current);
					}

					callback(constructors);
				}
			});
		};

	return {
		getConstructorInformation : getConstructorInformation,
		getConstructorsForYear : getConstructorsForYear
	};

};
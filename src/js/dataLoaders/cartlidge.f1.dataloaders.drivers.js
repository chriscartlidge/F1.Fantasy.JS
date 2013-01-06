window.Cartlidge = window.Cartlidge || {};
window.Cartlidge.F1 = window.Cartlidge.F1 || {};
window.Cartlidge.F1.DataLoader = window.Cartlidge.F1.DataLoader || {};

window.Cartlidge.F1.DataLoader.Drivers = function (jQuery) {
	'use strict';

	var preconditions = Cartlidge.util.preconditions,
		baseDriverQuery = 'http://ergast.com/api/f1/drivers/{0}.json',

		getDriverInformation = function (driverName, callback) {
			preconditions.checkArgument(driverName, "Argument: 'driverName' may not be null");
			preconditions.checkArgument(callback, "Argument: 'callback' may not be null");

			var query = baseDriverQuery.format(driverName);

			jQuery.getJSON(function (data) {

			});

		};

	return {
		getDriverInformation : getDriverInformation
	};
};
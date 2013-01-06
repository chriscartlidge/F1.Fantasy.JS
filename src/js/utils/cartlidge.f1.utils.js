window.Cartlidge = window.Cartlidge || {};
window.Cartlidge.F1 = window.Cartlidge.F1 || {};

window.Cartlidge.F1.Utils = function (jQuery) {
	'use strict';

	var preconditions = {
		checkArgument : function (value, message) {
			if (value === null || value === undefined || value === '') {
				throw message;
			}
		}
	};

	String.prototype.format = function () {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function (match, number) { 
		return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};

	return {
		preconditions : preconditions
	};
};
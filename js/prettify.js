var app = angular.module('racketPrettify', []);

app.controller('mainCtrl', ['$scope', function($scope) {

	$scope.heading = "Make your Racket code 'pretty'";

	$scope.submit = function(text) {
		var linesArr = text.split("\n");
		var newArr = [];
		for (i in linesArr) {
			newArr = newArr.concat(breakLines(linesArr[i]));
		}
		console.log(newArr)
	}

	function breakLines(line) {
		var brokenLines = [];
		var max = 0;
		var index = line.length;
		if (line.length >= 70) {
			for (var i = 1; i < 70; i++) {
				var diff = splitDiffNum(line, i);
				if (diff >= max) {
					max = diff;
					index = i;
				}
			}
			var spaces = index - max;
			brokenLines = [line.substring(0, index)];
			return brokenLines.concat(breakLines(addSpaces(spaces, line.substring(index))));
		}
		return line.substring(0, index);
	}

	function addSpaces(num, text) {
		var acc = ""
		for (i = 0; i < num; i++) {
			acc += " ";
		}
		return acc += text;
	}
	

	function splitDiffNum(line, index) {
		var letter = line.substring(index, index+1);
		var preLetter = line.substring(index-1, index);
		var endLetter = null;
		var count = 1;
		var tempCount = -1;
		if ((letter == "(" || letter == "[" || preLetter == " ") && letter != " ") {
			var isLetter = false;
			var isParen = 0;
			for (i = index-1; i >= 0; i--) {
				var current = line.substring(i, i+1);

				if (i != 0) {
					var prev = line.substring(i-1, i);
				} else {
					var prev = null;
				}

				if (current == ")" || current == "]") {
					isParen++;
				} else if (current == "(" || current == "[") {
					isParen--;
				}

				if (isParen == 0 && prev == " " && current != " ") {
						tempCount = count;

				} else if (isParen < 0) {
					if (tempCount == -1) {
						return count-1;
					} else {
						return tempCount;

					}
				}
				count++;
			}
		}
		return count;
	}

}]);
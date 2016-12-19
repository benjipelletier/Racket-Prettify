var app = angular.module('racketPrettify', []);

app.controller('mainCtrl', ['$scope', function($scope) {

	$scope.heading = "Make your Racket code 'pretty'";
	$scope.linesArr = [];

	$scope.submit = function(text) {
		$scope.linesArr = text.split("\n");
		for (i in $scope.linesArr) {
			console.log($scope.linesArr[i]);
		}
	}

console.log(breakLines("      (overlay (rest lower) upper (add1 row) (cons (first lower) acc))"));
	function breakLines(line) {
		var brokenLines = [];
		var max = 0;
		var index = line.length;
		if (line.length >= 70) {
			for (var i = 1; i < 70; i++) {
				var diff = splitDiffNum(line, i);
				console.log(diff)
				if (diff >= max) {
					max = diff;
					index = i;
				}
			}
			var spaces = index - max - 1;
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
		var count = 0;
		if ((letter == "(" || preLetter == " ") && letter != " ") {
			var isLetter = false;
			var isParen = false;
			for (i = index-1; i >= 0; i--) {
				var current = line.substring(i, i+1);
				if (!isLetter && !isParen) {
					if (current == ")") {
						isParen = 1;
					}
					else if (current != " ") {
						isLetter = true;
					}
				} else if (isLetter) {
					if (current == "(" || current == " ") { 
						break;
					}
				} else {
					if (current == ")") {
						isParen++;
					} else if (current == "(") {
						isParen--;
					}
					if (isParen == 0) {
						break;
					}
				}
				count++;
			}
		}
		return count;
	}

}]);
var _intervals = [];

/**
 * Get back input value, change them to integer, and verify their validity.
 */
function _getAndCheckValues() {
  var values = {
    from: parseInt(document.getElementById('from').value),
    to: parseInt(document.getElementById('to').value)
  };

  if ((isNaN(values.from) || isNaN(values.to)) || (values.from >= values.to)) {
    swal("Oops!", "You should provide valid integer values! \n'From' should be less than 'To'!", "error");
    return false;
  }
  return values;
}

function addInterval() {
  var values          = _getAndCheckValues();
  var newIntervalList = [];
  var hasBeenAdded    = false;

  if (values) {
    if (!_intervals.length) newIntervalList.push([values.from, values.to]);
    else {
      _intervals.forEach(function(interval) {
        // if the new interval is bigger than the current one, we add the current interval in the new list
        // example: currentList = [[1, 3]]; add(5,6)
        if (interval[1] < values.from) newIntervalList.push(interval);

        // if the new interval is smaller than the current one, wee add the new one in the new list, then the previous one.
        // if we add it to the list, we set the hasBeenAdded variable to true, to avoid duplicate in case or further bigger interval
        // example: currentList = [[6, 9]]; add(3,5)
        if (values.to < interval[0]) {
          if (!hasBeenAdded) newIntervalList.push([values.from, values.to]);
          newIntervalList.push(interval);
          hasBeenAdded = true;
        }

        // if the new interval has an union with the current one, we compare and change the new one
        // with the lowest/highest from/to values and add it at the end
        // example: currentList = [[1,4][5,9]]; add(3,7)
        if ((interval[0] <= values.from && values.from <= interval[1]) || (interval[0] <= values.to && values.to <= interval[1])) {
          values.from = values.from <= interval[0] ? values.from : interval[0];
          values.to = values.to >= interval[1] ? values.to : interval[1];
        }
      });

      // if the new interval didn't match any condition, it should be addded at the end of the array
      if (!hasBeenAdded) newIntervalList.push([values.from, values.to]);
    }

    _intervals = newIntervalList;
    document.getElementById('result').innerHTML = JSON.stringify(_intervals);
  }
}

function removeInterval() {
  var values          = _getAndCheckValues();
  var newIntervalList = [];
  var newInterval     = '';

  if (values) {
    _intervals.forEach(function(interval) {
      // first case: if the from and to values are inside the interval. We split and create a new Interval
      // example: [[1,5]]; remove(2,3); [[1,2][3,5]]
      if ((interval[0] < values.from && values.from < interval[1]) && (interval[0] < values.to && values.to < interval[1])) {
          newInterval = [values.to, interval[1]];
          interval[1] = values.from < interval[1] ? values.from : interval[1];

          newIntervalList.push(interval)
          newIntervalList.push(newInterval);
      }
      // second case - A: if the new `from` value is inside the interval.
      // we update the current interval `to` value with the new value, and change the new from value with the current interval to value,
      // so that in the next turn of the loop, it will match the next case
      // example: [[1,2][3,9]]; remove(4,7); result = [[1,2][3,4][7,9]]
      else if (interval[0] < values.from && values.from < interval[1]) {
        interval[1] = values.from < interval[1] ? values.from : interval[1];
        values.from = interval[1];
        newIntervalList.push(interval)
      }
      // second case - B: if the new `to` value is inside the interval. (second step of the second case)
      // we create a new interval with the new `to` value and the current interval `to` value.
      // example: [[1,2][3,9]]; remove(4,7); result = [[1,2][3,4][7,9]]
      else if (interval[0] < values.to && values.to < interval[1]) {
        newIntervalList.push([values.to, interval[1]])
      }
      // third case: if the current interval is inside the interval to remove, we don't add it,
      // if not, we add it.
      // example: [[6,12],[15,16],[17,18]]; remove(14,17); result = [[6,12],[17,18]])
      else if (!(values.from <= interval[0] && interval[1] <= values.to)) {
        newIntervalList.push(interval)
      }
    });

    _intervals = newIntervalList;
    document.getElementById('result').innerHTML = JSON.stringify(_intervals);
  }
}

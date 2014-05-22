define(function(require, exports, module){

    function _isDate(obj){
        // taken directly from underscore.js to avoid the _ dependency.
        // perhaps this should be moved to datetime?
        return Object.prototype.toString.call(obj) == '[object Date]';
    }

    function firstOfMonth(year, month){

        if(_isDate(year)){
            return new Date(year.getFullYear(), year.getMonth(), 1);
        }

        if (!year && !month){
            var now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
        } else {

            // javascript months are 0 based, 0 would be January
            // the interface here expects 1 for January.
            month = month - 1;
        }

        return new Date(year, month, 1);
    }

    function previousMonthForYearMonth(year, month){
        var date = new Date(year, (month - 1), 1);
        return previousMonthForDate(date);
    }

    function nextMonthForYearMonth(year, month){
        var date = new Date(year, (month - 1), 1);
        return nextMonthForDate(date);
    }

    function previousMonthForDate(date){
        // day zero represents the last day of the previous month
        return new Date(date.getFullYear(), date.getMonth(), 0);
    }

    function nextMonthForDate(date){

        if(date.getDate() != 1){
            date = new Date(date.getFullYear(), date.getMonth(), 1);
        }

        var startTZ = date.getTimezoneOffset();
        var endTZ;

        var days = daysInJavaScriptMonth(date.getFullYear(), date.getMonth());
        result  = new Date(date.getTime() + ((86400 * (days)) * 1000));

        endTZ = result.getTimezoneOffset();
        var tzShift = (endTZ - startTZ) * 60 * 1000;

        return new Date(result.getTime() + tzShift);
    }

    function daysInJavaScriptMonth(year, month){
        /* month here is a JavaScript month,
        aka 0 based index starting from January
        */

        if (!year && !month){
            var now = new Date();
            year = now.getFullYear();
            month = now.getMonth();
        }

        // JS is 0 based months, 0 = January
        // passing 0 for the day in the below is syaing
        // give me the last day of the previous month.
        // So we need to add 1 to our month, so that
        // "last month", is effectively the request month.

        month = month + 1;

        var d = new Date(year, month, 0);
        return d.getDate();
    }

    function calendarMonthDays(year, month, options){
        options = options || {};
        var firstDayOfWeek = options.firstDayOfWeek || 0;
        var useDates = options.useDates || false;

        var date = _isDate(year) ? year : firstOfMonth(year, month);
        var days = daysInJavaScriptMonth(date.getFullYear(), date.getMonth());

        if(date.getDate() != 1){
            date = new Date(date.getFullYear(), date.getMonth(), 1);
        }

        var first = date.getDay();
        // var weekdaysCount = date.getDay() - firstDayOfWeek;
        // if (weekdaysCount == -1) weekdaysCount = 6;

        var result = [];

        // push in undefined's to represent where the month
        // should start.
        // for(var i = 0; i < weekdaysCount; i++){
        //     result.push(undefined);
        // }

        year = date.getFullYear();
        month = date.getMonth();

        for(i = 1; i <= days; i++) {
            result.push(useDates ? new Date(year, month, i) : i);
        }

        return result;
    }

    function bufferedCalendarMonthDays(year, month, options){
        /* Returns a 42 (7x6) item array representing the last
        days of the previous month, the days of the desired month
        and the first days of the next month.

        This is intended to be used to build a 7x6 block calendar
        representation. If you just want the days for the current month,
        omitting the prefix and duffix days, use calendarMonthDays()
        */
        options = options || {};
        options.firstDayOfWeek = options.firstDayOfWeek || 0;
        options.useDates = options.useDates || false;

        if(options.prefixDays === undefined){
            options.prefixDays = true;
        }

        if(options.suffixDays === undefined){
            options.suffixDays = true;
        }

        var firstDayOfWeek = options.firstDayOfWeek;
        var useDates = options.useDates;
        var date = _isDate(year) ? year : firstOfMonth(year, month);

        if(date.getDate() != 1){
            date = new Date(date.getFullYear(), date.getMonth(), 1);
        }

        var weekdaysCount = date.getDay() - firstDayOfWeek;

        if (weekdaysCount == -1) weekdaysCount = 6;

        var lastMonth = previousMonthForDate(date);
        var nextMonth = nextMonthForDate(date);

        var results = [];
        var week = [];
        var value;

        // days last month
        for(var i = 0; i < weekdaysCount; i++) {
            var day = lastMonth.getDate() - (weekdaysCount - i) + 1;
            var d = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), day);
            value = useDates ? d : d.getDate();
            results.push(options.prefixDays ? value : undefined);
        }

        results = results.concat(calendarMonthDays(date, null, options));

        // days next month to round us off to 6 weeks
        var nextMonthYear = nextMonth.getFullYear();
        var nextMonthMonth = nextMonth.getMonth();
        var nextMonthDay = 1;

        while(results.length < 42){
            value = useDates ? new Date(nextMonthYear, nextMonthMonth, nextMonthDay) : nextMonthDay;
            results.push(options.suffixDays ? value : undefined);
            nextMonthDay++;
        }

        return results;
    }

    function bufferedCalendarMonthWeeks(year, month, options){
        var days = bufferedCalendarMonthDays(year, month, options);
        return _splitDaysToWeeks(days);
    }

    function _splitDaysToWeeks(days, result){
        result = result || [];

        while (days.length){
            result.push(days.splice(0, 7));
        }

        return result;
    }

    exports.daysInJavaScriptMonth = daysInJavaScriptMonth;
    exports.calendarMonthDays = calendarMonthDays;
    exports.bufferedCalendarMonthDays = bufferedCalendarMonthDays;
    exports.bufferedCalendarMonthWeeks = bufferedCalendarMonthWeeks;
    exports.previousMonthForYearMonth = previousMonthForYearMonth;
    exports.previousMonthForDate = previousMonthForDate;
    exports.nextMonthForYearMonth = nextMonthForYearMonth;
    exports.nextMonthForDate = nextMonthForDate;
    exports.firstOfMonth = firstOfMonth;
});

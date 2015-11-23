'use strict';

angular.module('app.parseFactory', [])

/*****************************************************************
*
* User factory
*
******************************************************************/
.factory('Parse', function() {
  
  var regex = {
    date: /on (\d\d) (jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    supermarkets: /(SAINSBURYS|tesco|co-op|waitrose|M&S)/i,
    social: /(Inn|Pub|The Red Lion|LIBERTY BOUNDS|MILE CASTLE|EL MEXICANA|GLASS HOUSE|SCENARIO|THE ARCH CLIMBING|COUNTING HOUSE|Crosse Keys|ALL BAR ONE|METROPOLITAN)/i,
    lunch: /(Subway|CLIFTON EXPRESS|NORTHUMBRIA UNIVER|MCDONALDS|NATIONAL TRUST|NORWICH CATERING|COSTA|THE PASTY SHOP|eat|the restaurant cha|PRET A MANGER|FINE BURGER COMPAN|CH&CO CATERING) /i
  }

  return {

    income: function(item) {

      item.parsed = {
        amount: Number(item.Amount),
        // Convert dd/mm/yy to yyyy-mm-dd
        date: item.Date.split('/').reverse().join('-')
      }

      if(item.Memo.match(/salary|employment|employer/i)) {
        item.parsed.tags = ['salary']
        item.parsed.desc = 'Salary'
      }
      // No matches were found
      else {
        item.parsed.tags = ['unknown']
        item.parsed.desc = item.Memo
        item.unknown = true
      }

      return item

    },

    expense: function(item) {

      item.parsed = {
        amount: Number(item.Amount.substr(1)),
        // Convert dd/mm/yy to yyyy-mm-dd
        date: item.Date.split('/').reverse().join('-')
      }

      // Check if there's a more accurate date in the memo
      var dateMatches = item.Memo.match(regex.date)
      console.log(dateMatches)
      if(dateMatches) {
        var months = {
          'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
          'jul': '07', 'aug': '07', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
        }
        // There's potential for an error here.. If the expense is dated 2015-01-01 
        // but it actually occured on 2014-12-31 the script will apply it as 2015-12-31
        item.parsed.date = item.parsed.date.substr(0,5) + months[dateMatches[2].toLowerCase()] + '-' + dateMatches[1]
      }

      // Supermarkets
      if(item.Memo.match(regex.supermarkets)) {
        item.parsed.desc = item.Memo.match(regex.supermarkets)[1]
        if(item.parsed.amount < 7) {
          item.parsed.tags = ['lunch']
        }
        else {
          item.parsed.tags = ['groceries']
        }
      }
      // Lunch
      else if(item.Memo.match(regex.lunch)) {
        item.parsed.desc = item.Memo.match(regex.lunch)[1]
        item.parsed.tags = ['lunch']
      }
      // Pubs
      else if(item.Memo.match(regex.social)) {
        item.parsed.desc = item.Memo.match(regex.social)[1]
        item.parsed.tags = ['social']
      }
      // Books
      else if(item.Memo.match(/(Foyles)/i)) {
        item.parsed.desc = item.Memo.match(/(Foyles)/i)[1]
        item.parsed.tags = ['books']
      }
      // Boots
      else if(item.Memo.match(/Boots/i)) {
        item.parsed.desc = 'Boots'
        if(item.parsed.amount == 23.50) {
          item.parsed.tags = ['bills']
        }
        else if(item.parsed.amount < 4) {
          item.parsed.tags = ['lunch']
        }
        else {
          item.parsed.tags = ['pharmacy']
        }
      }
      // Pharmacy
      else if(item.Memo.match(/Pharmacy/i)) {
        item.parsed.desc = item.Memo
        item.parsed.tags = ['pharmacy']
      }
      // PayPal
      else if(item.Memo.match(/(PayPal)/i)) {
        item.parsed.desc = 'PayPal - '
        if(item.parsed.amount == 4.99) {
          item.parsed.tags = ['media']
          item.parsed.desc += 'Spotify'
        }
        else if(item.parsed.amount == 5.99) {
          item.parsed.tags = ['media']
          item.parsed.desc += 'Netflix'
        }
        else {
          item.parsed.tags = ['unknown']
        }
      }
      // Trains
      else if(item.Memo.match(/Oyster/i)) {
        item.parsed.desc = 'Oyster'
        item.parsed.tags = ['oyster']
      }
      // Insurance
      else if(item.Memo.match(/(insurance)/i)) {
        item.parsed.desc = item.Memo
        item.parsed.tags = ['insurance']
      }
      // Web
      else if(item.Memo.match(/(Amazon Web Service)/i)) {
        item.parsed.desc = item.Memo.match(/(Amazon Web Service)/i)[1]
        item.parsed.tags = ['web']
      }
      // No matches were found
      else {
        item.parsed.tags = ['unknown']
        item.parsed.desc = item.Memo
        item.unknown = true
      }
      
      return item

    }

  }
});

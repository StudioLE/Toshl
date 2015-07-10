'use strict';

angular.module('app.parseFactory', [])

/*****************************************************************
*
* User factory
*
******************************************************************/
.factory('Parse', function() {
  
  var regex = {
    supermarkets: /(SAINSBURYS|tesco|co-op|waitrose|M&S)/i,
    social: /(Inn|Pub|The Red Lion|LIBERTY BOUNDS|MILE CASTLE|EL MEXICANA|GLASS HOUSE|SCENARIO|THE ARCH CLIMBING|COUNTING HOUSE|Crosse Keys|ALL BAR ONE|METROPOLITAN)/i,
    lunch: /(Subway|CLIFTON EXPRESS|NORTHUMBRIA UNIVER|MCDONALDS|NATIONAL TRUST|NORWICH CATERING|COSTA|THE PASTY SHOP|eat|the restaurant cha|PRET A MANGER|FINE BURGER COMPAN|CH&CO CATERING)/i
  }

  return function(item) {
    if( ! item.Amount) {
      console.log('Blank row')
    }
    else if(item.Amount.substr(0,1) == '-') {
      item.type = 'expense'

      item.parsed = {
        amount: item.Amount,
        // Convert dd/mm/yy to yyyy-mm-dd
        date: item.Date.split('/').reverse().join('-')
      }

      // Supermarkets
      if(item.Memo.match(regex.supermarkets)) {
        item.parsed.desc = item.Memo.match(regex.supermarkets)[1]
        if(item.Amount < 7) {
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
        if(item.Amount == 23.50) {
          item.parsed.tags = ['bills']
        }
        else if(item.Amount < 4) {
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
      // No matches were found
      else {
        item.parsed.tags = ['unknown']
        item.parsed.desc = item.Memo
        item.unknown = true
      }

      // results.expenses.push(item.parsed)
    }
    else {
      item.type = 'income'

      item.parsed = {
        amount: item.Amount,
        // Convert dd/mm/yy to yyyy-mm-dd
        date: item.Date.split('/').reverse().join('-')
      }

      if(item.Memo.match(/Salary/i)) {
        item.parsed.tags = ['salary']
        item.parsed.desc = 'Salary'
      }
      // No matches were found
      else {
        item.parsed.tags = ['unknown']
        item.parsed.desc = item.Memo
        item.unknown = true
      }

      // results.income.push(item.parsed)
    }
    return item
  }
});

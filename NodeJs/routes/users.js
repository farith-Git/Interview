var express = require('express');
var router = express.Router();

function isBalanced(substring) {
    const charMap = new Map();
    for (const char of substring) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    if (charMap.size !== 2) {
        return false;
    }
    
    const counts = Array.from(charMap.values());
    return counts[0] === counts[1];
}

function getBalancedSubstrings(text) {
    text = text.toLowerCase();
    let maxLength = 0;
    let longestBalancedSubstrings = [];
    
    for (let i = 0; i < text.length; i++) {
        for (let j = i + 2; j <= text.length; j++) {
            const substring = text.substring(i, j);
            if (isBalanced(substring)) {
                if (substring.length > maxLength) {
                    maxLength = substring.length;
                    longestBalancedSubstrings = [substring];
                } else if (substring.length === maxLength) {
                    longestBalancedSubstrings.push(substring);
                }
            }
        }
    }
    
    return longestBalancedSubstrings;
}


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


function fibonacciIndexRecursive(value, a = 0, b = 1, index = 1) {
    
    console.log(index, '====', b);

    if (index == value) {
        return b;
    }

    let result = fibonacciIndexRecursive(value, b, a + b, index + 1);
    return result;
}

router.get('/fibonacci/:value?', function(req, res, next) {

  const value = parseInt(req.params.value);
  
  if (!value) {
    res.send(`Enter the value`);
  }
  
  if (isNaN(value) || value < 0) {
    console.log("Please enter a non-negative integer.");
    return;
  }

  const fibValue = fibonacciIndexRecursive(value);

  res.send(`The Fibonacci value at position value ${value} is: ${fibValue}`);

});


router.get('/balancedString/:value?', function(req, res, next) {

  const value = req.params.value;
  
  if (value.length == 0) {
    res.send(`Enter the value`);
  }

  let result = getBalancedSubstrings(value);

  res.send(`The balanced substring value is: ${result}`);

});

module.exports = router;

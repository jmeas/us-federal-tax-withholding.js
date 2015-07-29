// Set a value to be the `defaultValue` if it is undefined
function setDefault(currentValue, defaultValue) {
  return currentValue === undefined ? defaultValue : currentValue;
}

var data = require('./data');

module.exports = function(options) {
  options = options || {};

  // The total amount of your income that is taxable. When calculating this
  // be sure you deduct all pre-tax deductions from your gross pay! This includes
  // 401k/403b and basically anything else on your pay stub labeled 'pre tax.'
  var wage = setDefault(options.wage, 0);

  // The number of exemptions you claimed on your w-4. This is included with every
  // pay stub.
  var exemptions = setDefault(options.exemptions, 0);

  // Whether you're married or not
  var married = setDefault(options.married, false);

  // A string version of your marital status.
  var maritalStatus = married ? 'married' : 'single';

  // The type of payroll you're on. The options are that you are paid: 
  // Monthly: once a month
  // semimonthly: twice a month (i.e.; always on the 1st and 15th)
  // biweekly: every two weeks
  // weekly: once a week
  // daily: daily
  // other: with some other frequency. Keep in mind that this payroll type
  //        adheres to the same rules as `daily`.
  var payroll = setDefault(options.payroll, 'biweekly');

  // 'other' payrolls use the same algorithm as 'daily'
  payroll = payroll === 'other' ? 'daily' : payroll;

  var algorithm = data[payroll];
  var brackets = algorithm[maritalStatus];

  // The following algorithm is defined by alternative method 2 in
  // IRS Publication 15: Employer's Supplemental Tax Guide.
  // See:
  // http://www.irs.gov/pub/irs-pdf/p15a.pdf
  var bracket, max;
  for(var i = 0; i < brackets.length; i++) {
    bracket = brackets[i];
    max = bracket.max === 'null' ? Infinity : bracket.max;

    // Stop looping once we have found the right bracket
    if (wage > bracket.min && wage < bracket.max) {
      break;
    }
  }

  // Subtract the exemptions from the wage
  wage -= algorithm.exemptionValue * exemptions;

  // Subtract the amount specified by alternative method 2
  wage -= bracket.subtract;

  return bracket.times * wage;
};


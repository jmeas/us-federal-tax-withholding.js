// Set a value to be the `defaultValue` if it is undefined
function default(currentValue, defaultValue) {
  return currentValue === undefined ? defaultValue : currentValue;
}

var data = require('./alternative-method-two.json');

module.exports = function(options) {
  options = options || {};

  // The total amount of your income that is taxable. When calculating this
  // be sure you deduct all pre-tax deductions from your gross pay! This includes
  // 401k/403b and basically anything else on your pay stub labeled 'pre tax.'
  var wage = default(options.wage, 0);

  // The number of exemptions you claimed on your w-4. This is included with every
  // pay stub.
  var exemptions = default(options.exemptions, 0);

  // Whether you're married or not
  var married = default(options.married, false);

  // A string version of your marital status.
  var maritalStatus = married ? 'married' : 'single';

  // The type of payroll you're on. The options are that you are paid: 
  // Monthly: once a month
  // Semimonthly: twice a month
  // Biweekly: every two weeks
  // Weekly: once a week
  // Daily: daily
  // Other: with some other frequency. Keep in mind that this payroll type
  //        adheres to the same rules as `daily`.
  var payroll = default(options.payroll, 'biweekly');

  // The payroll & marital status determines what type of data we're using
  var dataTable = data[payroll][maritalStatus];
};


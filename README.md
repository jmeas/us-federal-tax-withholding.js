# us-federal-tax-witholding-2015.js

Approximate (with great accuracy) a US federal tax withholding for the year 2015.

### Installation

This library is most easily installed using `npm`.

`npm install us-federal-tax-withholding`

### Accuracy

This library should be reasonably accurate. For my payroll it is within a dollar amount. There are a
number of reasons that may contribute to innacuracies.

The first is that the IRS does not require that your company use any particular formula. Rather, they
provide an acceptable error range in addition to formulas for calculating withheld taxes. The acceptable
error depends on the amount that you earn.

Another cause of inaccuracy is that they also permit rounding. For instance, `$12.30` can be rounded down
to `$12`, and `$56.98` can be rounded up to `$57.00`.

Because employees typically do not have access to the algorithm used by their employee, it is difficult
to increase the accuracy of this library.

### Algorithm

This library uses alternative method 2 described
in [IRS Publication 15: Employer's Supplemental Tax Guide](http://www.irs.gov/pub/irs-pdf/p15a.pdf).

### API

This library exposes a single method, `USFederalTaxWithholding`.

#### `USFederalTaxWithholding( options )`

Pass in `options` (see below) and your federal tax withholding will be returned. The options are:

##### `wage`  
Type: `number`  
Default: `0`

Your taxable income. To calculate this, start with your gross income for the pay period. Then,
subtract all pre-tax deductions. This includes 401(k), 403(b), and any other deduction on your
pay stub labeled "pre tax."

The default value is `0`.

##### 'married'  
Type: `Boolean`  
Default: `false`

Whether or not you are married.

##### 'exemptions'  
Type: `number`  
Default: `0`

The number of exemptions you claimed. This is reported on each pay stub.

##### 'payroll'  
Type: `String`  
Default: `biweekly`

The type of payroll that you are on. There are six types, based on the frequency of pay.
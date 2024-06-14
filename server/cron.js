const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('./models/user.model');



const cronUpdateVacation = cron.schedule('0 0 1 7 *', async () => {
  try {
    const currentYear = new Date().getFullYear();

    const usersToUpdate = await User.find({
      vacation: {
        $not: {
          $elemMatch: { year: currentYear + 1 },
        },
      },
    });

    if (usersToUpdate.length <= 0) {
      console.error('No users found to update vacation days.');
      return;
    }

    for (const user of usersToUpdate) {
      const newVacationDays = increaseVacationDays(user.startingVacationDays,user.employmentStartDate);

      await User.updateOne(
        { _id: user._id },
        {
          $addToSet: {
            vacation: {
              year: currentYear + 1,
              vacationDays: newVacationDays,
              usedDays: 0,
              initialVacationDays: newVacationDays,
            },
          },
        }
      );
    }
  } catch (error) {
    console.error('Error updating vacation days:', error.message);
  }
});

function startCronJobs() {
  cronUpdateVacation.start();
}


const increaseVacationDays = (vacationDays,date) => {
  
  var today = new Date();
  var employmentStartDate = new Date(date);

  var yearDiff = today.getFullYear() - employmentStartDate.getFullYear();

  switch(true)
  {
    case (yearDiff >= 10):
            return vacationDays + 5;
        case (yearDiff >= 7):
            return vacationDays + 4;
        case (yearDiff >= 5):
            return vacationDays + 3;
        case (yearDiff >= 3):
            return vacationDays + 2;
        case (yearDiff >= 1):
            return vacationDays + 1;
        default:
            return vacationDays;
    }
  }

module.exports = { startCronJobs };

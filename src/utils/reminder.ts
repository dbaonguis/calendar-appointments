
import { format as formatDate } from 'date-fns';
import { ReminderProp } from './../components/Reminder/Reminder';

export const organizeReminderList = (reminderList: [], currentDate: Date) => {
  let reminders: ReminderProp[] = null;
	if (reminderList) {
		const selectedDate = formatDate(currentDate, 'yyyy-MM-dd');
		reminders = reminderList.filter((reminder: ReminderProp) => reminder.date === selectedDate);
		
		if (reminders.length > 0) {
			// sort by time - asc
			const sortedReminders = reminders.sort((a, b) => (
				(a.time > b.time) ? 1 : (a.time < b.time) ? -1 : 0
			));

			// organize into an array of objects
			const reminderObjList = [];
			sortedReminders.forEach((reminder) => {
				const objFound = reminderObjList.find((obj) => {
					return obj.hasOwnProperty(reminder.time);
				});
				
				if (!objFound) {
					const reminderObj = {
						[reminder.time]: [reminder]
					};
					reminderObjList.push(reminderObj);
				} else {
					reminderObjList.forEach((reminderObj) => {
						if (reminderObj[reminder.time]) {
							reminderObj[reminder.time] = [...objFound[reminder.time], reminder]
						}
					});
				}
			});

      return reminderObjList;
		}
	}

  return [];
}
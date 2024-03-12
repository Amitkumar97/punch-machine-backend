import moment from "moment";
import PunchLogModel from "../Modules/Models/PunchLogModel.js";

export function calculateBreakAndActiveHours() {

    return new Promise(async (resolve, reject) => {

        const punches = await PunchLogModel.find();

        let newRecord = [];
        let breaks = [];

        for (let index = 0; index < punches.length; index++) {
            const punch = punches[index];
            const start = moment(punch.punchInTime);
            const end = moment(punch.punchOutTime).isValid() ? moment(punch.punchOutTime) : null;

            if (punches[index + 1]) {

                const breakStart = end
                const breakEnd = moment(punches[index + 1].punchInTime)
                breaks.push({
                    startTimestamp: changeFormat(breakStart),
                    endTimestamp: changeFormat(breakEnd),
                    differenceInSeconds: convertMillisecondsToTime(breakEnd.diff(breakStart, 'milliseconds'))
                });
            }

            newRecord.push({
                startTimestamp: changeFormat(start),
                endTimestamp: end ? changeFormat(end) : null,
                differenceInSeconds: end ? convertMillisecondsToTime(end.diff(start, 'milliseconds')) : 0,
            });
        }

        const dayInfo = {
            start: punches[0] ? changeFormat(moment(punches[0].punchInTime)) : null,
            end: punches[punches.length - 1] && punches[punches.length - 1].punchOutTime ?changeFormat( moment(punches[punches.length - 1].punchOutTime)) : null
        }

        resolve({
            works: newRecord,
            breaks: breaks,
            dayInfo: dayInfo
        });
    });


}

function convertMillisecondsToTime(milliseconds) {
    // Calculate hours, minutes, and seconds
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    let timeString = '';
    if (hours > 0) {
        timeString += hours + 'h ';
    }
    if (minutes > 0 || hours > 0) {
        timeString += minutes + 'm ';
    }
    timeString += seconds + 's';

    return timeString;
}


const changeFormat = (timestamp) => {
    if(moment(timestamp).isValid()){
        return timestamp.format('MMMM Do YYYY, h:mm:ss a')
    }
    return null;
}
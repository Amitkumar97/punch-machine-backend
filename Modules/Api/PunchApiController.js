import moment from "moment";
import PunchLogModel from "../Models/PunchLogModel.js";
import { calculateBreakAndActiveHours } from "../../Helpers/helpers.js";

class PunchApiController {

    async savePunch (req, res) {
        try {
            const latestPunch = await PunchLogModel.findOne().sort({ _id: -1 });
            const currentTime = moment().valueOf();
            
            let currentStatus;
            if (latestPunch && latestPunch.punchOutTime) {
                // User is punching in
                const newLog = new PunchLogModel({ punchInTime: currentTime });
                await newLog.save();
                currentStatus="out";
            } else {
                // User is punching out
                if (latestPunch) {
                    await PunchLogModel.updateOne({ _id: latestPunch._id }, { punchOutTime: currentTime });
                    currentStatus="in";
                } else {
                    const newLog = new PunchLogModel({ punchInTime: currentTime });
                    await newLog.save();
                    currentStatus="out";
                }
            }
            
            const logs = await calculateBreakAndActiveHours();
    
            const response = {
                status: true,
                message: "Time updated successfully",
                currentStatus,
                logs,
            };
    
            return res.json(response);
        } catch (error) {
            return res.status(500).send({ status: false, message: "Internal Server Error" });
        }
    };
    

    async getLastStatus(req, res) {
       
        try {
            const latestPunch = await PunchLogModel.findOne().sort({ _id: -1 });
            const currentStatus = latestPunch && latestPunch.punchOutTime ? 'in' : 'out';

            const logs = await calculateBreakAndActiveHours();
            const response = { status: !!latestPunch, currentStatus: currentStatus, logs };
            return res.send(response);
        } catch (error) {
            console.error("Error in getLastStatus:", error);
            return res.status(500).send({ status: false, message: "Internal Server Error" });
        }
    }


}

export default new PunchApiController();
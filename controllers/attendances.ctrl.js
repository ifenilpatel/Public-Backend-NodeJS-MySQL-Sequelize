const { ApiResponse } = require("../configuration/utils/ApiResponse.conf.js");

const { flag, statusCode, status } = require("../configuration/utils/Constant.conf.js");

const Attendance = require("../models/attendance.model.js");
const Department = require("../models/departments.model.js");
const Designation = require("../models/designations.model.js");
const User = require("../models/users.model.js");

const fun_SelectById = async (req, res) => {
  try {
    const attendanceId = req.body.attendanceId || 0;
    const result = await Attendance.findOne({ where: { attendanceId: attendanceId } });
    if (!result) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(new ApiResponse(flag.success, status.success, statusCode.success, result));
    }
  } catch (err) {
    if (process.env.CODE_LOGS == "true") {
      console.error(`Error: `, err);
    }
    return res.json(new ApiResponse(flag.fail, status.systemError, statusCode.systemError, { originalUrl: req.originalUrl }));
  }
};

const fun_SelectAll = async (req, res) => {
  try {
    let pageIndex = req.body.pageIndex || "";
    let pageSize = req.body.pageSize || "";
    // Calculate the offset
    const offset = (pageIndex - 1) * pageSize;
    // Fetch Users with pagination
    const Users = await Attendance.findAndCountAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName"],
          include: [
            {
              model: Department,
              attributes: ["title"],
            },
            {
              model: Designation,
              attributes: ["title"],
            },
          ],
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    if (Users.count == 0) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    } else {
      return res.json(
        new ApiResponse(flag.success, status.success, statusCode.success, {
          records: Users.rows,
          totalRecords: Users.count,
        })
      );
    }
  } catch (err) {
    if (process.env.CODE_LOGS == "true") {
      console.error(`Error: `, err);
    }
    return res.json(new ApiResponse(flag.fail, status.systemError, statusCode.systemError, { originalUrl: req.originalUrl }));
  }
};

const fun_DeleteById = async (req, res) => {
  try {
    const attendanceId = req.body.attendanceId || 0;
    const result = await Attendance.destroy({ where: { attendanceId: attendanceId } });
    if (!result) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    }
    return res.json(new ApiResponse(flag.success, status.success, statusCode.delete, result));
  } catch (err) {
    if (process.env.CODE_LOGS == "true") {
      console.error(`Error: `, err);
    }
    return res.json(new ApiResponse(flag.fail, status.systemError, statusCode.systemError, { originalUrl: req.originalUrl }));
  }
};

const fun_Insert = async (req, res) => {
  try {
    const { userId, date, inTime, outTime, createdBy } = req.body;
    const result = await Attendance.create({ userId, date, inTime, outTime, createdBy });
    return res.json(new ApiResponse(flag.success, status.success, statusCode.insert, result));
  } catch (err) {
    if (process.env.CODE_LOGS == "true") {
      console.error(`Error: `, err);
    }
    return res.json(new ApiResponse(flag.fail, status.systemError, statusCode.systemError, { originalUrl: req.originalUrl }));
  }
};

const fun_Update = async (req, res) => {
  try {
    const { attendanceId, userId, date, inTime, outTime, createdBy } = req.body;
    const [result] = await Attendance.update(
      { userId, date, inTime, outTime, createdBy },
      {
        where: { attendanceId },
      }
    );
    if (!result) {
      return res.json(new ApiResponse(flag.fail, status.noData, statusCode.noData, []));
    }
    return res.json(new ApiResponse(flag.success, status.success, statusCode.update, result));
  } catch (err) {
    if (process.env.CODE_LOGS == "true") {
      console.error(`Error: `, err);
    }
    return res.json(new ApiResponse(flag.fail, status.systemError, statusCode.systemError, { originalUrl: req.originalUrl }));
  }
};

module.exports = { fun_SelectById, fun_SelectAll, fun_DeleteById, fun_Insert, fun_Update };

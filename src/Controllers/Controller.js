module.exports = function(app, express) {
    let api = express.Router();
 
    getHome = (req, res, next) => {
        res.render('dashboard/home/home', {
            username: 'sagar'
        });
    };

    getFaculty = (req, res, next) => {
        res.render('dashboard/faculty/faculty', {

        });
    };

    getStudent = (req, res, next) => {
        res.render('dashboard/student/student', {

        });
    }

    getStaff = (req, res, next) => {
        res.render('dashboard/staff/staff', {

        });
    };

    getAttendance = (req, res, next) => {
        res.render('dashboard/attendance/attendance', {

        });
    };

    getCalender = (req, res, next) => {
        res.render('dashboard/calender/calender', {

        });
    }
    api.get('/home', getHome);
    api.get('/student', getStudent);
    api.get('/faculty', getFaculty);
    api.get('/staff', getStaff);
    api.get('/attendance', getAttendance);
    api.get('/calendar', getCalender);
    return api;
};
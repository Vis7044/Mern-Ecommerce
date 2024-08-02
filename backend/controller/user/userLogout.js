async function userLogout(req,res) {
    try {
        res.clearCookie('token');
        res.json({
            message: "Logged out successfully",
            data: [],
            error: false,
            success: true,
        })
    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false,
          });
    }
}

module.exports = userLogout
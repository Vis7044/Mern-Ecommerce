async function userLogout(req,res) {
    try {
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite : "None"
          };
        res.clearCookie('token',tokenOption);
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
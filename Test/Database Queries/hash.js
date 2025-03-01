const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
};

const password = "password";
hashPassword(password).then((hash) => {
    console.log("Hashed Password:", hash);
});

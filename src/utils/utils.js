import Jwt from "jsonwebtoken";

const generateToken = (id, role, email, full_name) => {
    return Jwt.sign({ id, role, email, full_name }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
};

export default generateToken;
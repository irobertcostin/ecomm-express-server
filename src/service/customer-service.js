
async function editUser(user, newUser) {
    try {
        if (newUser.full_name && newUser.full_name !== user.full_name) {
            user.full_name = newUser.full_name
            user.save();
        }
        if (newUser.email && newUser.email !== user.email) {
            user.email = newUser.email;
            user.save();
            return user;
        }
    } catch (error) {
        return error
    }
}

export { editUser }
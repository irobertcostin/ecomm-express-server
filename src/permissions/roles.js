import UserPermission from "./permissions.js";

const UserRole = {
    CUSTOMER: {
        permissions: new Set([
            UserPermission.PRODUCT_READ,
            UserPermission.ORDER_WRITE,
            UserPermission.ORDER_READ
        ]),
        getPermissions() {
            return this.permissions;
        },
        getName() {
            return "customer";
        }
    },
    ADMIN: {
        permissions: new Set([
            UserPermission.CUSTOMER_READ,
            UserPermission.CUSTOMER_WRITE,
            UserPermission.ORDER_READ,
            UserPermission.ORDER_WRITE,
            UserPermission.PRODUCT_READ,
            UserPermission.PRODUCT_WRITE
        ]),
        getPermissions() {
            return this.permissions;
        },
        getName() {
            return "admin";
        }
    }
};


export default UserRole;
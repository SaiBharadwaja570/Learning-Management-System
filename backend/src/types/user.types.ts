interface User {
    username: string;
    email: string;
    password: string;
    role: "student" | "instructor" | "mentor";
}

export default User
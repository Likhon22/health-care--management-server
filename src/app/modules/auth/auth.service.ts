import prisma from "../../shared/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const loginUser = async (email: string, password: string) => {
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(isUserExists);

  if (!isUserExists) {
    throw new Error("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExists.password
  );
  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }
  const jwtData = {
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = jwt.sign(jwtData, "secret", {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  console.log(accessToken);
  return {
    user: isUserExists,
  };
};

const authServices = {
  loginUser,
};

export default authServices;

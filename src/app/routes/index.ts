import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.routes";
import { userRoutes } from "../modules/User/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { doctorRoutes } from "../modules/doctor/doctor.routes";

const router = Router();

type TModuleRoutes = {
  route: Router;
  path: string;
};
const moduleRouters: TModuleRoutes[] = [
  {
    route: adminRoutes,
    path: "/admin",
  },
  {
    route: userRoutes,
    path: "/user",
  },
  {
    route: authRoutes,
    path: "/auth",
  },
  {
    route: doctorRoutes,
    path: "/doctor",
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.route);
});
export const moduleRoutes = router;

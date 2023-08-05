import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimationPage from "../../components/AnimationPage";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// MY IMPORTS
import { publicRoutes } from "../../routes";
import FormControl from "../../components/FormControl";
import Form from "../../components/Form";
import { validateFormLogin } from "../../utils/validate";

// REDUX SLICE
import { loginUser } from "../../features/user/userSlice";

import { setLoadingClose, setLoadingShow } from "../../features/loadingSlice";
import "./login.scss";
function Login() {
  const [isForgotPwd, setIsForgotPwd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  let disabled = !inputs.email || !inputs.password;
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateFormLogin(inputs);
    if (err) {
      toast.warning(err);
      return;
    }
    dispatch(setLoadingShow());
    const { payload } = await dispatch(loginUser(inputs));
    dispatch(setLoadingClose());
    if (payload.status === 200) {
      navigate(publicRoutes.home);
    }
  };
  return (
    <div className="login">
      <div className="container-fuild login__breadcrumb">
        <div className="container ">
          <Link
            to={publicRoutes.home}
            className="login__fs-13 hover-color-secondary text-decoration-none"
          >
            Trang chủ
          </Link>
          <FontAwesomeIcon className="px-3 login__fs-13" icon={faAngleRight} />
          <span className="text-secondary login__fs-13">
            Đăng nhập tài khoản
          </span>
        </div>
      </div>
      <AnimationPage>
        <div className="container">
          <div className="login__form">
            <Form className="form">
              <h5 className="text-center py-2">ĐĂNG NHẬP</h5>
              <div className="form-group">
                <FormControl
                  type="email"
                  placeholder="   Email"
                  name="email"
                  onChange={handleChange}
                />
                <FormControl
                  type="password"
                  placeholder="   Mật khẩu"
                  name="password"
                  onChange={handleChange}
                />
                <div className="mb-3 ">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 hover-bg-secondary"
                    onClick={handleSubmit}
                    disabled={disabled}
                  >
                    ĐĂNG NHẬP
                  </button>
                </div>
                <div className="mb-3">
                  <p className="d-flex justify-content-between">
                    <span
                      onClick={() => setIsForgotPwd(!isForgotPwd)}
                      className="hover-color-secondary "
                    >
                      Quên mật khẩu?
                    </span>
                    <Link
                      to={publicRoutes.register}
                      className="hover-color-secondary "
                    >
                      Đăng ký tại đây
                    </Link>
                  </p>
                </div>
                <motion.div
                  className="mb-3"
                  variants={animateForgotPassword}
                  initial="initial"
                  animate={isForgotPwd ? "open" : "exit"}
                >
                  <FormControl type="email" placeholder="   Email" />
                  <button
                    type="submit"
                    className="btn btn-primary w-100 hover-bg-secondary"
                  >
                    Lấy lại mật khẩu
                  </button>
                </motion.div>
                <div className="mb-3">
                  <p className="d-flex justify-content-center">
                    <span>hoặc đăng nhập qua</span>
                  </p>
                </div>
                <div className="mb-3 d-flex justify-content-center gap-2">
                  <button type="submit" className="btn btn-facebook">
                    <span></span>
                    Facebook
                  </button>
                  <button type="submit" className="btn btn-google">
                    <span></span>
                    Google
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </AnimationPage>
    </div>
  );
}

const animateForgotPassword = {
  initial: { height: 0, background: "#fff", overflow: "hidden" },
  open: { height: "auto" },
  exit: { height: 0 },
};
export default Login;

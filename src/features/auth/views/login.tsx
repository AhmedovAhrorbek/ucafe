import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/auth-context";
import { login } from "../api";
import loginImg from '../../../assets/authImages/loginImg.png'
import brandLogo from '../../../assets/authImages/brandLogo1.png'
import userIcon from '../../../assets/authImages/user.png'
import lockIcon from '../../../assets/authImages/lockIcon.png'
import loginIcon from '../../../assets/authImages/login-03.png'
interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAuthContext();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      localStorage.setItem("username", res.user.username);
      localStorage.setItem("position", res.user.position ?? "");
      localStorage.setItem("refresh_token", res.refresh);
      localStorage.setItem("access_token", res.access);
      // setIsAuth(true);
      // navigate("/");
      window.location.reload();
    },
    onError: (error: { data: { detail: string } }) => {
      message.error(`Login error ${error}`);
    },
  });

  return (
    <div className="flex h-screen">
      <img src={loginImg} alt="decoration" className="w-7/12" />

      <div className="w-5/12 flex items-center justify-center">
        <div className="flex flex-col gap-12 text-center w-1/2">
          <div className="flex flex-col gap-4 m-auto">
            <img src={brandLogo} alt="brand" width={200} />
            <span className="font-semibold text-2xl">account login</span>
          </div>

          <Form
            name="login-form"
            layout="vertical"
            className="flex flex-col gap-6"
            onFinish={mutate}
            autoComplete="off"
            requiredMark="optional"
          >
            <div className="flex flex-col">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    type: "string",
                    min: 3,
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="login"
                  prefix={<img src={userIcon} alt="user" />}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    type: "string",
                    min: 4,
                    whitespace: true,
                  },
                ]}
              >
                <Input.Password
                  placeholder="password"
                  prefix={<img src={lockIcon} alt="lock" />}
                />
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="flex items-center justify-center"
              loading={isLoading}
            >
              <img src={loginIcon} alt="login icon" />
               login to account
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
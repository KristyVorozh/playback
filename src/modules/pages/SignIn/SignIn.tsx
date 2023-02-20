import React, { useState } from "react";
import Header from "../../components/layout/Header";
import { Form, Input, Typography } from "antd";
import { useNavigate } from "react-router";
import { useLogin } from "../../../core/api/auth";
import toast from "react-hot-toast";
import { isValidEmail } from "../../../core/utils/isValidEmail";
import jwt_decode from "jwt-decode";

const SignIn = () => {
  const [email, setEmail] = useState({ value: "", error: false });
  const [password, setPassword] = useState({ value: "", error: false });
  const navigate = useNavigate();
  const { mutate: signInData } = useLogin();
  const signIn = () => {
    if (email.value === "") {
      toast.error("Заполните все поля");
      setEmail({ value: "", error: true });
    } else if (password.value === "") {
      toast.error("Заполните все поля");
      setPassword({ value: "", error: true });
    } else if (!isValidEmail(email.value)) {
      toast.error("Email должен быть валидным");
      setEmail({ value: email.value, error: true });
    } else {
      signInData(
        {
          email: email.value,
          password: password.value,
        },
        {
          onSuccess(data: any) {
            toast.success("Вы успешно авторизовались!");
            const token: any = jwt_decode(data.data.token);
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("username", token.username);
            navigate("/movie");
          },
          onError(e: any) {
            toast.error(e.response.data.message);
          },
        }
      );
    }
  };
  return (
    <div style={{ padding: "30px 180px" }}>
      <Header signIn />
      <Form
        size="large"
        layout="vertical"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto", marginTop: "25vh" }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            { required: true, message: "Введите ваш email!", type: "email" },
          ]}
        >
          <Input
            value={email.value}
            status={email.error ? "error" : ""}
            onFocus={() => setEmail({ value: email.value, error: false })}
            onChange={(e) => {
              setEmail({ value: e.target.value, error: false });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите ваш пароль!" }]}
        >
          <Input.Password
            value={password.value}
            status={password.error ? "error" : ""}
            onFocus={() => setPassword({ value: password.value, error: false })}
            onChange={(e) =>
              setPassword({ value: e.target.value, error: false })
            }
          />
        </Form.Item>
        <Form.Item>
          <button onClick={signIn} className="button">
            Войти
          </button>
          <Typography
            onClick={() => navigate("/signUp")}
            style={{
              marginTop: "20px",
              cursor: "pointer",
              fontSize: "18px",
              fontFamily: '"Comfortaa", cursive!important',
              color: "white",
            }}
          >
            Зарегестрироваться
          </Typography>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;

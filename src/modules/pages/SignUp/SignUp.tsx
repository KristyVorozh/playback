import { Form, Input } from "antd";
import Header from "../../components/layout/Header";
import React, { useState } from "react";
import { useRegistration } from "../../../core/api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { isValidEmail } from "../../../core/utils/isValidEmail";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import LoadingMainPage from "../../../core/animations/loadingMainPage.json";
import { useMediaQuery } from "react-responsive";

export const SignUp = () => {
  const Screen800 = useMediaQuery({ query: "(max-width: 1214px)" });

  const [userName, setUserName] = useState({ value: "", error: false });
  const Screen700 = useMediaQuery({ query: "(max-width: 700px)" });

  const [email, setEmail] = useState({ value: "", error: false });
  const [password, setPassword] = useState({ value: "", error: false });
  const navigate = useNavigate();
  const { mutate: registrationData, isLoading } = useRegistration();
  const signUp = () => {
    if (userName.value === "") {
      toast.error("Заполните все поля");
      setUserName({ value: "", error: true });
    } else if (email.value === "") {
      toast.error("Заполните все поля");
      setEmail({ value: "", error: true });
    } else if (password.value === "") {
      toast.error("Заполните все поля");
      setPassword({ value: "", error: true });
    } else if (password.value.length <= 6) {
      toast.error("Пароль должен быть больше чем 6 символов");
    } else if (!isValidEmail(email.value)) {
      toast.error("Email должен быть валидным");
      setEmail({ value: email.value, error: true });
    } else {
      registrationData(
        {
          email: email.value,
          username: userName.value,
          password: password.value,
        },
        {
          onSuccess() {
            toast.success("Вы успешно зарегестрировались!");
            navigate("/");
          },
          onError(e: any) {
            toast.error(e.response.data.message);
          },
        }
      );
    }
  };
  if (isLoading)
    return (
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        style={{
          position: "absolute",
          top: Screen700 ? "42%" : "48%",
          cursor: "pointer",
          left: Screen700 ? "41%" : "47%",
          transition: "all .5s",
        }}
        animate={{ x: 0 }}
      >
        <Lottie size={200} animationData={LoadingMainPage} />
      </motion.div>
    );
  else
    return (
      <div style={{ padding: Screen800 ? "30px 50px" : "30px 180px" }}>
        <Header signUp />
        <Form
          size="large"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
            margin: "0 auto",
            marginTop: Screen800 ? "10vh" : "25vh",
          }}
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
            label="Имя"
            name="name"
            rules={[{ required: true, message: "Введите ваше имя!" }]}
          >
            <Input
              value={userName.value}
              status={userName.error ? "error" : ""}
              onFocus={() =>
                setUserName({ value: userName.value, error: false })
              }
              onChange={(e) =>
                setUserName({ value: e.target.value, error: false })
              }
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
              onFocus={() =>
                setPassword({ value: password.value, error: false })
              }
              onChange={(e) =>
                setPassword({ value: e.target.value, error: false })
              }
            />
          </Form.Item>
          <Form.Item>
            <button onClick={signUp} className="button">
              Зарегестрироваться
            </button>
          </Form.Item>
        </Form>
      </div>
    );
};

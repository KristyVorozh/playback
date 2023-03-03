import { Form, Input } from "antd";
import Header from "../../components/layout/Header";
import { useState } from "react";
import { useRegistration } from "../../../core/api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { isValidEmail } from "../../../core/utils/isValidEmail";

export const SignUp = () => {
  const [userName, setUserName] = useState({ value: "", error: false });
  const [email, setEmail] = useState({ value: "", error: false });
  const [password, setPassword] = useState({ value: "", error: false });
  const navigate = useNavigate();
  const { mutate: registrationData } = useRegistration();
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
  return (
    <div style={{ padding: "30px 180px" }}>
      <Header signUp />
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
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите ваше имя!" }]}
        >
          <Input
            value={userName.value}
            status={userName.error ? "error" : ""}
            onFocus={() => setUserName({ value: userName.value, error: false })}
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
            onFocus={() => setPassword({ value: password.value, error: false })}
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

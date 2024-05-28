import React, { Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import Fox from "../models/Fox";
import Loader from "../components/Loader";
import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idel");
  const { alert, showAlert, hideAlert } = useAlert();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e) => {
    setCurrentAnimation("walk");
  };
  const handleBlur = (e) => {
    setCurrentAnimation("idel");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation("hit");
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Tarun Singh",
          from_email: form.email,
          to_email: "tarunsdhanak@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        showAlert({
          show: true,
          text: "message sent successfully!",
          type: "success",
        });
        setTimeout(() => {
          hideAlert();
          setIsLoading(false);
          setForm({
            name: "",
            email: "",
            message: "",
          });
          setCurrentAnimation("idel");
        }, 3000);
        //todo
      })
      .catch((err) => {
        setForm({
          name: "",
          email: "",
          message: "",
        });
        setIsLoading(false);
        setCurrentAnimation("idel");
        console.log(err);
        showAlert({
          show: true,
          text: "some error occured",
          type: "danger",
        });
      });
  };

  return (
    <section className="relative lg:flex-row max-container flex flex-col h-[100vh]">
      {alert.show && <Alert {...alert} />}
      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in touch</h1>
        <form
          action=""
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
        >
          <label htmlFor="" className="font-semibold text-black-500">
            Name
            <input
              type="text"
              name="name"
              className="input"
              required
              placeholder="Atul"
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="" className="font-semibold text-black-500">
            Email
            <input
              type="email"
              name="email"
              className="input"
              required
              placeholder="atul@gmail.com"
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label htmlFor="" className="font-semibold text-black-500">
            Message
            <textarea
              type="text"
              name="message"
              className="textarea"
              rows={4}
              required
              placeholder="Let me know how can I help you! "
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            className="btn"
            type="submit"
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] sm:h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.3} />
          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.6, 12, 0]}
              scale={[0.55, 0.55, 0.55]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e) => {};
  const handleBlur = (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        setForm({
          name: "",
          email: "",
          message: "",
        });
        setIsLoading(false);
        //todo
      })
      .catch((err) => {
        setForm({
          name: "",
          email: "",
          message: "",
        });
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <section className="relative lg:flex-row max-container flex flex-col">
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
    </section>
  );
};

export default Contact;

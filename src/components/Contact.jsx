import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { HiUser, HiMail, HiChatAlt2, HiPaperAirplane } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setLoading(true);

      emailjs
        .send(
          "service_au6hpde",
          "template_0r138zy",
          {
            from_name: form.name,
            to_name: "Varad",
            from_email: form.email,
            to_email: "varadapatil123@gmail.com",
            message: form.message,
          },
          "gPSVXRIE5XamWG-UM"
        )
        .then(
          () => {
            setLoading(false);
            toast.success("Thank you. I will get back to you.");
            setForm({
              name: "",
              email: "",
              message: "",
            });
          },
          (error) => {
            setLoading(false);
            console.log(error);
            toast.error("Something Went Wrong!!!");
          }
        );
    }
  };
  return (
    <div className="xl:mt-12 xl:flex-row flex flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] relative"
      >
        {/* Background with modern gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl"></div>

        {/* Decorative elements */}
        <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-6 w-16 h-16 bg-purple-300/20 rounded-full blur-xl"></div>

        <div className="relative z-10 p-10">
          <div className="mb-8">
            <p className={`${styles.sectionSubText} text-violet-100 mb-2`}>
              Get in touch
            </p>
            <h3 className={`${styles.sectionHeadText} text-white mb-4`}>
              Contact.
            </h3>
            <p className="text-violet-100 text-lg leading-relaxed max-w-md">
              Have a project in mind or just want to chat?
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="space-y-6">
              <label className="flex flex-col group">
                <span className="text-white font-semibold mb-3 flex items-center gap-2">
                  <HiUser className="w-5 h-5 text-violet-300" />
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your good name?"
                  className="bg-white/95 backdrop-blur-sm py-4 px-6 placeholder:text-gray-500 text-gray-800 rounded-xl border-2 border-transparent focus:border-violet-300 focus:outline-none font-medium transition-all duration-300 hover:bg-white focus:bg-white shadow-lg"
                />
              </label>

              <label className="flex flex-col group">
                <span className="text-white font-semibold mb-3 flex items-center gap-2">
                  <HiMail className="w-5 h-5 text-violet-300" />
                  Your Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email address?"
                  className="bg-white/95 backdrop-blur-sm py-4 px-6 placeholder:text-gray-500 text-gray-800 rounded-xl border-2 border-transparent focus:border-violet-300 focus:outline-none font-medium transition-all duration-300 hover:bg-white focus:bg-white shadow-lg"
                />
              </label>

              <label className="flex flex-col group">
                <span className="text-white font-semibold mb-3 flex items-center gap-2">
                  <HiChatAlt2 className="w-5 h-5 text-violet-300" />
                  Your Message
                </span>
                <textarea
                  rows="6"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to say?"
                  className="bg-white/95 backdrop-blur-sm py-4 px-6 placeholder:text-gray-500 text-gray-800 rounded-xl border-2 border-transparent focus:border-violet-300 focus:outline-none font-medium transition-all duration-300 hover:bg-white focus:bg-white shadow-lg resize-none"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative bg-white hover:bg-violet-50 w-full md:w-auto md:self-start py-4 px-10 text-violet-600 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin w-5 h-5" />
                    Sending...
                  </>
                ) : (
                  <>
                    SEND MESSAGE
                    <HiPaperAirplane className="w-5 rotate-90 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
            </button>
          </form>
        </div>
      </motion.div>
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

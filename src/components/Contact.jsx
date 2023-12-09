import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

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
    setForm({...form, [name]: value})

  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if(form.name && form.email && form.message){
    setLoading(true);

    emailjs.send('service_au6hpde',
      'template_0r138zy',
      {
        from_name: form.name,
        to_name: 'Varad',
        from_email: form.email,
        to_email: 'varadapatil123@gmail.com',
        message: form.message
      },
      'gPSVXRIE5XamWG-UM'
    )
    .then(()=>{
      setLoading(false);
      toast.success('Thank you. I will get back to you.');
      setForm({
        name: '',
        email: '',
        message: '',
      })
    },(error)=>{
      setLoading(false);
      console.log(error);
      toast.error('Something Went Wrong!!!');
    })
  }
  };
  return (
    <div className="xl:mt-12 xl:flex-row flex flex-col-reverse gap-10 overflow-hidden scale-90">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-violet-500 p-8 rounded-2xl"
      >
        <p className={`${styles.sectionSubText} text-white`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} text-white`}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-white py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="bg-white py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-white py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border-none font-medium"
            /> 
          </label>
          <button type="submit" className="bg-white w-full md:w-[40%] py-3 px-8 otuline-none text-theme text-[20px] font-bold shadow-md shadow-primary rounded-xl hover:bg-primary hover:text-white transition" >
            {loading ? 'Sending...' : 'SEND'}
          </button>
        </form>
      </motion.div>
        <motion.div variants={slideIn("right","tween",0.2,1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
            <EarthCanvas/>
        </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

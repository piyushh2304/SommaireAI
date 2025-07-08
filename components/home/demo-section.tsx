"use client";
import { ChevronLeft, ChevronRight, CircleDotDashed } from "lucide-react";
import React, { useState } from "react";

import { AnimatePresence, motion, Variants } from "motion/react";

const DemoSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const demoContent = [
    {
      title: "Quick Overview",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Get a comprehensive introduction to Next.js 15, the latest version of the leading React framework. This course covers everything from the core fundamentals—such as routing, rendering, and project structure—to advanced topics like server actions, middleware, and deployment strategies. Whether you're new to Next.js or looking to master its newest features, this overview will set the stage for your learning journey with clear explanations, practical examples, and real-world project guidance.",
    },
    {
      title: "Key Concepts",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Dive deep into essential Next.js concepts, including server-side rendering (SSR), static site generation (SSG), client-side rendering, and incremental static regeneration (ISR). Understand how API routes work, how to leverage dynamic and nested routing, and how Next.js handles data fetching and caching. This module ensures you have a solid grasp of the architectural patterns that power modern web applications.",
    },
    {
      title: "Project Setup",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Learn step-by-step how to set up a Next.js 15 project from scratch. Explore the recommended folder structure, TypeScript integration, environment variable management, and configuration best practices. You'll also discover how to install and configure essential dependencies, set up linting and formatting tools, and prepare your project for scalable development in both solo and team environments.",
    },
    {
      title: "Data Fetching",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Master all data fetching strategies in Next.js 15, including getServerSideProps, getStaticProps, and client-side fetching with SWR or React Query. Learn when to use each approach for optimal performance, SEO, and user experience. This section also covers advanced patterns like server actions, edge functions, and integrating with external APIs or databases for dynamic, data-driven applications.",
    },
    {
      title: "Deployment",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Gain confidence in deploying your Next.js applications to production. Explore deployment workflows for Vercel (the creators of Next.js), as well as alternative hosting solutions like AWS, Netlify, and Docker. Learn about environment variables, secrets management, continuous integration (CI/CD), and best practices for monitoring, scaling, and securing your application after launch.",
    },
    {
      title: "Advanced Routing & Navigation",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Explore advanced routing features such as dynamic segments, catch-all routes, nested and parallel routing, and intercepting routes for modals and overlays. Understand how to manage navigation state, implement route groups for cleaner organization, and enhance SEO with dynamic metadata.",
    },
    {
      title: "Server & Client Components",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Learn the difference between server and client components in Next.js 15. Discover how to fetch data securely on the server, add interactivity with client components, and combine both for optimal performance and user experience.",
    },
    {
      title: "Forms & User Input",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Work with the new <Form> component and server actions to build robust, accessible forms. Handle validation, error states, and progressive enhancement for seamless user input experiences.",
    },
    {
      title: "Authentication & Authorization",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Integrate authentication providers like Clerk, Auth0, or NextAuth.js. Protect routes, manage user sessions, and implement role-based access control for secure, personalized applications.",
    },
    {
      title: "Performance Optimization",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Optimize your Next.js apps with Turbopack, incremental compilation, advanced caching, and image optimization. Learn strategies for faster builds, improved SEO, and better user experience.",
    },
    {
      title: "API Routes & Middleware",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Build backend endpoints directly in your Next.js app using API routes. Use edge middleware for authentication, redirects, and custom request handling at the edge for lower latency.",
    },
    {
      title: "Testing & Debugging",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Leverage improved error overlays, stack traces, and built-in ESLint support for a smoother development experience. Write tests for your components and API routes to ensure reliability.",
    },
    {
      title: "TypeScript & Configuration",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Use TypeScript throughout your app for type safety and maintainability. Configure your project with next.config.ts and learn best practices for environment variables, aliases, and custom setups.",
    },
    {
      title: "Image & Asset Optimization",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Automatically optimize images with the Next.js Image component. Manage static assets for fast loading and responsive design across devices.",
    },
    {
      title: "Real-World Projects & Best Practices",
      icon: (
        <CircleDotDashed className="flex-shrink-0 w-5 h-5 text-rose-500 mt-1" />
      ),
      description:
        "Apply everything you've learned by building fullstack, production-ready projects. Discover best practices for state management, accessibility, CI/CD, and scaling your Next.js applications.",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % demoContent.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + demoContent.length) % demoContent.length,
    );
  };

  // Animation variants with proper TypeScript typing
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const contentVariants: Variants = {
    enter: {
      opacity: 0,
      x: 100,
      scale: 0.95,
    },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const progressVariants: Variants = {
    inactive: {
      scaleX: 0.8,
      opacity: 0.3,
    },
    active: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Animated background blur effects */}
      <motion.div
        className="absolute top-0 right-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <CircleDotDashed className="w-8 h-8 text-rose-500" />
            </motion.div>
          </motion.div>

          <motion.h3
            className="font-bold text-3xl max-w-3xl mx-auto px-4 sm:px-6 text-gray-900"
            variants={itemVariants}
          >
            Watch how Sommaire transforms{" "}
            <motion.span
              className="text-rose-600"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              this Next.js course PDF
            </motion.span>{" "}
            into an easy-to-read summary!
          </motion.h3>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 pt-10"
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              y: -5,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated progress indicators */}
            <div className="absolute top-0 left-0 w-full flex space-x-1 p-4">
              {demoContent.map((_, i) => (
                <motion.div
                  key={i}
                  className={`h-2 rounded-full ${i === activeIndex
                      ? "w-1/4 bg-rose-500"
                      : "w-1/6 bg-rose-100"
                    }`}
                  variants={progressVariants}
                  animate={i === activeIndex ? "active" : "inactive"}
                  layout
                />
              ))}
            </div>

            <div className="pt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.h4
                    className="font-bold text-2xl text-gray-900 mb-4"
                    layoutId="title"
                  >
                    {demoContent[activeIndex].title}
                  </motion.h4>

                  <div className="flex items-start space-x-3 text-gray-700">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {demoContent[activeIndex].icon}
                    </motion.div>

                    <motion.p
                      className="text-lg leading-relaxed min-h-96"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {demoContent[activeIndex].description}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Animated navigation */}
            <motion.div
              className="flex justify-between items-center mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.button
                onClick={handlePrev}
                className="p-3 rounded-full bg-rose-500 text-white shadow-md hover:bg-rose-600 transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="flex space-x-2">
                {demoContent.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-rose-500" : "bg-rose-200"
                      }`}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.8 }}
                    animate={{
                      scale: i === activeIndex ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={handleNext}
                className="p-3 rounded-full bg-rose-500 text-white shadow-md hover:bg-rose-600 transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;

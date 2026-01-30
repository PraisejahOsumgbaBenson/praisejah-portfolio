"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import "./Terminal.css";

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const blossomRef = useRef(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Cherry blossom animation
  useEffect(() => {
    if (blossomRef.current) {
      const petals = blossomRef.current.querySelectorAll(".petal");

      gsap.to(blossomRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });

      petals.forEach((petal, index) => {
        gsap.to(petal, {
          y: -5,
          duration: 1.5 + Math.random() * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });
    }
  }, []);

  const openTerminal = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsOpen(true);

    setTimeout(() => {
      gsap.set(".terminal-window", {
        scale: 0.8,
        opacity: 0,
        x: -20,
      });

      gsap.to(".terminal-window", {
        scale: 1,
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => setIsAnimating(false),
      });
    }, 10);
  };

  const closeTerminal = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    gsap.to(".terminal-window", {
      scale: 0.8,
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsOpen(false);
        setIsAnimating(false);
      },
    });
  };

  const parseCommand = (input) => {
    const parts = input.trim().split(" ");
    return {
      command: parts[0].toLowerCase(),
      args: parts.slice(1),
    };
  };

  const commands = {
    help: () =>
      "Available commands: help, cd [page], ls, clear, exit\ncd pages: about, projects, contact, home",

    cd: (args) => {
      if (args.length === 0) {
        return "Usage: cd [page]\nAvailable pages: about, projects, contact, home";
      }

      const page = args[0].toLowerCase();
      const validPages = ["about", "projects", "contact", "home"];

      if (!validPages.includes(page)) {
        return `Error: Directory '${page}' not found. Available pages: ${validPages.join(
          ", "
        )}`;
      }

      const path = page === "home" ? "/" : `/${page}`;
      router.push(path);
      return `Changing directory to ${page}...`;
    },

    ls: () => "Pages available:\nabout/\nprojects/\ncontact/\nhome/",

    clear: () => {
      setOutput([]);
      return "";
    },

    exit: () => {
      closeTerminal();
      return "Terminal closed. Click the terminal icon to reopen.";
    },
  };

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const { command, args } = parseCommand(input);
      let response = "Command not found. Type 'help' for available commands.";

      if (command) {
        if (commands[command]) {
          response = commands[command](args);
        }

        setOutput((prev) => [
          ...prev,
          { type: "input", text: `$ ${input}` },
          { type: "output", text: response },
        ]);
        setInput("");
      }
    }
  };

  return (
    <>
      {/* Cherry Blossom Terminal Icon */}
      <div
        className={`terminal-icon ${isOpen ? "hidden" : ""}`}
        onClick={openTerminal}
        title="Open Terminal"
        ref={blossomRef}
      >
        <div className="cherry-blossom">
          <div className="blossom-center"></div>
          <div className="petal petal-1"></div>
          <div className="petal petal-2"></div>
          <div className="petal petal-3"></div>
          <div className="petal petal-4"></div>
          <div className="petal petal-5"></div>
        </div>
      </div>

      {/* Terminal Window */}
      {isOpen && (
        <div className="terminal-window">
          <div className="terminal-header">
            <span>
              Terminal - {pathname === "/" ? "home" : pathname.slice(1)}
            </span>
            <button onClick={closeTerminal}>×</button>
          </div>
          <div className="terminal-body" ref={terminalRef}>
            <div className="welcome-message">
              Welcome to Praisejah&apos;s terminal! Type &apos;help&apos; to see
              available commands.
            </div>
            {output.map((item, index) => (
              <div key={index} className={item.type}>
                {item.text.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            ))}
            <div className="input-lines">
              <span className="prompt">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                ref={inputRef}
                spellCheck="false"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Terminal;

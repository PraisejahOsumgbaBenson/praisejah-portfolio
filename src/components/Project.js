import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import "./Project.css";
import image1 from "../assets/img.png";
import image2 from "../assets/r.jpeg";
import image3 from "../assets/v.jpeg";

function Project() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    function splitTextIntoSpans(selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        const [firstDigit, secondDigit] = element.innerText;
        element.innerHTML = `
          <div class="digit-wrapper">
            <span class="first">${firstDigit}</span>
            <span class="second">${secondDigit}</span>
          </div>
        `;
      });
    }

    function populateGallery() {
      const imagesContainers = document.querySelectorAll(".images");
      const imagesPerProject = 3; // Use 3 images per number
      const imagesArray = [image1, image2, image3];

      imagesContainers.forEach((container, projectIndex) => {
        for (let i = 0; i < imagesPerProject; i++) {
          const imagesContainer = document.createElement("div");
          imagesContainer.classList.add("img");

          const img = document.createElement("img");
          img.src = imagesArray[i % imagesArray.length];
          img.alt = `Project ${projectIndex + 1} - Image ${i + 1}`;
          imagesContainer.appendChild(img);

          container.appendChild(imagesContainer);
        }
      });
    }

    splitTextIntoSpans(".mask h1");
    populateGallery();

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(".progress-bar", {
          scaleY: self.progress,
        });
      },
    });

    const previewImg = document.querySelector(".preview-img img");
    const imgElements = document.querySelectorAll(".img img");
    imgElements.forEach((img) => {
      ScrollTrigger.create({
        trigger: img,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => (previewImg.src = img.src),
        onEnterBack: () => (previewImg.src = img.src),
      });
    });
  }, []);

  return (
    <div>
      <div className="whitespace w-1"></div>

      <div className="gallery">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="project">
            <div className="index">
              <div className="mask">
                <h1>{`0${index + 1}`}</h1>
              </div>
            </div>
            <div className="images"></div>
          </div>
        ))}
      </div>

      <div className="whitespace w-2"></div>

      <div className="project-names">
        <div className="indicator">
          <div className="symbol"></div>
        </div>
        <div className="name active">
          <p>VERSE</p>
        </div>
        <div className="name">
          <p>MARKETLIST CAL</p>
        </div>
        <div className="name">
          <p>TABSAVER</p>
        </div>
        <div className="name">
          <p>SPOTIFY</p>
        </div>
        <div className="name">
          <p>BULLETEEN</p>
        </div>
      </div>

      <div className="preview-img">
        <img src={image1} alt="Preview" />
      </div>

      <div className="progress-bar"></div>
      <div className="footer">
        <p>portfolio 2024</p>
      </div>
    </div>
  );
}

export default Project;

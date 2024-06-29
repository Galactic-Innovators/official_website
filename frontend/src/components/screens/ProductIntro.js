import 'animate.css';
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "../../Testing.css";
import Mindmap from "../Mindmap";
import { useInView } from "react-intersection-observer";
import "./AboutScreen.css"; // Create this CSS file for animations

// 创建文档对象
const doc = document.implementation.createHTMLDocument();

// 设置基本结构
doc.appendChild(doc.createElement('html'));
doc.documentElement.lang = 'en';

// 创建头部
const head = doc.createElement('head');
doc.documentElement.appendChild(head);

// 添加 charset meta 标签
const metaCharset = doc.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
head.appendChild(metaCharset);

// 添加 viewport meta 标签
const metaViewport = doc.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
head.appendChild(metaViewport);

// 添加 animate.css 样式表
const linkAnimate = doc.createElement('link');
linkAnimate.setAttribute('rel', 'stylesheet');
linkAnimate.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');
head.appendChild(linkAnimate);

// 添加自定义样式表
const linkStyles = doc.createElement('link');
linkStyles.setAttribute('rel', 'stylesheet');
linkStyles.setAttribute('href', 'styles.css');
head.appendChild(linkStyles);

// 创建 body
const body = doc.createElement('body');
doc.documentElement.appendChild(body);

// 添加标题
const h1 = doc.createElement('h1');
h1.setAttribute('class', 'title animate__animated animate__backInLeft');
h1.textContent = 'Title';
body.appendChild(h1);

// 创建 flex 容器
const flexContainer = doc.createElement('div');
flexContainer.setAttribute('class', 'flex-container');
body.appendChild(flexContainer);

// 创建 flex 项目
const itemsData = [
  { imgSrc: 'frontend/src/components/screens/product_images/product_1.jpg', videoSrc: '../images/product_testvideo(1).mp4', alt: 'product_1' },
  { imgSrc: 'frontend/src/components/screens/product_images/product_2.jpg', videoSrc: '../images/product_testvideo(2).mp4', alt: 'product_2' },
  { imgSrc: 'frontend/src/components/screens/product_images/product_3.jpg', videoSrc: '../images/product_testvideo(3).mp4', alt: 'product_3' }
];

itemsData.forEach(data => {
  const flexItem = doc.createElement('div');
  flexItem.setAttribute('class', 'flex-item');
  
  const img = doc.createElement('img');
  img.setAttribute('src', data.imgSrc);
  img.setAttribute('alt', data.alt);
  img.setAttribute('class', 'hover-image');
  flexItem.appendChild(img);
  
  const video = doc.createElement('video');
  video.setAttribute('src', data.videoSrc);
  video.setAttribute('class', 'hover-video');
  video.setAttribute('muted', true);
  video.setAttribute('loop', true);
  flexItem.appendChild(video);
  
  flexContainer.appendChild(flexItem);
});

// 输出 HTML 结构
console.log(doc.documentElement.outerHTML);


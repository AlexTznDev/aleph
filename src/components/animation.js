/* eslint-disable @typescript-eslint/no-unused-vars */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reeller } from 'reeller';
Reeller.registerGSAP(gsap);
gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {

});

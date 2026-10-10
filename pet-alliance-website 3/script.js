const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#inquiry-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const values = new FormData(form);
  const email = '';
  const status = document.querySelector('#form-status');
  const message = `Pet Alliance inquiry\n\nName: ${values.get('name')}\nBusiness: ${values.get('business') || 'Not provided'}\nEmail: ${values.get('email')}\n\n${values.get('message') || ''}`;
  if (!email) {
    try {
      await navigator.clipboard.writeText(message);
      status.textContent = 'Your inquiry has been copied. Add a Pet Alliance contact email to this site to enable direct sending.';
    } catch {
      status.textContent = 'Your inquiry is ready. Add a Pet Alliance contact email to this site to enable direct sending.';
    }
    return;
  }
  window.location.href = `mailto:${email}?subject=${encodeURIComponent('Pet Alliance business inquiry')}&body=${encodeURIComponent(message)}`;
});

// Restrained, decorative network animation: no external video, data, or tracking.
(() => {
  const canvas = document.querySelector('#hero-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, ratio = 1, frame = 0;
  let points = [];
  const seed = (n) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x); };
  const resize = () => {
    const box = canvas.getBoundingClientRect();
    ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = box.width; height = box.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.max(26, Math.min(58, Math.round(width * height / 6500)));
    points = Array.from({length: count}, (_,i) => ({x:seed(i+1)*width,y:seed(i+93)*height,phase:seed(i+193)*Math.PI*2,drift:.14+seed(i+293)*.26}));
    draw(0);
  };
  const draw = (time) => {
    if (!width || !height) return;
    ctx.clearRect(0,0,width,height);
    const t = reducedMotion.matches ? 0 : time*.00025;
    const maxDist = Math.min(130, width*.27);
    for (let i=0;i<points.length;i++) {
      const a=points[i];
      const ax=a.x + Math.sin(t+a.phase)*11*a.drift;
      const ay=a.y + Math.cos(t*.8+a.phase)*9*a.drift;
      for (let j=i+1;j<points.length;j++) {
        const b=points[j];
        const bx=b.x + Math.sin(t+b.phase)*11*b.drift;
        const by=b.y + Math.cos(t*.8+b.phase)*9*b.drift;
        const dx=ax-bx,dy=ay-by,dist=Math.hypot(dx,dy);
        if(dist<maxDist){ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.strokeStyle=`rgba(190,211,207,${(1-dist/maxDist)*.17})`;ctx.lineWidth=.7;ctx.stroke();}
      }
      const pulse=.55+.45*Math.sin(t*2+a.phase);
      ctx.beginPath();ctx.arc(ax,ay,1.1+pulse*.7,0,Math.PI*2);ctx.fillStyle=`rgba(205,220,214,${.22+pulse*.32})`;ctx.fill();
    }
    // A few softly drifting data points add movement without competing with the headline.
    for(let k=0;k<4;k++){
      const x=((time*.012+k*width*.29)%(width+30))-15;
      const y=height*(.2+k*.19)+Math.sin(t*3+k)*8;
      ctx.beginPath();ctx.arc(x,y,1.7,0,Math.PI*2);ctx.fillStyle='rgba(207,174,121,.75)';ctx.fill();
    }
    if(!reducedMotion.matches) frame=requestAnimationFrame(draw);
  };
  const motionChange=()=>{cancelAnimationFrame(frame);draw(0);if(!reducedMotion.matches)frame=requestAnimationFrame(draw);};
  new ResizeObserver(resize).observe(canvas);
  reducedMotion.addEventListener?.('change',motionChange);
  resize();
  if(!reducedMotion.matches)frame=requestAnimationFrame(draw);
})();

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowLeft, Heart, Menu, X, Instagram, Phone, MessageCircle, Search, ChevronDown, ChevronLeft, ChevronRight, CheckCircle2, MapPin, PawPrint, ShieldCheck, Sparkles, Mail, Clock3, Star, Play, Check } from 'lucide-react';
import { puppies, questions, familyPhotos, photo, puppyPhotoIds } from './data';
import './style.css';

const WA_NUMBER = '971500000000'; // Demonstration number visible in reference; replace only with an authorized number.
const whatsApp = (message = "Hi TeddyPups, I'd love to know more about your puppies!") => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
const path = (v) => `/${v}`;
const slugLink = (p) => `/puppies/${p.slug}`;

function PuppyImage({src,alt,className='',loading='lazy'}) {
  const [imageSrc,setImageSrc] = useState(src);
  useEffect(()=>setImageSrc(src),[src]);
  return <img className={className} src={imageSrc} alt={alt} loading={loading} onError={() => {
   // Use the photo saved from the reference page if its online HD endpoint fails.
   if (imageSrc.startsWith('https://puppy.instabizweb.com/')) {
     const sourcePath = new URL(imageSrc).searchParams.get('url') || '';
     const name = sourcePath.split('/').pop().replace(/\.(webp|jpg)$/i, '.jpeg');
     setImageSrc('/reference/' + name);
   } else if (imageSrc !== '/fallback-puppy.svg') {
     setImageSrc('/fallback-puppy.svg');
   }
 }} />;
}
function Button({to,children,alt=false,external=false, className=''}) {
  return <a href={to} className={`btn ${alt?'btn-light':''} ${className}`} {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}<ArrowRight size={17}/></a>;
}
function SectionHeading({eyebrow,title,description,center=false}) {return <div className={`section-heading ${center?'center':''}`}><div className="eyebrow"><PawPrint size={14}/>{eyebrow}</div><h2>{title}</h2>{description&&<p>{description}</p>}</div>}
function Header(){const [open,setOpen]=useState(false); const nav=[['Home','/'],['Puppies','/puppies'],['Happy families','/happy-families'],['How it works','/how-it-works'],['FAQ','/faq'],['Visit & contact','/contact']]; return <><div className="top-strip">every puppy is family <span>♡</span></div><header className="site-header"><a href="/" className="logo"><span className="logo-icon"><img src="/reference/logo.png" alt="TeddyPups logo"/></span><span>Teddy<span>Pups</span><small>U.A.E.</small></span></a><nav className="nav-desktop">{nav.map(([name,url])=><a key={url} href={url} className={window.location.pathname===url?'active':''}>{name}</a>)}</nav><a className="whatsapp-top" href={whatsApp()} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp us</a><button aria-label="Toggle menu" className="mobile-toggle" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>{open&&<nav className="mobile-panel">{nav.map(([n,u])=><a key={u} href={u}>{n}<ArrowRight size={16}/></a>)}<a href={whatsApp()} target="_blank" rel="noreferrer">WhatsApp us</a></nav>}</>}
function Footer(){return <footer className="footer"><div className="container footer-grid"><div><a className="logo footer-logo" href="/"><span className="logo-icon"><img src="/reference/logo.png" alt="TeddyPups logo"/></span><span>Teddy<span>Pups</span><small>U.A.E.</small></span></a><h3>Home, at last.</h3><p>TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies and caring service.</p></div><div><h4>Explore</h4>{[['Available puppies','/puppies'],['Gone home','/gone-home'],['Happy families','/happy-families'],['How it works','/how-it-works'],['Delivery & collection','/delivery'],['FAQ','/faq'],['Visit & contact','/contact']].map(([n,u])=><a key={u} href={u}>{n}</a>)}</div><div><h4>Say hello</h4><p>Downtown Dubai, United Arab Emirates</p><a href={whatsApp()} target="_blank" rel="noreferrer">WhatsApp +971 50 000 0000</a><a href="/contact">Send an enquiry</a><div className="social-row"><Instagram size={20}/><Heart size={20}/><MessageCircle size={20}/></div></div></div><div className="footer-bottom">© 2026 TeddyPups U.A.E. · Educational frontend replica, not affiliated with the original business. <span>every puppy is family</span></div></footer>}
function PageHero({eyebrow,title,description}){return <section className="page-hero"><div className="container"><div className="eyebrow"><PawPrint size={14}/>{eyebrow}</div><h1>{title}</h1><p>{description}</p></div></section>}
function PuppyCard({p,index=0}){
  return <a className="puppy-card" href={slugLink(p)}>
    <div className="puppy-card-img">
      <PuppyImage src={p.image} alt={`${p.name} ${p.breed} puppy`} loading={index<3?'eager':'lazy'}/>
      <span className="status-pill">Available</span>
      {p.video&&<span className="video-pill"><Play size={13}/> video</span>}
    </div>
    <div className="puppy-card-content"><h3>{p.name}</h3><p>{p.breed} · {p.gender.toLowerCase()} · {p.age}</p></div>
  </a>
}
function PuppyGrid({items}){return <div className="puppy-grid">{items.map((p,i)=><PuppyCard p={p} index={i} key={p.slug}/>)}</div>}
function Journey(){const steps=[['01','Choose your breed','Tell us what you are looking for. We will help you find the puppy that suits your lifestyle.'],['02','Get photos & details','See real photos, puppy details, health information, and helpful updates.'],['03','Safe delivery home','We guide you through confirmation, pick-up, or safe delivery.']];return <section className="section paper-section"><div className="container"><SectionHeading eyebrow="your puppy journey" title="A little journey, a lot of love" description="Three easy steps to meeting your new best friend." center/><div className="steps-grid">{steps.map(([n,t,s])=><div className="step-card" key={n}><span>{n}</span><PawPrint size={27}/><h3>{t}</h3><p>{s}</p></div>)}</div><div className="center action-gap"><Button to="/how-it-works">How it works</Button></div></div></section>}
function WhatsAppPreview(){const [selection,setSelection]=useState('');return <section className="section"><div className="container split-section"><div><SectionHeading eyebrow="say hello" title="A message away from your best friend" description="Tell us which breed you love. Our team will share photos, answers, and all the details."/><div className="chips">{['Maltipoo','Pomeranian','Poodle','Cavapoo','Shih Tzu'].map(s=><button className={`chip ${selection===s?'chip-active':''}`} key={s} onClick={()=>setSelection(s)}>{s}</button>)}</div><p className="hint-line">{selection?`You selected ${selection}. We can help you ask about this breed.`:'Choose your favorite breed above to start.'}</p><Button to={whatsApp(selection?`Hi TeddyPups! I'd love to know more about your ${selection} puppies.`:undefined)} external>Say hello on WhatsApp</Button></div><div className="chat-visual"><div className="chat-head"><span className="online-dot"/> TeddyPups U.A.E. <span>online</span></div><div className="chat-message">Hi! Welcome to TeddyPups ♡</div><div className="chat-message darker">{selection?`I'd love to know more about ${selection} puppies!`:'Hi! I would love to know more about your puppies.'}</div><div className="chat-message">We would love to help you find your perfect match! 🐾</div><PuppyImage className="chat-puppy" src={photo(puppyPhotoIds[1],600)} alt="Small fluffy puppy" /></div></div></section>}
function ShowcaseDoor({p,i}){
 const tones=['honey','cocoa','amber','rose','chocolate','tan'];
 return <a href={slugLink(p)} className={`showcase-pup ${tones[i%tones.length]}`} aria-label={`See ${p.name} puppy profile`}>
   <div className="showcase-title"><h3>{p.name}</h3><p>{p.breed} · {p.gender.toLowerCase()} · {p.age}</p></div>
   <div className="showcase-door"><span className="door-decoration" aria-hidden="true">✿</span><span className="door-label">Available</span><PuppyImage src={p.image} alt={`${p.name}, ${p.breed}`}/><span className="door-leaf door-leaf-left" aria-hidden="true"><span className="door-panel-grain"/></span><span className="door-leaf door-leaf-right" aria-hidden="true"><span className="door-panel-grain"/></span><span className="door-knob" aria-hidden="true"/></div>
 </a>
}
function DogSticker({className=''}){return <img src="/mascot-dog.svg" className={`dog-sticker ${className}`} alt="" aria-hidden="true"/>}

const exactHeroPuppies = [
  {name:'Korean Teacup Pomeranian',slug:'korean-teacup-pomeranian-male',image:'b942a5_dcb8eb174915463ea0c40c58b7b0e406-mv2.jpeg',x:'9%',w:'8.6rem',peek:.62},
  {name:'Shih Tzu',slug:'shitzu-female',image:'b942a5_eb14616c76c24da89afe7fa3b7d7ae6a-mv2.jpeg',x:'22.5%',w:'10.4rem',peek:.8},
  {name:'Toy Poodle',slug:'toy-poodle-male-female',image:'b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpeg',x:'35%',w:'9.2rem',peek:.7},
  {name:'Maltipoo',slug:'maltipoo-female-1',image:'b942a5_7dd33c9b78c04f78a6a1c7386fb55620-mv2.jpeg',x:'65%',w:'9.4rem',peek:.74},
  {name:'Korean Teacup Pomeranian',slug:'pomeranian-female',image:'b942a5_967bb346583b4146acb56607f5da5f21-mv2.jpeg',x:'77.5%',w:'10.6rem',peek:.82},
  {name:'Max',slug:'maltipoo-max-male',image:'b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.jpeg',x:'91%',w:'8.4rem',peek:.60}
];

function Home(){
 const welcomePups=puppies.slice(0,6);
 return <>

<section className="reference-hero ref7-hero">
  <div className="ref7-sun" aria-hidden="true"/>
  <div className="ref7-sparkle ref7-sparkle-left" aria-hidden="true">✦</div>
  <div className="ref7-sparkle ref7-sparkle-right" aria-hidden="true">✶</div>
  <div className="container reference-hero-content ref7-copy">
    <p className="reference-kicker ref7-kicker">every puppy is family</p>
    <h1>Premium teacup<br/>puppies in Dubai</h1>
    <p>Meet your new best friend in our Dubai showroom, or order a rare<br className="desktop-only"/> miniature breed from trusted breeders worldwide.</p>
    <div className="hero-actions"><Button to="/puppies">View available puppies</Button><Button to={whatsApp()} alt external>Enquire on WhatsApp</Button></div>
  </div>
  <div className="ref7-stage" aria-label="Featured puppies">
    {exactHeroPuppies.map((p,i)=><a
       key={p.slug}
       href={slugLink(p)}
       className="ref7-seat"
       style={{'--ref7-x':p.x,'--ref7-w':p.w,'--ref7-peek':p.peek,'--ref7-i':i}}
       aria-label={`Meet ${p.name}`}
       title={p.name}
     ><span className="ref7-portrait"><PuppyImage src={photo(p.image)} alt={`${p.name} puppy`} loading="eager"/></span>
      <span className="ref7-label">{p.name}</span>
     </a>)}
    <img className="ref7-mascot" src="/reference/hero-mascot-exact.svg" alt="" aria-hidden="true"/>
    <div className="ref7-quilt" aria-hidden="true"/>
  </div>
</section>
 <section className="showcase-section"><div className="container showcase-content">
  <div className="showcase-header"><div><h2>Meet the pups</h2><p>Real puppies, real photos, looking for their families right now.</p></div><a className="showcase-see-all" href="/puppies">See all available puppies <ArrowRight size={17}/></a></div>
  <div className="showcase-track">{welcomePups.map((p,i)=><ShowcaseDoor key={p.slug} p={p} i={i}/>)}</div>
  <DogSticker className="showcase-dog"/>
 </div><div className="wood-floor"/></section>
 <section className="reference-ways"><div className="container"><p className="reference-kicker">two paths, one happy ending</p><h2 className="ways-heading">Two ways home</h2><div className="reference-way-grid">
 <article className="reference-way-card"><span className="ribbon">Puppies in Dubai</span><div className="way-photo-frame"><PuppyImage src={photo(puppyPhotoIds[4])} alt="Puppy in Dubai"/></div><p>See them, love them, take them home. Come meet our locally available puppies before you decide.</p><a href="/puppies?where=local" className="way-button">Meet local puppies <ArrowRight size={15}/></a></article>
 <article className="reference-way-card imported-card"><span className="ribbon">Imported for you</span><div className="plane-sketch" aria-hidden="true">✈ <span>⋯⋯⋯</span> ♡</div><p>Exclusive Korean teacup puppies and other rare breeds, brought with care from trusted breeders.</p><a href="/puppies?where=imported" className="way-button">See imported puppies <ArrowRight size={15}/></a></article>
 </div></div></section>
 <section className="trust-reference"><div className="container trust-inner"><span className="trust-note">PUPPY PASSPORT ✦ EST. WITH LOVE</span><div className="trust-panel"><div className="trust-intro"><p className="reference-kicker">small paws, big love</p><h2>Why families trust TeddyPups</h2><p>Thoughtful care, clear communication, and support for every precious puppy.</p></div><div className="trust-badges">{[[ShieldCheck,'Vet checked','Health and vaccination checks'],[Heart,'Family first','Care before and after home'],[Clock3,'Full support','Answers along the journey']].map(([Icon,t,d])=><div className="trust-badge" key={t}><Icon size={28}/><strong>{t}</strong><small>{d}</small></div>)}</div><DogSticker className="trust-dog"/></div></div></section>
 <section className="families-reference"><div className="container"><div className="section-row"><div><p className="reference-kicker">real hugs, real happy endings</p><h2>Happy families <span>♡</span></h2><p>Nothing makes us happier than seeing our puppies find their loving homes.</p></div><a className="showcase-see-all" href="/happy-families">See all stories <ArrowRight size={16}/></a></div><div className="family-strip">{familyPhotos.slice(0,4).map((f,i)=><div className="family-photo" key={i}><PuppyImage src={f.image} alt={f.caption}/><span>{f.caption}</span></div>)}</div></div></section>
 <section className="section dark-home"><div className="container"><SectionHeading eyebrow="a happy ending" title="Home, at last." center/><div className="hero-actions"><Button to="/happy-families" alt>Happy families</Button><Button to="/contact">Visit & contact</Button></div><DogSticker className="footer-dog"/></div></section>
 <section className="section home-faq-section"><div className="container narrow"><div className="section-row"><SectionHeading eyebrow="a few common questions" title="Questions & answers"/><a className="showcase-see-all" href="/faq">See all questions <ArrowRight size={16}/></a></div><FaqList items={questions.slice(0,3)}/></div></section>
 <BottomCTA/>
 </>;
}
function BottomCTA(){return <section className="bottom-cta"><div className="container bottom-inner"><div><span className="eyebrow">ready for a new beginning?</span><h2>Ready to meet your new best friend?</h2><p>A happy, healthy puppy and a whole lot of love may be just one message away.</p><div className="hero-actions"><Button to="/puppies" alt>Meet the puppies</Button><Button to="/contact">Visit & contact</Button></div></div><div className="cta-circle"><PuppyImage src={photo(puppyPhotoIds[10])} alt="Puppy ready to meet a new family"/></div></div></section>}
function Puppies(){
  const q=new URLSearchParams(window.location.search);
  const [where,setWhere]=useState(q.get('where')==='local'?'In Dubai':q.get('where')==='imported'?'Imported for you':'All');
  const [breed,setBreed]=useState('All');
  const [gender,setGender]=useState('All');
  const [search,setSearch]=useState('');
  const breeds=['Maltipoo','Pomeranian','Poodle','Cavapoo','Shih Tzu'];
  const shown=puppies.filter(p=>(where==='All'||p.where===where)&&(breed==='All'||p.breed.toLowerCase().includes(breed.toLowerCase()))&&(gender==='All'||p.gender.toLowerCase().includes(gender.toLowerCase()))&&`${p.name} ${p.breed} ${p.gender}`.toLowerCase().includes(search.toLowerCase()));
  const reset=()=>{setWhere('All');setBreed('All');setGender('All');setSearch('')};
  return <>
    <section className="puppies-banner"><div className="container puppy-banner-inner"><div>
      <p className="reference-kicker">every puppy is family</p><h1>Available puppies</h1><p>Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.</p>
    </div><div className="banner-mascot" aria-hidden="true"><img src="/mascot-dog.svg" alt=""/><small>self-portrait</small></div></div></section>
    <section className="section listings-section"><div className="container">
      <div className="filter-board">
        <div className="filter-row"><span>where</span><div className="filter-chips">{[['All','Everywhere'],['Imported for you','Imported'],['In Dubai','In Dubai']].map(([value,label])=><button key={value} className={where===value?'chosen':''} onClick={()=>setWhere(value)}>{label}</button>)}</div></div>
        <div className="filter-row"><span>breed</span><div className="filter-chips"><button className={breed==='All'?'chosen':''} onClick={()=>setBreed('All')}>All breeds</button>{breeds.map(b=><button key={b} className={breed===b?'chosen':''} onClick={()=>setBreed(b)}>{b}</button>)}</div></div>
        <div className="filter-row"><span>boy or girl</span><div className="filter-chips">{['All','Boy','Girl'].map(g=><button key={g} className={gender===g?'chosen':''} onClick={()=>setGender(g)}>{g==='All'?'Both':g==='Boy'?'Boys':'Girls'}</button>)}</div></div>
        <div className="filter-search"><label><Search size={15}/><input aria-label="Search puppies" placeholder="Search by puppy name or breed" value={search} onChange={e=>setSearch(e.target.value)}/></label><button onClick={reset}>Clear filters</button></div>
      </div>
      <p className="result-count handwritten">{shown.length} {shown.length===1?'puppy':'puppies'} looking for a home</p>
      {shown.length?<PuppyGrid items={shown}/>:<div className="empty-state">No puppies found. Try a different filter.<br/><button onClick={reset} className="btn">Reset filters</button></div>}
    </div></section><BottomCTA/>
  </>;
}
function EnquiryForm({subject='TeddyPups puppy enquiry'}) {const [form,setForm]=useState({name:'',phone:'',email:'',area:'',message:''});const [error,setError]=useState('');const update=(key,val)=>setForm(p=>({...p,[key]:val}));const onSubmit=(e)=>{e.preventDefault();if(!form.name.trim()||!form.phone.trim()){setError('Please enter your name and phone number.');return;}setError(''); const body=`Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nArea: ${form.area}\nMessage: ${form.message}`; const mailto=`mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; window.location.href=mailto;};return <form className="enquiry-form" onSubmit={onSubmit}><div className="form-row"><label>Your name *<input value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Your name" required/></label><label>Phone or WhatsApp *<input value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="+971 50 123 4567" required/></label></div><div className="form-row"><label>Email (optional)<input type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com"/></label><label>Your area (optional)<input value={form.area} onChange={e=>update('area',e.target.value)} placeholder="Dubai Marina"/></label></div><label>Message<textarea rows="5" value={form.message} onChange={e=>update('message',e.target.value)} placeholder="Tell us what you're looking for..."/></label>{error&&<p className="form-error" role="alert">{error}</p>}<p className="form-note">Demo form: clicking Send opens your email app with the details. No messages are stored on a server.</p><button className="btn" type="submit">Send enquiry <ArrowRight size={17}/></button></form>}
function PuppyDetail({slug}){const pup=puppies.find(p=>p.slug===slug);const [selected,setSelected]=useState(0);useEffect(()=>{setSelected(0)},[slug]);if(!pup)return <NotFound/>;const idx=puppies.indexOf(pup);return <><section className="section profile-section"><div className="container"><div className="breadcrumbs"><a href="/puppies">Available puppies</a><span>/</span>{pup.name}</div><div className="profile-grid"><div className="profile-gallery"><div className="big-picture"><PuppyImage src={pup.gallery[selected]} alt={`${pup.name} photo ${selected+1}`}/><button className="gallery-prev" aria-label="Previous photo" onClick={()=>setSelected((selected+2)%3)}><ChevronLeft/></button><button className="gallery-next" aria-label="Next photo" onClick={()=>setSelected((selected+1)%3)}><ChevronRight/></button><span className="gallery-count">{selected+1} / {pup.gallery.length}</span></div><div className="thumbs">{pup.gallery.map((img,i)=><button key={i} onClick={()=>setSelected(i)} className={selected===i?'selected':''} aria-label={`Show photo ${i+1}`}><PuppyImage src={img} alt={`${pup.name} thumbnail ${i+1}`}/></button>)}</div></div><div className="profile-info"><span className="eyebrow">hello, it's me</span><span className="status-pill inline-pill">● Available</span><h1>{pup.name}</h1><h3>{pup.breed}</h3><div className="attribute-list">{[['Breed',pup.breed],['Boy or girl',pup.gender],['Age',pup.age],['Where',pup.where]].map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div><div className="stacked-buttons"><Button to={whatsApp(`Hi TeddyPups! I'd love to know more about ${pup.name} (${pup.breed}).`)} external>Ask on WhatsApp</Button><Button to="#enquire" alt>Send an enquiry</Button></div></div></div></div></section><section className="section pale-section"><div className="container"><SectionHeading eyebrow="the puppy promise" title={`Every Teddy Pup comes with care`} center/><div className="four-checks">{['Vaccinated','Dewormed','Verified health certificate','Health checked before going home'].map(t=><div key={t}><CheckCircle2 size={24}/>{t}</div>)}</div></div></section><Journey/><section id="enquire" className="section"><div className="container enquiry-wrap"><div><SectionHeading eyebrow="dear TeddyPups…" title={`Ask about ${pup.name}`} description="Leave your details and we will help you get in touch."/><p className="hint-line">Prefer a quick reply? Use the WhatsApp button above.</p></div><EnquiryForm subject={`Puppy enquiry: ${pup.name}`}/></div></section><div className="container prevnext"><a href={slugLink(puppies[(idx+14)%puppies.length])}><ArrowLeft size={18}/> Previous pup</a><a href={slugLink(puppies[(idx+1)%puppies.length])}>Next pup <ArrowRight size={18}/></a></div></>}
function FaqList({items}){const [open,setOpen]=useState(-1);return <div className="faqs">{items.map(([q,a],i)=><div className="faq-item" key={q}><button aria-expanded={open===i} onClick={()=>setOpen(open===i?-1:i)}><span>{q}</span><span className="faq-icon">{open===i?'−':'+'}</span></button>{open===i&&<p>{a}</p>}</div>)}</div>}
function FaqPage(){const [search,setSearch]=useState('');const hits=questions.filter(([q,a])=>`${q} ${a}`.toLowerCase().includes(search.toLowerCase()));return <><PageHero eyebrow="sniff out an answer" title="Questions & answers" description="Can't find what you're looking for? We're happy to help."/><section className="section"><div className="container narrow"><label className="search-wrap faq-search"><Search size={20}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search: delivery, Korea, vaccinated…"/></label><div className="faq-count">{hits.length} notes on the board</div>{hits.length?<FaqList items={hits}/>:<p>No matching questions found.</p>}<div className="center action-gap"><Button to={whatsApp()} external>Ask your own question</Button></div></div></section></>}
function HappyFamilies(){return <><PageHero eyebrow="our wall of happy endings" title="Happy families" description="Nothing makes us happier than seeing our puppies find their loving homes."/><section className="section"><div className="container"><div className="quote-block">“TeddyPups truly made our dream a reality. They supported us at every step.”<span>— Sarah M., Dubai, UAE</span></div><div className="families-grid">{familyPhotos.map((f,i)=><div className="family-photo" key={i}><PuppyImage src={f.image} alt={f.caption}/><span>{f.caption}</span></div>)}</div></div></section></>}
function HowItWorks(){const [active,setActive]=useState('local');const loc=[['Explore our puppies','Browse availability and get to know each breed.'],['Choose your puppy','Open a profile, see photos, and ask questions.'],['Meet before you choose','Visit our showroom and get to know your puppy.'],['Pick-up or delivery','Bring your new friend home or arrange safe delivery.']];const imp=[['Reserve your puppy','Tell us about the puppy you love.'],['Personalized consultation','Confirm details and receive helpful updates.'],['Import and arrival','Health checks, safe travel and documentation.'],['Welcome home','Settle your new puppy into your home.']];return <><PageHero eyebrow="your journey" title="How it works" description="Whether you visit us in Dubai or arrange an imported puppy, we make every step special."/><section className="section"><div className="container"><SectionHeading eyebrow="choose your way" title="Two ways home" center/><div className="tabs"><button onClick={()=>setActive('local')} className={active==='local'?'active':''}>In Dubai · meet in person</button><button onClick={()=>setActive('imported')} className={active==='imported'?'active':''}>Imported · order upon request</button></div><div className="process-panel"><div><span className="eyebrow">{active==='local'?'a lovely visit':'a journey made for you'}</span><h2>{active==='local'?'Meet your puppy in person':'Order upon request'}</h2><p>{active==='local'?'Step into our Downtown Dubai showroom, meet your new companion, and feel the connection in person.':'Explore rare breeds from reputable breeders. We support the process, from reservation to safe arrival.'}</p><Button to="/puppies">Explore puppies</Button></div><div className="process-steps">{(active==='local'?loc:imp).map(([n,d],i)=><div key={n}><span>{i+1}</span><div><h4>{n}</h4><p>{d}</p></div></div>)}</div></div><div className="trust-grid spaced">{[['Hand-selected breeders','Careful sourcing and responsible practices.'],['Full transparency','Photos, health details, and clear communication.'],['Safe delivery','Coordinated delivery options and support.'],['Support 24/7','Answers through the journey.']].map(([n,d])=><div className="trust-card" key={n}><Check size={26}/><h3>{n}</h3><p>{d}</p></div>)}</div></div></section><BottomCTA/></>}
function Contact(){return <><PageHero eyebrow="come say hello" title="Visit & contact" description="We would love to hear from you and help you find your new best friend."/><section className="section"><div className="container enquiry-wrap"><div><SectionHeading eyebrow="find us in Dubai" title="A little hello goes a long way"/><div className="contact-cards"><div><MapPin/><strong>Our showroom</strong><span>Downtown Dubai, United Arab Emirates</span></div><div><MessageCircle/><strong>WhatsApp</strong><a href={whatsApp()} target="_blank" rel="noreferrer">+971 50 000 0000</a></div><div><Mail/><strong>Email</strong><span>Contact us using the enquiry form</span></div></div></div><EnquiryForm subject="General TeddyPups enquiry"/></div></section></>}
function GoneHome(){return <><PageHero eyebrow="forever families" title="Already gone home" description="These lovely puppies have found their happy homes."/><section className="section"><div className="container"><div className="puppy-grid">{['Ace','Leo','Mia','Sadie','Pomeranian'].map((n,i)=><div className="puppy-card gone" key={n}><div className="puppy-card-img"><PuppyImage src={photo(puppyPhotoIds[i+6])} alt={`${n} puppy`}/><span className="status-pill">♥ Gone home</span></div><div className="puppy-card-content"><h3>{n}</h3><span className="muted-small">With a loving family</span></div></div>)}</div></div></section></>}
function Delivery(){return <><PageHero eyebrow="the way home" title="Delivery & collection" description="From Downtown Dubai to destinations around the world, every journey deserves care."/><section className="section"><div className="container"><div className="trust-grid">{[['Same-day pickup','Meet local puppies and take your match home.'],['Dubai delivery','Safe arrival at your home.'],['International travel','Import coordination and essential paperwork.'],['Aftercare support','Help as you welcome a new family member.']].map(([n,d])=><div className="trust-card" key={n}><PawPrint/><h3>{n}</h3><p>{d}</p></div>)}</div></div></section><BottomCTA/></>}
function NotFound(){return <section className="section not-found"><div className="container center"><PawPrint size={60}/><h1>Oops, wrong paw print!</h1><p>We couldn't find that page.</p><Button to="/">Back to home</Button></div></section>}
function App(){
 // Scroll effects are progressive enhancement: the page still works without them.
 useEffect(()=>{
   const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   const targets=[...document.querySelectorAll('.showcase-header, .showcase-pup, .reference-way-card, .trust-badge, .families-reference .family-photo, .families-grid .family-photo, .process-steps > div, .puppy-card, .faq-item, .bottom-inner')];
   if(prefersReducedMotion || !('IntersectionObserver' in window)) return;
   document.documentElement.classList.add('motion-enabled');
   targets.forEach((el,i)=>{el.classList.add('v6-reveal');el.style.setProperty('--v6-delay',`${Math.min(i%5,4)*80}ms`)});
   let firstDoorTimer;
   const observer=new IntersectionObserver(entries=>{
     entries.forEach(({target,isIntersecting})=>{
       if(!isIntersecting)return;
       target.classList.add('is-visible');
       observer.unobserve(target);
       if(target.matches('.showcase-pup:first-child')){
         firstDoorTimer=window.setTimeout(()=>target.classList.add('door-peek'),470);
       }
     });
   },{threshold:0.12,rootMargin:'0px 0px -25px 0px'});
   targets.forEach(target=>observer.observe(target));
   return ()=>{observer.disconnect();window.clearTimeout(firstDoorTimer);document.documentElement.classList.remove('motion-enabled')};
 },[]);
 const url=window.location.pathname;let content;if(url==='/')content=<Home/>;else if(url==='/puppies')content=<Puppies/>;else if(url.startsWith('/puppies/'))content=<PuppyDetail slug={decodeURIComponent(url.split('/')[2])}/>;else if(url==='/faq')content=<FaqPage/>;else if(url==='/happy-families')content=<HappyFamilies/>;else if(url==='/how-it-works')content=<HowItWorks/>;else if(url==='/contact')content=<Contact/>;else if(url==='/gone-home')content=<GoneHome/>;else if(url==='/delivery')content=<Delivery/>;else content=<NotFound/>;return <><Header/><main>{content}</main><Footer/><a aria-label="WhatsApp quick contact" href={whatsApp()} target="_blank" rel="noreferrer" className="float-whatsapp"><MessageCircle size={24}/></a></>}

createRoot(document.getElementById('root')).render(<App/>);

/** Shared split-hero + floating inquiry form (family-hotels-in-murree layout). */
export const MURREE_ESTATE_HERO_STYLES = `
.family-murree-hero,.family-murree-hero h1,.family-murree-hero h2{font-family:'Playfair Display',Georgia,serif;}
.family-murree-hero{font-family:'Inter',system-ui,sans-serif;min-height:100dvh;display:flex;flex-direction:column;background:hsl(var(--bg));overflow-x:clip;max-width:100vw;}
.family-murree-hero__body{position:relative;flex:1;min-width:0;}
.family-murree-hero__grid{display:grid;min-height:calc(100dvh - 4.5rem);}
@media(min-width:1024px){.family-murree-hero__grid{grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);min-height:calc(100vh - 4.75rem);}}
.family-murree-hero__left{background:hsl(var(--bg));display:flex;flex-direction:column;justify-content:center;padding:1.5rem 1.5rem 2rem;min-width:0;}
@media(min-width:768px){.family-murree-hero__left{padding:2rem 2.5rem 2.5rem;}}
@media(min-width:1024px){.family-murree-hero__left{padding:3rem 3rem 3.5rem 3.5rem;padding-right:min(12rem,28vw);}}
.family-murree-hero__right{position:relative;display:none;}
@media(min-width:1024px){.family-murree-hero__right{display:block;min-height:100%;}}
.family-murree-hero__right img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;}
.family-murree-hero__right::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,hsl(var(--bg)) 0%,transparent 28%);}
.family-murree-hero__form-wrap{position:relative;z-index:35;width:100%;max-width:100%;box-sizing:border-box;padding:0 1rem 2.5rem;margin-top:-3.5rem;}
@media(min-width:1024px){.family-murree-hero__form-wrap{position:absolute;left:50%;top:50%;transform:translate(-32%,-46%);width:400px;max-width:calc(100vw - 2rem);padding:0;margin:0;}}
.family-murree-hero__card{width:100%;max-width:100%;box-sizing:border-box;background:hsl(var(--card));border-radius:24px;padding:1.25rem 1rem 1.5rem;border:1px solid hsl(var(--border));box-shadow:0 25px 60px -20px hsl(165 60% 18% / .35);overflow:hidden;}
@media(min-width:640px){.family-murree-hero__card{padding:1.85rem 1.85rem 1.65rem;}}
.family-murree-hero__card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem;margin-bottom:1.35rem;}
.family-murree-hero__card-title{font-family:'Playfair Display',Georgia,serif;font-size:1.55rem;font-weight:600;line-height:1.2;color:hsl(165 60% 18%);margin:0;}
.family-murree-hero__badge{font-size:.625rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#3E7E69;padding-top:.35rem;white-space:nowrap;}
.family-murree-hero__label{display:block;font-size:.625rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:hsl(var(--muted));margin-bottom:.4rem;}
.family-murree-hero__input,.family-murree-hero__select,.family-murree-hero__textarea{width:100%;max-width:100%;min-width:0;box-sizing:border-box;border:1px solid hsl(var(--border));background:#fff;border-radius:8px;padding:.7rem .85rem;font-size:.875rem;color:hsl(var(--fg));outline:none;font-family:inherit;transition:border-color .2s,box-shadow .2s;}
.family-murree-hero__input[type="date"]{display:block;-webkit-appearance:none;appearance:none;min-height:2.75rem;font-size:.8125rem;}
.family-murree-hero__input[type="date"]::-webkit-date-and-time-value{text-align:left;}
.family-murree-hero__input[type="date"]::-webkit-calendar-picker-indicator{cursor:pointer;opacity:.65;margin-left:0;}
.family-murree-hero__input:focus,.family-murree-hero__select:focus,.family-murree-hero__textarea:focus{border-color:hsl(165 55% 32%);box-shadow:0 0 0 3px hsl(165 60% 18% / .12);}
.family-murree-hero__textarea{resize:none;min-height:4.5rem;}
.family-murree-hero__select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .85rem center;padding-right:2rem;}
.family-murree-hero__submit{width:100%;display:flex;align-items:center;justify-content:center;gap:.5rem;background:linear-gradient(135deg,hsl(165 60% 18%),hsl(165 55% 32%));color:hsl(40 38% 97%);border-radius:8px;padding:.9rem 1rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-top:.25rem;transition:opacity .2s,transform .2s;}
.family-murree-hero__submit:hover:not(:disabled){opacity:.92;transform:scale(1.01);}
.family-murree-hero__submit:disabled{opacity:.6;cursor:not-allowed;transform:none;}
.family-murree-hero__form-success{border-radius:12px;border:1px solid hsl(165 40% 75%);background:hsl(165 40% 96%);padding:1.25rem;text-align:center;font-size:.875rem;color:hsl(165 50% 22%);}
.family-murree-hero__form-error{border-radius:8px;border:1px solid hsl(0 70% 88%);background:hsl(0 70% 97%);padding:.65rem .85rem;font-size:.8125rem;color:hsl(0 55% 35%);}
.family-murree-hero__form-wa{display:flex;width:100%;align-items:center;justify-content:center;gap:.5rem;border-radius:8px;border:1px solid hsl(165 60% 18%);background:#fff;padding:.7rem 1rem;font-size:.8125rem;font-weight:600;color:hsl(165 60% 18%);transition:background .2s;}
.family-murree-hero__form-wa:hover{background:hsl(165 60% 18% / .06);}
.family-murree-hero__form-note{margin-top:1rem;text-align:center;font-size:.6875rem;line-height:1.5;color:hsl(var(--muted));}
.family-murree-hero__field{margin-bottom:.85rem;min-width:0;}
.family-murree-hero__row{display:grid;grid-template-columns:1fr;gap:.65rem;min-width:0;}
@media(min-width:480px){.family-murree-hero__row{grid-template-columns:1fr 1fr;}}
.family-murree-hero__date-wrap{position:relative;min-width:0;width:100%;}
.family-murree-hero__date-icon{display:none;}
@media(min-width:1024px){
  .family-murree-hero__cta-primary,.family-murree-hero__cta-secondary{width:auto;}
}
@media(max-width:639px){
  .family-murree-hero__cta-primary,.family-murree-hero__cta-secondary{width:100%;max-width:100%;box-sizing:border-box;text-align:center;}
  .family-murree-hero__card-head{flex-wrap:wrap;}
  .family-murree-hero__badge{padding-top:0;}
}
.family-murree-hero__cta-primary{display:inline-flex;align-items:center;justify-content:center;gap:.35rem;border-radius:9999px;background:linear-gradient(135deg,hsl(var(--accent)),hsl(var(--accent-glow)));color:#fff;padding:.85rem 1.35rem;font-size:.8125rem;font-weight:600;box-shadow:0 15px 40px -10px hsl(162 34% 37% / .45);transition:transform .2s;}
.family-murree-hero__cta-primary:hover{transform:scale(1.03);}
.family-murree-hero__cta-secondary{display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;border:2px solid hsl(165 60% 18%);background:#fff;color:hsl(165 60% 18%);padding:.85rem 1.35rem;font-size:.8125rem;font-weight:600;transition:background .2s,border-color .2s;}
.family-murree-hero__cta-secondary:hover{background:hsl(165 60% 18% / .06);}
.family-murree-hero__kicker{color:#3E7E69;}
.family-murree-hero__headline{color:hsl(165 60% 18%);}
.family-murree-hero__sub{color:hsl(var(--muted));}
.family-murree-hero__logo{color:hsl(165 60% 18%);}
.family-murree-hero__logo-accent{font-style:italic;color:#3E7E69;}
.family-murree-hero__phone{color:hsl(var(--muted));transition:color .2s;}
.family-murree-hero__phone:hover{color:#3E7E69;}
.family-murree-hero__mobile-img{position:relative;height:14rem;width:100%;}
@media(min-width:1024px){.family-murree-hero__mobile-img{display:none;}}
.family-murree-text-accent{color:#3E7E69;}
`;

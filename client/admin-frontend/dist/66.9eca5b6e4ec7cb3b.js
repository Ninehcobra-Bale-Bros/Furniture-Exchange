"use strict";(self.webpackChunkModernize=self.webpackChunkModernize||[]).push([[66],{3066:(Ft,b,m)=>{m.r(b),m.d(b,{AuthenticationModule:()=>Jt});var s=m(5420),h=m(6814),J=m(617),d=m(5195),f=m(2032),L=m(5986),c=m(2296),o=m(6223),Y=m(9134),F=m(9441),p=m(9953),t=m(9212);const Q=()=>["/dashboards/dashboard1"];let E=(()=>{class e{static#t=this.\u0275fac=function(r){return new(r||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-error"]],standalone:!0,features:[t.jDz],decls:10,vars:2,consts:[[1,"blank-layout-container","justify-content-center"],[1,"row"],[1,"col-12","text-center"],["src","/assets/images/backgrounds/errorimg.svg","alt","error-bg"],[1,"auth-title","f-w-600"],[1,"f-s-20","f-w-600","m-b-30"],["mat-flat-button","","color","primary",3,"routerLink"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"img",3),t.TgZ(4,"h2",4),t._uU(5,"Opps!!!"),t.qZA(),t.TgZ(6,"h6",5),t._uU(7,"This page you are looking for could not be found."),t.qZA(),t.TgZ(8,"a",6),t._uU(9,"Go back to Home"),t.qZA()()()()),2&r&&(t.xp6(8),t.Q6J("routerLink",t.DdM(1,Q)))},dependencies:[s.Bz,s.rH,p.q,c.zs],encapsulation:2})}return e})();const j=()=>["/dashboards/dashboard1"];let y=(()=>{class e{static#t=this.\u0275fac=function(r){return new(r||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-maintenance"]],standalone:!0,features:[t.jDz],decls:10,vars:2,consts:[[1,"blank-layout-container","justify-content-center"],[1,"row"],[1,"col-12","text-center"],["src","/assets/images/backgrounds/maintenance.svg","alt","error-bg"],[1,"auth-title","f-w-600"],[1,"f-s-20","f-w-600","m-b-30"],["mat-flat-button","","color","primary",3,"routerLink"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"img",3),t.TgZ(4,"h2",4),t._uU(5,"Maintenance Mode!!!"),t.qZA(),t.TgZ(6,"h6",5),t._uU(7,"Website is Under Construction. Check back later!"),t.qZA(),t.TgZ(8,"a",6),t._uU(9,"Go back to Home"),t.qZA()()()()),2&r&&(t.xp6(8),t.Q6J("routerLink",t.DdM(1,j)))},dependencies:[s.Bz,s.rH,p.q,c.zs],encapsulation:2})}return e})();var g=m(982),l=m(4170);const x=()=>["/dashboards/dashboard1"];function B(e,a){1&e&&(t.TgZ(0,"a",4),t._UZ(1,"img",20),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,x))}function M(e,a){1&e&&(t.TgZ(0,"a",4),t._UZ(1,"img",20),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,x))}function O(e,a){1&e&&(t.TgZ(0,"div",23),t._uU(1,"Email is required."),t.qZA())}function z(e,a){if(1&e&&(t.TgZ(0,"mat-hint",21),t.YNc(1,O,2,0,"div",22),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.um2(1,i.f.email.errors&&i.f.email.errors.required?1:-1)}}const R=()=>["/authentication/side-login"];let k=(()=>{class e{constructor(i,r){this.settings=i,this.router=r,this.options=this.settings.getOptions(),this.form=new o.cw({email:new o.NI("",[o.kI.required])})}get f(){return this.form.controls}submit(){this.router.navigate(["/dashboards/dashboard1"])}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(g.p),t.Y36(s.F0))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-side-forgot-password"]],standalone:!0,features:[t.jDz],decls:26,vars:7,consts:[[1,"blank-layout-container","justify-content-center"],[1,"position-relative","row","w-100","h-100"],[1,"col-lg-7","col-xl-8","bg-gredient","p-0"],[1,"p-24","h-100"],[3,"routerLink"],[1,"align-items-center","justify-content-center","img-height","d-none","d-lg-flex"],["src","/assets/images/backgrounds/login-bg.svg","alt","login",2,"max-width","500px"],[1,"col-lg-5","col-xl-4","p-0","d-flex","justify-content-center"],[1,"p-32","d-flex","align-items-start","align-items-lg-center","justify-content-center","h-100"],[1,"row","justify-content-center","w-100"],[1,"col-lg-9"],[1,"f-w-700","f-s-24","m-0"],[1,"f-s-14","d-block","mat-body-1","m-t-8"],[1,"m-t-30",3,"formGroup","ngSubmit"],[1,"mat-subtitle-2","f-s-14","f-w-600","m-b-12","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","type","email","formControlName","email"],["class","m-b-16 error-msg"],["mat-flat-button","","color","primary",1,"w-100",3,"disabled"],["mat-stroked-button","","color","primary",1,"w-100","m-t-8",3,"routerLink"],["src","./assets/images/logo.png","alt","logo",1,"align-middle","m-2"],[1,"m-b-16","error-msg"],["class","text-error"],[1,"text-error"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t.YNc(4,B,2,2,"a",4)(5,M,2,2,"a",4),t.TgZ(6,"div",5),t._UZ(7,"img",6),t.qZA()()(),t.TgZ(8,"div",7)(9,"div",8)(10,"div",9)(11,"div",10)(12,"h4",11),t._uU(13,"Forgot your password?"),t.qZA(),t.TgZ(14,"span",12),t._uU(15,"Please enter the email address associated with your account and We will email you a link to reset your password."),t.qZA(),t.TgZ(16,"form",13),t.NdJ("ngSubmit",function(){return n.submit()}),t.TgZ(17,"mat-label",14),t._uU(18,"Email Adddress"),t.qZA(),t.TgZ(19,"mat-form-field",15),t._UZ(20,"input",16),t.YNc(21,z,2,1,"mat-hint",17),t.qZA(),t.TgZ(22,"button",18),t._uU(23," Forgot Password "),t.qZA(),t.TgZ(24,"a",19),t._uU(25," Back to Login "),t.qZA()()()()()()()()),2&r&&(t.xp6(4),t.um2(4,"light"===n.options.theme?4:-1),t.xp6(1),t.um2(5,"dark"===n.options.theme?5:-1),t.xp6(11),t.Q6J("formGroup",n.form),t.xp6(5),t.um2(21,n.f.email.touched&&n.f.email.invalid?21:-1),t.xp6(1),t.Q6J("disabled",!n.form.valid),t.xp6(2),t.Q6J("routerLink",t.DdM(6,R)))},dependencies:[s.Bz,s.rH,p.q,l.KE,l.hX,l.bx,f.Nt,c.zs,c.lW,o.u5,o._Y,o.Fj,o.JJ,o.JL,o.UX,o.sg,o.u],encapsulation:2})}return e})();var _=m(2333),Z=m(7911),v=m(919),V=m(3076);const w=()=>["/dashboards/dashboard1"];function X(e,a){1&e&&(t.TgZ(0,"a",24),t._UZ(1,"img",25),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,w))}function P(e,a){1&e&&(t.TgZ(0,"a",24),t._UZ(1,"img",26),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,w))}function W(e,a){1&e&&(t.TgZ(0,"div",29),t._uU(1," Tr\u01b0\u1eddng n\xe0y kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng. "),t.qZA())}function H(e,a){1&e&&(t.TgZ(0,"div",29),t._uU(1," T\xean \u0111\u0103ng nh\u1eadp ph\u1ea3i c\xf3 \xedt nh\u1ea5t 6 k\xfd t\u1ef1. "),t.qZA())}function G(e,a){if(1&e&&(t.TgZ(0,"mat-hint",27),t.YNc(1,W,2,0,"div",28)(2,H,2,0,"div",28),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.usernameOrEmail.errors&&i.f.usernameOrEmail.errors.required),t.xp6(1),t.Q6J("ngIf",i.f.usernameOrEmail.errors&&i.f.usernameOrEmail.errors.minlength)}}function K(e,a){1&e&&(t.TgZ(0,"div",29),t._uU(1," M\u1eadt kh\u1ea9u kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng. "),t.qZA())}function $(e,a){1&e&&(t.TgZ(0,"div",29),t._uU(1," M\u1eadt kh\u1ea9u ph\u1ea3i c\xf3 \xedt nh\u1ea5t 5 k\xfd t\u1ef1. "),t.qZA())}function tt(e,a){if(1&e&&(t.TgZ(0,"mat-hint",27),t.YNc(1,K,2,0,"div",28)(2,$,2,0,"div",28),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.password.errors&&i.f.password.errors.required),t.xp6(1),t.Q6J("ngIf",i.f.password.errors&&i.f.password.errors.minlength)}}const et=()=>["/authentication/side-register"];let q=(()=>{class e{constructor(i,r,n,u,T,Lt,Yt){this.settings=i,this.authService=r,this.router=n,this.toastService=u,this.ngZone=T,this.cdr=Lt,this.userService=Yt,this.options=this.settings.getOptions(),this.form=new o.cw({usernameOrEmail:new o.NI("",[o.kI.required,o.kI.minLength(6)]),password:new o.NI("",[o.kI.required,o.kI.minLength(5)])})}get f(){return this.form.controls}submit(){this.form.valid&&this.authService.login({email:this.form.value.usernameOrEmail??"",password:this.form.value.password??""}).subscribe(n=>{v._.remove("access_token"),v._.remove("refresh_token"),v._.set("access_token",n.accessToken),v._.set("refresh_token",n.refreshToken),this.userService.getUserInfo().subscribe(u=>{this.userService.setUser(u),this.toastService.showSuccess("Login success"),this.ngZone.run(()=>{this.router.navigate(["/starter"]).then(()=>{this.cdr.detectChanges()})})})})}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(g.p),t.Y36(_.e),t.Y36(s.F0),t.Y36(Z.k),t.Y36(t.R0b),t.Y36(t.sBO),t.Y36(V.K))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-side-login"]],standalone:!0,features:[t._Bn([_.e,Z.k]),t.jDz],decls:35,vars:8,consts:[[1,"blank-layout-container","justify-content-center"],[1,"position-relative","row","w-100","h-100"],[1,"col-lg-7","col-xl-8","bg-gredient","p-0"],[1,"p-24","h-100"],[3,"routerLink",4,"ngIf"],[1,"align-items-center","justify-content-center","img-height","d-none","d-lg-flex"],["src","/assets/images/backgrounds/login-bg.svg","alt","login",2,"max-width","500px"],[1,"col-lg-5","col-xl-4","p-0"],[1,"p-32","d-flex","align-items-start","align-items-lg-center","justify-content-center","h-100"],[1,"row","justify-content-center","w-100"],[1,"col-lg-9","max-width-form"],[1,"f-w-700","f-s-24","m-0"],[1,"f-s-14","d-block","mat-body-1","m-t-8"],[1,"bg-light-primary","text-primary","f-w-500","rounded","p-16","m-t-24","text-center"],[1,"m-t-30",3,"formGroup","ngSubmit"],[1,"mat-subtitle-2","f-s-14","f-w-600","m-b-12","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","formControlName","usernameOrEmail"],["class","m-b-16 error-msg",4,"ngIf"],["appearance","outline","color","primary",1,"w-100","m-b-12"],["matInput","","type","password","formControlName","password"],["mat-flat-button","","color","primary",1,"w-100",3,"disabled"],[1,"d-block","f-w-500","d-block","m-t-24","text-center"],[1,"text-decoration-none","text-primary","f-w-500","f-s-14",3,"routerLink"],[3,"routerLink"],["src","./assets/images/logo.png","alt","logo",1,"align-middle","m-2","authentication-logo"],["src","./assets/images/logo-light.png","alt","logo",1,"align-middle","m-2","authentication-logo"],[1,"m-b-16","error-msg"],["class","text-error",4,"ngIf"],[1,"text-error"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t.YNc(4,X,2,2,"a",4)(5,P,2,2,"a",4),t.TgZ(6,"div",5),t._UZ(7,"img",6),t.qZA()()(),t.TgZ(8,"div",7)(9,"div",8)(10,"div",9)(11,"div",10)(12,"h4",11),t._uU(13,"Ch\xe0o m\u1eebng \u0111\u1ebfn v\u1edbi ESOLD"),t.qZA(),t.TgZ(14,"span",12),t._uU(15,"Trang qu\u1ea3n l\xfd c\u1ee7a b\u1ea1n"),t.qZA(),t.TgZ(16,"div",13),t._uU(17," \u0110\u1ec3 b\u1eaft \u0111\u1ea7u s\u1eed d\u1ee5ng d\u1ecbch v\u1ee5, vui l\xf2ng \u0111\u0103ng nh\u1eadp v\xe0o t\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n. "),t.qZA(),t.TgZ(18,"form",14),t.NdJ("ngSubmit",function(){return n.submit()}),t.TgZ(19,"mat-label",15),t._uU(20,"T\xe0i kho\u1ea3n"),t.qZA(),t.TgZ(21,"mat-form-field",16),t._UZ(22,"input",17),t.YNc(23,G,3,2,"mat-hint",18),t.qZA(),t.TgZ(24,"mat-label",15),t._uU(25,"M\u1eadt kh\u1ea9u"),t.qZA(),t.TgZ(26,"mat-form-field",19),t._UZ(27,"input",20),t.YNc(28,tt,3,2,"mat-hint",18),t.qZA(),t.TgZ(29,"button",21),t._uU(30," \u0110\u0103ng nh\u1eadp "),t.qZA()(),t.TgZ(31,"span",22),t._uU(32,"M\u1edbi \u0111\u1ebfn v\u1edbi ESOLD? "),t.TgZ(33,"a",23),t._uU(34," T\u1ea1o t\xe0i kho\u1ea3n"),t.qZA()()()()()()()()),2&r&&(t.xp6(4),t.Q6J("ngIf","light"===n.options.theme),t.xp6(1),t.Q6J("ngIf","dark"===n.options.theme),t.xp6(13),t.Q6J("formGroup",n.form),t.xp6(5),t.Q6J("ngIf",n.f.usernameOrEmail.touched&&n.f.usernameOrEmail.invalid),t.xp6(5),t.Q6J("ngIf",n.f.password.touched&&n.f.password.invalid),t.xp6(1),t.Q6J("disabled",!n.form.valid),t.xp6(4),t.Q6J("routerLink",t.DdM(7,et)))},dependencies:[s.Bz,s.rH,p.q,l.KE,l.hX,l.bx,f.Nt,c.lW,h.O5,o.u5,o._Y,o.Fj,o.JJ,o.JL,o.UX,o.sg,o.u],styles:[".authentication-logo[_ngcontent-%COMP%]{height:80px}"]})}return e})();var it=m(3680),nt=m(8525);const C=()=>["/dashboards/dashboard1"];function ot(e,a){1&e&&(t.TgZ(0,"a",30),t._UZ(1,"img",31),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,C))}function rt(e,a){1&e&&(t.TgZ(0,"a",30),t._UZ(1,"img",32),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,C))}function at(e,a){1&e&&(t.TgZ(0,"div",35),t._uU(1," Email kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng. "),t.qZA())}function st(e,a){1&e&&(t.TgZ(0,"div",35),t._uU(1," \u0110\xe2y kh\xf4ng ph\u1ea3i l\xe0 \u0111\u1ecba ch\u1ec9 email h\u1ee3p l\u1ec7. "),t.qZA())}function mt(e,a){if(1&e&&(t.TgZ(0,"mat-hint",33),t.YNc(1,at,2,0,"div",34)(2,st,2,0,"div",34),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.email.errors&&i.f.email.errors.required),t.xp6(1),t.Q6J("ngIf",i.f.email.errors&&i.f.email.errors.email)}}function ut(e,a){1&e&&(t.TgZ(0,"div",35),t._uU(1," M\u1eadt kh\u1ea9u kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng. "),t.qZA())}function lt(e,a){1&e&&(t.TgZ(0,"div",35),t._uU(1," M\u1eadt kh\u1ea9u ph\u1ea3i c\xf3 \xedt nh\u1ea5t 6 k\xfd t\u1ef1. "),t.qZA())}function ct(e,a){if(1&e&&(t.TgZ(0,"mat-hint",33),t.YNc(1,ut,2,0,"div",34)(2,lt,2,0,"div",34),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.password.errors&&i.f.password.errors.required),t.xp6(1),t.Q6J("ngIf",i.f.password.errors&&i.f.password.errors.minlength)}}function pt(e,a){1&e&&(t.TgZ(0,"div",35),t._uU(1," T\xean kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng. "),t.qZA())}function dt(e,a){if(1&e&&(t.TgZ(0,"mat-hint",33),t.YNc(1,pt,2,0,"div",34),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.firstName.errors&&i.f.firstName.errors.required)}}function gt(e,a){1&e&&(t.TgZ(0,"div",35),t._uU(1," H\u1ecd kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng. "),t.qZA())}function ft(e,a){if(1&e&&(t.TgZ(0,"mat-hint",33),t.YNc(1,gt,2,0,"div",34),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.lastName.errors&&i.f.lastName.errors.required)}}function ht(e,a){1&e&&(t.TgZ(0,"div",35),t._uU(1," S\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng "),t.qZA())}function _t(e,a){if(1&e&&(t.TgZ(0,"mat-hint",33),t.YNc(1,ht,2,0,"div",34),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.phoneNumber.errors&&i.f.phoneNumber.errors.required)}}function Zt(e,a){1&e&&(t.TgZ(0,"div",35),t._uU(1," Gi\u1edbi t\xednh kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng. "),t.qZA())}function vt(e,a){if(1&e&&(t.TgZ(0,"mat-hint",33),t.YNc(1,Zt,2,0,"div",34),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.sex.errors&&i.f.sex.errors.required)}}const At=()=>["/authentication/side-login"];let U=(()=>{class e{constructor(i,r,n,u){this.settings=i,this.router=r,this.authService=n,this.toastService=u,this.options=this.settings.getOptions(),this.form=new o.cw({email:new o.NI("",[o.kI.required,o.kI.email]),password:new o.NI("",[o.kI.required,o.kI.minLength(6)]),firstName:new o.NI("",[o.kI.required]),lastName:new o.NI("",[o.kI.required]),phoneNumber:new o.NI("",[o.kI.required]),sex:new o.NI("",[o.kI.required])})}get f(){return this.form.controls}submit(){this.form.valid&&this.authService.register({email:this.form.value.email||"",password:this.form.value.password||"",firstName:this.form.value.firstName||"",lastName:this.form.value.lastName||"",phoneNumber:this.form.value.phoneNumber||"",sex:this.form.value.sex||""}).subscribe(r=>{r&&(this.toastService.showSuccess("Register success! Please check your email to verify your account."),this.router.navigate(["/authentication/email-confirm"],{state:{email:this.form.value.email}}))})}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(g.p),t.Y36(s.F0),t.Y36(_.e),t.Y36(Z.k))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-side-register"]],standalone:!0,features:[t.jDz],decls:59,vars:12,consts:[[1,"blank-layout-container","justify-content-center"],[1,"position-relative","row","w-100","h-100"],[1,"col-lg-7","col-xl-8","bg-gredient","p-0"],[1,"p-24","h-100"],[3,"routerLink",4,"ngIf"],[1,"align-items-center","justify-content-center","img-height","d-none","d-lg-flex"],["src","/assets/images/backgrounds/login-bg.svg","alt","login",2,"max-width","500px"],[1,"col-lg-5","col-xl-4","p-0"],[1,"p-32","d-flex","align-items-start","align-items-lg-center","justify-content-center","h-100"],[1,"row","justify-content-center","w-100"],[1,"col-lg-9","max-width-form"],[1,"f-w-700","f-s-24","m-0"],[1,"f-s-14","d-block","mat-body-1","m-t-8"],[1,"m-t-30",3,"formGroup","ngSubmit"],[1,"mat-subtitle-2","f-s-14","f-w-600","m-b-12","d-block"],["appearance","outline","color","primary",1,"w-100"],["matInput","","type","email","formControlName","email"],["class","m-b-16 error-msg",4,"ngIf"],["appearance","outline","color","primary",1,"w-100","m-b-12"],["matInput","","type","password","formControlName","password"],["type","text","matInput","","formControlName","firstName"],["type","text","matInput","","formControlName","lastName"],["type","tel","matInput","","formControlName","phoneNumber"],["formControlName","sex"],["value","male"],["value","female"],["value","other"],["mat-flat-button","","color","primary",1,"w-100",3,"disabled"],[1,"d-block","f-w-500","d-block","m-t-24","text-center"],[1,"text-decoration-none","text-primary","f-w-500","f-s-14",3,"routerLink"],[3,"routerLink"],["src","./assets/images/logo.png","alt","logo",1,"align-middle","m-2","authentication-logo"],["src","./assets/images/logo-light.png","alt","logo",1,"align-middle","m-2","authentication-logo"],[1,"m-b-16","error-msg"],["class","text-error",4,"ngIf"],[1,"text-error"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t.YNc(4,ot,2,2,"a",4)(5,rt,2,2,"a",4),t.TgZ(6,"div",5),t._UZ(7,"img",6),t.qZA()()(),t.TgZ(8,"div",7)(9,"div",8)(10,"div",9)(11,"div",10)(12,"h4",11),t._uU(13,"Ch\xe0o m\u1eebng \u0111\u1ebfn v\u1edbi ESOLD"),t.qZA(),t.TgZ(14,"span",12),t._uU(15,"Trang qu\u1ea3n l\xfd"),t.qZA(),t.TgZ(16,"form",13),t.NdJ("ngSubmit",function(){return n.submit()}),t.TgZ(17,"mat-label",14),t._uU(18,"\u0110\u1ecba ch\u1ec9 email"),t.qZA(),t.TgZ(19,"mat-form-field",15),t._UZ(20,"input",16),t.YNc(21,mt,3,2,"mat-hint",17),t.qZA(),t.TgZ(22,"mat-label",14),t._uU(23,"M\u1eadt kh\u1ea9u"),t.qZA(),t.TgZ(24,"mat-form-field",18),t._UZ(25,"input",19),t.YNc(26,ct,3,2,"mat-hint",17),t.qZA(),t.TgZ(27,"mat-label",14),t._uU(28,"T\xean"),t.qZA(),t.TgZ(29,"mat-form-field",15),t._UZ(30,"input",20),t.YNc(31,dt,2,1,"mat-hint",17),t.qZA(),t.TgZ(32,"mat-label",14),t._uU(33,"H\u1ecd"),t.qZA(),t.TgZ(34,"mat-form-field",15),t._UZ(35,"input",21),t.YNc(36,ft,2,1,"mat-hint",17),t.qZA(),t.TgZ(37,"mat-label",14),t._uU(38,"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i"),t.qZA(),t.TgZ(39,"mat-form-field",15),t._UZ(40,"input",22),t.YNc(41,_t,2,1,"mat-hint",17),t.qZA(),t.TgZ(42,"mat-label",14),t._uU(43,"Gi\u1edbi t\xednh"),t.qZA(),t.TgZ(44,"mat-form-field",15)(45,"mat-select",23)(46,"mat-option",24),t._uU(47,"Nam"),t.qZA(),t.TgZ(48,"mat-option",25),t._uU(49,"N\u1eef"),t.qZA(),t.TgZ(50,"mat-option",26),t._uU(51,"Kh\xe1c"),t.qZA()(),t.YNc(52,vt,2,1,"mat-hint",17),t.qZA(),t.TgZ(53,"button",27),t._uU(54," \u0110\u0103ng k\xfd "),t.qZA()(),t.TgZ(55,"span",28),t._uU(56,"\u0110\xe3 c\xf3 t\xe0i kho\u1ea3n? "),t.TgZ(57,"a",29),t._uU(58," \u0110\u0103ng nh\u1eadp"),t.qZA()()()()()()()()),2&r&&(t.xp6(4),t.Q6J("ngIf","light"===n.options.theme),t.xp6(1),t.Q6J("ngIf","dark"===n.options.theme),t.xp6(11),t.Q6J("formGroup",n.form),t.xp6(5),t.Q6J("ngIf",n.f.email.touched&&n.f.email.invalid),t.xp6(5),t.Q6J("ngIf",n.f.password.touched&&n.f.password.invalid),t.xp6(5),t.Q6J("ngIf",n.f.firstName.touched&&n.f.firstName.invalid),t.xp6(5),t.Q6J("ngIf",n.f.lastName.touched&&n.f.lastName.invalid),t.xp6(5),t.Q6J("ngIf",n.f.phoneNumber.touched&&n.f.phoneNumber.invalid),t.xp6(11),t.Q6J("ngIf",n.f.sex.touched&&n.f.sex.invalid),t.xp6(1),t.Q6J("disabled",!n.form.valid),t.xp6(4),t.Q6J("routerLink",t.DdM(11,At)))},dependencies:[s.Bz,s.rH,p.q,it.ey,l.KE,l.hX,l.bx,f.Nt,nt.gD,c.lW,h.O5,o.u5,o._Y,o.Fj,o.JJ,o.JL,o.UX,o.sg,o.u],styles:[".authentication-logo[_ngcontent-%COMP%]{height:80px}"]})}return e})();const A=()=>["/dashboards/dashboard1"];function Tt(e,a){1&e&&(t.TgZ(0,"a",4),t._UZ(1,"img",22),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,A))}function bt(e,a){1&e&&(t.TgZ(0,"a",4),t._UZ(1,"img",22),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,A))}let S=(()=>{class e{constructor(i){this.settings=i,this.options=this.settings.getOptions()}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(g.p))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-side-two-steps"]],standalone:!0,features:[t.jDz],decls:46,vars:6,consts:[[1,"blank-layout-container","justify-content-center"],[1,"position-relative","row","w-100","h-100"],[1,"col-lg-8","col-xl-9","bg-gredient","p-0"],[1,"p-24","h-100"],[3,"routerLink"],[1,"align-items-center","justify-content-center","img-height","d-none","d-lg-flex"],["src","/assets/images/backgrounds/login-bg.svg","alt","login",2,"max-width","500px"],[1,"col-lg-4","col-xl-3","p-0","d-flex","justify-content-center"],[1,"p-32","d-flex","align-items-start","align-items-lg-center","h-100","max-width-form","justify-content-center"],[1,"f-w-700","f-s-20","m-0"],[1,"f-s-14","d-block","mat-body-1","m-t-24"],[1,"f-w-600","d-block","m-t-16"],[1,"m-t-30","p-t-30"],[1,"mat-subtitle-2","f-s-14","f-w-600","m-b-12","d-block"],[1,"d-flex","align-items-center"],[1,"row","custom-row"],[1,"col-2"],["appearance","outline","color","primary",1,"w-100"],["matInput",""],["mat-flat-button","","color","primary",1,"w-100",3,"routerLink"],[1,"d-block","f-w-500","d-block","f-s-14","m-t-24"],[1,"text-decoration-none","text-primary","f-w-500",3,"routerLink"],["src","./assets/images/logo.png","alt","logo",1,"align-middle","m-2"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t.YNc(4,Tt,2,2,"a",4)(5,bt,2,2,"a",4),t.TgZ(6,"div",5),t._UZ(7,"img",6),t.qZA()()(),t.TgZ(8,"div",7)(9,"div",8)(10,"div")(11,"h4",9),t._uU(12,"Two Step Verification"),t.qZA(),t.TgZ(13,"span",10),t._uU(14,"We sent a verification code to your mobile. Enter the code from the mobile in the field below."),t.qZA(),t.TgZ(15,"span",11),t._uU(16,"******1234"),t.qZA(),t.TgZ(17,"form",12)(18,"mat-label",13),t._uU(19,"Type your 6 digits security code"),t.qZA(),t._UZ(20,"div",14),t.TgZ(21,"div",15)(22,"div",16)(23,"mat-form-field",17),t._UZ(24,"input",18),t.qZA()(),t.TgZ(25,"div",16)(26,"mat-form-field",17),t._UZ(27,"input",18),t.qZA()(),t.TgZ(28,"div",16)(29,"mat-form-field",17),t._UZ(30,"input",18),t.qZA()(),t.TgZ(31,"div",16)(32,"mat-form-field",17),t._UZ(33,"input",18),t.qZA()(),t.TgZ(34,"div",16)(35,"mat-form-field",17),t._UZ(36,"input",18),t.qZA()(),t.TgZ(37,"div",16)(38,"mat-form-field",17),t._UZ(39,"input",18),t.qZA()()(),t.TgZ(40,"a",19),t._uU(41," Verify My Account "),t.qZA()(),t.TgZ(42,"span",20),t._uU(43,"Didn't get the code? "),t.TgZ(44,"a",21),t._uU(45,"Resend"),t.qZA()()()()()()()),2&r&&(t.xp6(4),t.um2(4,"light"===n.options.theme?4:-1),t.xp6(1),t.um2(5,"dark"===n.options.theme?5:-1),t.xp6(35),t.Q6J("routerLink",t.DdM(4,A)),t.xp6(4),t.Q6J("routerLink",t.DdM(5,A)))},dependencies:[s.Bz,s.rH,p.q,l.KE,l.hX,f.Nt,c.zs],encapsulation:2})}return e})();const N=()=>["/dashboards/dashboard1"];function Et(e,a){1&e&&(t.TgZ(0,"a",6),t._UZ(1,"img",11),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,N))}function yt(e,a){1&e&&(t.TgZ(0,"a",6),t._UZ(1,"img",11),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,N))}let xt=(()=>{class e{constructor(i,r,n){this.route=i,this.router=r,this.settings=n,this.email="",this.options=this.settings.getOptions(),this.isResendDisabled=!1,this.remainingTime=0}ngOnInit(){this.route.paramMap.subscribe(()=>{const i=window.history.state;this.email=i.email}),this.email||this.router.navigate(["/authentication/side-login"])}resendEmail(){console.log("Resend email"),this.isResendDisabled=!0,this.remainingTime=90;const i=setInterval(()=>{this.remainingTime--,this.remainingTime<=0&&(clearInterval(i),this.isResendDisabled=!1)},1e3)}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(s.gz),t.Y36(s.F0),t.Y36(g.p))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-email-confirm"]],standalone:!0,features:[t.jDz],decls:16,vars:5,consts:[[1,"blank-layout-container","justify-content-center","align-items-center"],[1,"position-relative","row","w-100","h-100","bg-gredient","justify-content-center"],[1,"col-lg-4","d-flex","align-items-center"],[1,"cardWithShadow","boxed-auth"],[1,"p-32"],[1,"text-center"],[3,"routerLink"],[1,"f-s-14","d-block","mat-body-1","text-center","m-t-30"],[1,"f-w-600","d-block","m-t-16","text-center"],[1,"d-block","f-w-500","d-block","f-s-14","m-t-24","text-center"],["mat-flat-button","","color","primary",1,"m-l-12",3,"disabled","click"],["src","./assets/images/logo.png","alt","logo",1,"align-middle","m-2"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-card",3)(4,"mat-card-content",4)(5,"div",5),t.YNc(6,Et,2,2,"a",6)(7,yt,2,2,"a",6),t.qZA(),t.TgZ(8,"span",7),t._uU(9,"We sent a verification code to your email. Click to a link that we send to your email below."),t.qZA(),t.TgZ(10,"span",8),t._uU(11),t.qZA(),t.TgZ(12,"span",9),t._uU(13,"Didn't get the email? "),t.TgZ(14,"button",10),t.NdJ("click",function(){return n.resendEmail()}),t._uU(15),t.qZA()()()()()()()),2&r&&(t.xp6(6),t.um2(6,"light"===n.options.theme?6:-1),t.xp6(1),t.um2(7,"dark"===n.options.theme?7:-1),t.xp6(4),t.Oqu(n.email),t.xp6(3),t.Q6J("disabled",n.isResendDisabled),t.xp6(1),t.hij(" Resend Email ",n.isResendDisabled?"("+n.remainingTime+"s)":""," "))},dependencies:[s.Bz,s.rH,p.q,d.a8,d.dn,c.lW],encapsulation:2})}return e})();const D=()=>["/dashboards/dashboard1"];function kt(e,a){1&e&&(t.TgZ(0,"a",6),t._UZ(1,"img",10),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,D))}function wt(e,a){1&e&&(t.TgZ(0,"a",6),t._UZ(1,"img",10),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,D))}let qt=(()=>{class e{constructor(i,r,n,u){this.router=i,this.settings=r,this.route=n,this.authService=u,this.token="",this.options=this.settings.getOptions()}ngOnInit(){this.token=this.route.snapshot.queryParams.token,(void 0===this.token||""==this.token)&&this.router.navigate(["/authentication/side-login"])}verifyEmail(){""!=this.token&&this.authService.verifyEmail(this.token).subscribe(i=>{i&&this.router.navigate(["/authentication/side-login"])},i=>{this.router.navigate(["/authentication/side-login"])})}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(s.F0),t.Y36(g.p),t.Y36(s.gz),t.Y36(_.e))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-confirm-verify-email"]],standalone:!0,features:[t.jDz],decls:15,vars:2,consts:[[1,"blank-layout-container","justify-content-center","align-items-center"],[1,"position-relative","row","w-100","h-100","bg-gredient","justify-content-center"],[1,"col-lg-4","d-flex","align-items-center"],[1,"cardWithShadow","boxed-auth"],[1,"p-32"],[1,"text-center"],[3,"routerLink"],[1,"f-s-14","d-block","mat-body-1","text-center","m-t-30"],[1,"d-block","f-w-500","d-block","f-s-14","m-t-24","text-center"],["mat-flat-button","","color","primary",1,"m-l-12",3,"click"],["src","./assets/images/logo.png","alt","logo",1,"align-middle","m-2"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-card",3)(4,"mat-card-content",4)(5,"div",5),t.YNc(6,kt,2,2,"a",6)(7,wt,2,2,"a",6),t.qZA(),t.TgZ(8,"h3",5),t._uU(9,"Confirm Verify Your Email"),t.qZA(),t.TgZ(10,"span",7),t._uU(11," Are you sure you want to verify this is your account? If not, you can skip and turn off this page. "),t.qZA(),t.TgZ(12,"span",8)(13,"button",9),t.NdJ("click",function(){return n.verifyEmail()}),t._uU(14," Confirm "),t.qZA()()()()()()()),2&r&&(t.xp6(6),t.um2(6,"light"===n.options.theme?6:-1),t.xp6(1),t.um2(7,"dark"===n.options.theme?7:-1))},dependencies:[s.Bz,s.rH,p.q,d.a8,d.dn,c.lW],encapsulation:2})}return e})();const I=()=>["/dashboards/dashboard1"];function Ct(e,a){1&e&&(t.TgZ(0,"a",6),t._UZ(1,"img",16),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,I))}function Ut(e,a){1&e&&(t.TgZ(0,"a",6),t._UZ(1,"img",16),t.qZA()),2&e&&t.Q6J("routerLink",t.DdM(1,I))}function St(e,a){1&e&&(t.TgZ(0,"div",19),t._uU(1," This is required. "),t.qZA())}function Nt(e,a){1&e&&(t.TgZ(0,"div",19),t._uU(1," This should be 6 character. "),t.qZA())}function Dt(e,a){if(1&e&&(t.TgZ(0,"mat-hint",17),t.YNc(1,St,2,0,"div",18)(2,Nt,2,0,"div",18),t.qZA()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("ngIf",i.f.email.errors&&i.f.email.errors.required),t.xp6(1),t.Q6J("ngIf",i.f.email.errors&&i.f.email.errors.minlength)}}const It=[{path:"",children:[{path:"error",component:E},{path:"maintenance",component:y},{path:"side-forgot-pwd",component:k},{path:"side-login",component:q},{path:"side-register",component:U},{path:"side-two-steps",component:S},{path:"email-confirm",component:xt},{path:"verify-email",component:(()=>{class e{constructor(i,r,n,u,T){this.router=i,this.settings=r,this.route=n,this.authService=u,this.toastService=T,this.options=this.settings.getOptions(),this.form=new o.cw({email:new o.NI("",[o.kI.required,o.kI.email])})}get f(){return this.form.controls}ngOnInit(){}verifyEmail(){this.form.valid&&this.form.value.email&&this.authService.resendVerifyEmail(this.form.value.email).subscribe(i=>{i&&(this.router.navigate(["/authentication/email-confirm"],{state:{email:this.form.value.email}}),this.toastService.showSuccess("Email sent successfully"))})}submit(){this.verifyEmail()}onBack(){this.router.navigate(["/authentication/side-login"])}static#t=this.\u0275fac=function(r){return new(r||e)(t.Y36(s.F0),t.Y36(g.p),t.Y36(s.gz),t.Y36(_.e),t.Y36(Z.k))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-verify-email"]],standalone:!0,features:[t.jDz],decls:23,vars:4,consts:[[1,"blank-layout-container","justify-content-center","align-items-center"],[1,"position-relative","row","w-100","h-100","bg-gredient","justify-content-center"],[1,"col-lg-4","d-flex","align-items-center"],[1,"cardWithShadow","boxed-auth"],[1,"p-32"],[1,"text-center"],[3,"routerLink"],[1,"f-s-14","d-block","mat-body-1","text-center"],[1,"m-t-30",3,"formGroup","ngSubmit"],[1,"mat-subtitle-2","f-s-14","f-w-600","m-b-12","d-block"],["appearance","outline","color","primary",1,"w-100"],["type","email","matInput","","formControlName","email"],["class","m-b-16 error-msg",4,"ngIf"],[1,"d-flex","align-items-center","justify-content-between","f-w-500","f-s-14","m-t-24"],["mat-flat-button","","color","warn",1,"m-r-12","btn-link",3,"click"],["mat-flat-button","","color","primary",1,"m-l-12",3,"click"],["src","./assets/images/logo.png","alt","logo",1,"align-middle","m-2"],[1,"m-b-16","error-msg"],["class","text-error",4,"ngIf"],[1,"text-error"]],template:function(r,n){1&r&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"mat-card",3)(4,"mat-card-content",4)(5,"div",5),t.YNc(6,Ct,2,2,"a",6)(7,Ut,2,2,"a",6),t.qZA(),t.TgZ(8,"h3",5),t._uU(9,"Confirm Verify Your Email"),t.qZA(),t.TgZ(10,"span",7),t._uU(11," Enter your email to receive the confirmation email. "),t.qZA(),t.TgZ(12,"form",8),t.NdJ("ngSubmit",function(){return n.submit()}),t.TgZ(13,"mat-label",9),t._uU(14,"Email"),t.qZA(),t.TgZ(15,"mat-form-field",10),t._UZ(16,"input",11),t.YNc(17,Dt,3,2,"mat-hint",12),t.qZA(),t.TgZ(18,"div",13)(19,"button",14),t.NdJ("click",function(){return n.onBack()}),t._uU(20," Back "),t.qZA(),t.TgZ(21,"button",15),t.NdJ("click",function(){return n.verifyEmail()}),t._uU(22," Verify Email "),t.qZA()()()()()()()()),2&r&&(t.xp6(6),t.um2(6,"light"===n.options.theme?6:-1),t.xp6(1),t.um2(7,"dark"===n.options.theme?7:-1),t.xp6(5),t.Q6J("formGroup",n.form),t.xp6(5),t.Q6J("ngIf",n.f.email.touched&&n.f.email.invalid))},dependencies:[s.Bz,s.rH,p.q,l.KE,l.hX,l.bx,f.Nt,d.a8,d.dn,c.lW,o.u5,o._Y,o.Fj,o.JJ,o.JL,o.UX,o.sg,o.u,h.ez,h.O5],encapsulation:2})}return e})()},{path:"verify-email/confirm",component:qt}]}];let Jt=(()=>{class e{static#t=this.\u0275fac=function(r){return new(r||e)};static#e=this.\u0275mod=t.oAB({type:e});static#i=this.\u0275inj=t.cJS({imports:[h.ez,s.Bz.forChild(It),J.Ps,d.QW,f.c,L.p9,c.ot,o.u5,o.UX,Y.et.pick(F),E,y,k,q,U,S]})}return e})()}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{tADN:function(e,t,o){"use strict";o.r(t),o.d(t,"LeaderboardModule",function(){return G});var c=o("ofXK"),i=o("tyNb"),n=o("3Pt+"),s=o("1G5W"),r=o("IzEk"),a=o("XNiG"),h=o("fXoL"),l=o("7JkF");let d=(()=>{class e{constructor(e,t){this.socket=e,this.router=t}postHighScore(e){console.log("highscore posted = ",e),this.socket.emit("postHighscore",e)}listenForNewHighscore(){return this.socket.fromEvent("newHighscore")}requestGameHighscores(e){console.log("requestGameHighScore called"),this.socket.emit("requestGameHighscores",e)}listenForGameHighscores(){return this.socket.fromEvent("gameHighscores")}sendSelectedHighscore(e){console.log("requestGameHighScore called"),console.log("DTO: ",e.id,e.nickname,e.gameId,e.score,e.date,e.time),this.socket.emit("highscoreDtoFromLeaderboard",e),console.log("Navigate to Comment url"),this.router.navigate(["/comment"],{state:{data:e}})}listenForErrors(){return this.socket.fromEvent("error")}disconnect(){this.socket.disconnect()}connect(){this.socket.connect()}}return e.\u0275fac=function(t){return new(t||e)(h.Xb(l.a),h.Xb(i.a))},e.\u0275prov=h.Kb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var g=o("DTUA"),b=o("XiUz"),m=o("Wp6s"),f=o("FKr1"),p=o("f0Cb"),u=o("NFeN"),x=o("MutI"),v=o("kmnG"),S=o("qFsG"),T=o("bTqV");function k(e,t){if(1&e&&(h.Tb(0,"span",24),h.pc(1),h.Sb()),2&e){const e=h.dc();h.Eb(1),h.sc("1st: ",e.highscores[0].nickname," ",e.highscores[0].score,"")}}function C(e,t){if(1&e&&(h.Tb(0,"div",25),h.pc(1),h.Sb()),2&e){const e=h.dc();h.Eb(1),h.sc("2nd: ",e.highscores[1].nickname," ",e.highscores[1].score,"")}}function y(e,t){if(1&e&&(h.Tb(0,"div",26),h.pc(1),h.Sb()),2&e){const e=h.dc();h.Eb(1),h.sc("3rd: ",e.highscores[2].nickname," ",e.highscores[2].score,"")}}function I(e,t){if(1&e&&(h.Tb(0,"div",27),h.pc(1),h.Sb()),2&e){const e=h.dc();h.Eb(1),h.sc("4th: ",e.highscores[3].nickname," ",e.highscores[3].score,"")}}function H(e,t){if(1&e&&(h.Tb(0,"div",28),h.pc(1),h.Sb()),2&e){const e=h.dc();h.Eb(1),h.sc("5th: ",e.highscores[4].nickname," ",e.highscores[4].score,"")}}function F(e,t){if(1&e){const e=h.Ub();h.Tb(0,"mat-list-option",29),h.bc("click",function(){h.lc(e);const t=h.dc(),o=h.kc(37);return t.onNgModelChange(o)}),h.Tb(1,"mat-icon",9),h.pc(2,"grade"),h.Sb(),h.Tb(3,"div",30),h.pc(4),h.Sb(),h.Tb(5,"div",31),h.pc(6),h.Sb(),h.Pb(7,"mat-divider"),h.Pb(8,"mat-divider"),h.Sb()}if(2&e){const e=t.$implicit;h.ic("value",e.id),h.Eb(4),h.sc("Score: ",e.score," Time:",e.time,""),h.Eb(2),h.sc("By ",e.nickname," on ",e.date,"")}}function M(e,t){if(1&e){const e=h.Ub();h.Tb(0,"div"),h.Tb(1,"mat-form-field",32),h.Tb(2,"mat-label"),h.pc(3,"Post a mock Highscore (number)"),h.Sb(),h.Pb(4,"input",33),h.Tb(5,"button",34),h.bc("click",function(){return h.lc(e),h.dc().postHighscore()}),h.Tb(6,"mat-icon"),h.pc(7,"send"),h.Sb(),h.Sb(),h.Sb(),h.Sb()}if(2&e){const e=h.dc();h.Eb(4),h.ic("formControl",e.highscoreFC)}}function E(e,t){1&e&&(h.Tb(0,"div",35),h.pc(1," You need to log in to post a mock highscore "),h.Sb())}function P(e,t){if(1&e&&(h.Tb(0,"div",35),h.pc(1),h.Sb()),2&e){const e=t.ngIf;h.Eb(1),h.rc(" ",e," ")}}const w=[{path:"",component:(()=>{class e{constructor(e,t){this.leaderboardService=e,this.storageService=t,this.highscoreFC=new n.b(""),this.highscores=[],this.unsubscribe$=new a.a,this.gameId=1,this.isLoggedIn=localStorage.length,this.highscoreSelected="",this.selectedGame="Super Ninja Dude"}ngOnInit(){var e;console.log("Leaderboard Component Initialised"),this.userNickname=null===(e=this.storageService.loadClient())||void 0===e?void 0:e.nickname,this.leaderboardService.requestGameHighscores(this.gameId),this.error$=this.leaderboardService.listenForErrors(),this.leaderboardService.listenForNewHighscore().pipe(Object(s.a)(this.unsubscribe$)).subscribe(e=>{console.log("highscore received"),this.highscores.push(e),this.highscores.sort((e,t)=>e.score<t.score?1:-1)}),this.leaderboardService.listenForGameHighscores().pipe(Object(r.a)(1)).subscribe(e=>{console.log(e.length," highscores received"),this.highscores=e.sort((e,t)=>e.score<t.score?1:-1)}),this.leaderboardService.connect()}postHighscore(){var e,t,o;if(console.log("dto nickname: ",null===(e=this.storageService.loadClient())||void 0===e?void 0:e.nickname),(null===(t=this.storageService.loadClient())||void 0===t?void 0:t.nickname)&&this.highscoreFC.value){const e={nickname:null===(o=this.storageService.loadClient())||void 0===o?void 0:o.nickname,gameId:this.selectedGame,score:this.highscoreFC.value,time:123};this.leaderboardService.postHighScore(e),this.highscoreFC.patchValue("")}}ngOnDestroy(){console.log("Leaderboard Component Destroyed"),this.unsubscribe$.next(),this.unsubscribe$.complete(),this.leaderboardService.disconnect()}onNgModelChange(e){if(0!==this.highscoreSelected.length){const e=this.highscoreSelected[0].toString();this.chosenHighscore=this.highscores.find(t=>t.id===e),this.chosenHighscore?(console.log("onNgModelChange = ",this.chosenHighscore.id,this.chosenHighscore.score,this.chosenHighscore.nickname),this.leaderboardService.sendSelectedHighscore({id:this.chosenHighscore.id,nickname:this.chosenHighscore.nickname,gameId:this.chosenHighscore.gameId,score:this.chosenHighscore.score,date:this.chosenHighscore.date,time:this.chosenHighscore.time})):console.log("error - no highscore with that name found")}}}return e.\u0275fac=function(t){return new(t||e)(h.Ob(d),h.Ob(g.a))},e.\u0275cmp=h.Ib({type:e,selectors:[["app-leaderboard"]],decls:45,vars:16,consts:[["fxLayout","row","fxFlex",""],["fxLayout","column","fxFlex","30",1,"mat-card-margin"],["fxFlex",""],["mat-line","",1,"typewriter-text-sm-1"],["mat-line","",1,"gameId-text"],["mat-line","",1,"count-text-1"],[1,"hall-of-fame-text"],["fxLayoutAlign","center"],[1,"trophy-icon"],["mat-list-icon",""],["class","first-text",4,"ngIf"],["class","second-text",4,"ngIf"],["class","third-text",4,"ngIf"],["class","forth-text",4,"ngIf"],["class","fifth-text",4,"ngIf"],["fxLayout","column","fxFlex","70",1,"mat-card-margin"],["fxFlex","","fxLayout","column",2,"padding","20px"],["fxFlex","","fxLayout","column"],["fxFlex","",1,"scrollable-mat-list",3,"ngModel","multiple","ngModelChange"],["hiscores",""],[3,"value","click",4,"ngFor","ngForOf"],[4,"ngIf"],["class","warn-text-colour","style","font-family: cursive","style","font-size: 14px",4,"ngIf"],["fxFlex","30px",2,"padding-left","30px"],[1,"first-text"],[1,"second-text"],[1,"third-text"],[1,"forth-text"],[1,"fifth-text"],[3,"value","click"],["mat-line","",1,"comment-text"],["mat-line","",1,"comment-sender-text",2,"font-size","x-small"],["fxFlex","40",1,"primary-text-colour"],["matInput","","type","text",3,"formControl"],["mat-button","","matSuffix","","mat-icon-button","","aria-label","Clear",3,"click"],[1,"warn-text-colour",2,"font-size","14px"]],template:function(e,t){1&e&&(h.Tb(0,"div",0),h.Tb(1,"div",1),h.Tb(2,"mat-card",2),h.Tb(3,"mat-card-header"),h.Tb(4,"span",3),h.pc(5,"Game: "),h.Sb(),h.Pb(6,"h1"),h.Tb(7,"div",4),h.pc(8),h.Sb(),h.Pb(9,"h1"),h.Sb(),h.Tb(10,"mat-card-content"),h.Tb(11,"div",5),h.pc(12),h.Sb(),h.Pb(13,"mat-divider"),h.Pb(14,"h1"),h.Tb(15,"h1",6),h.pc(16,"Hall of Fame"),h.Sb(),h.Pb(17,"h1"),h.Tb(18,"div",7),h.Tb(19,"span",8),h.Tb(20,"mat-icon",9),h.pc(21,"emoji_events"),h.Sb(),h.oc(22,k,2,2,"span",10),h.Tb(23,"mat-icon",9),h.pc(24,"emoji_events"),h.Sb(),h.Sb(),h.Sb(),h.Pb(25,"h1"),h.oc(26,C,2,2,"div",11),h.oc(27,y,2,2,"div",12),h.oc(28,I,2,2,"div",13),h.oc(29,H,2,2,"div",14),h.Sb(),h.Sb(),h.Sb(),h.Tb(30,"div",15),h.Tb(31,"mat-card",16),h.Tb(32,"mat-card-header"),h.Tb(33,"h2"),h.pc(34),h.Sb(),h.Sb(),h.Tb(35,"mat-card-content",17),h.Tb(36,"mat-selection-list",18,19),h.bc("ngModelChange",function(e){return t.highscoreSelected=e})("ngModelChange",function(e){return t.onNgModelChange(e)}),h.oc(38,F,9,5,"mat-list-option",20),h.Sb(),h.Sb(),h.Tb(39,"mat-card-actions"),h.oc(40,M,8,1,"div",21),h.oc(41,E,2,0,"div",22),h.Sb(),h.Tb(42,"mat-card-footer",23),h.oc(43,P,2,1,"div",22),h.ec(44,"async"),h.Sb(),h.Sb(),h.Sb(),h.Sb()),2&e&&(h.Eb(8),h.qc(t.selectedGame),h.Eb(4),h.rc(" ",t.highscores.length," Highscores posted"),h.Eb(10),h.ic("ngIf",t.highscores.length>0),h.Eb(4),h.ic("ngIf",t.highscores.length>1),h.Eb(1),h.ic("ngIf",t.highscores.length>2),h.Eb(1),h.ic("ngIf",t.highscores.length>3),h.Eb(1),h.ic("ngIf",t.highscores.length>4),h.Eb(5),h.rc("HighScores for ",t.selectedGame,""),h.Eb(2),h.ic("ngModel",t.highscoreSelected)("multiple",!1),h.Eb(2),h.ic("ngForOf",t.highscores),h.Eb(2),h.ic("ngIf",t.isLoggedIn),h.Eb(1),h.ic("ngIf",!t.isLoggedIn),h.Eb(2),h.ic("ngIf",h.fc(44,14,t.error$)))},directives:[b.c,b.a,m.a,m.e,f.c,m.c,p.a,b.b,u.a,x.b,c.k,x.f,n.h,n.j,c.j,m.b,m.d,x.e,v.b,v.e,S.a,n.a,n.c,T.a,v.f],pipes:[c.b],styles:['.scrollable-mat-list[_ngcontent-%COMP%]{overflow:auto}.gameId-text[_ngcontent-%COMP%]{color:#2f4f4f;font-size:28px;font-family:fantasy;padding-bottom:30px}.typewriter-text-sm-1[_ngcontent-%COMP%]{text-align:right;color:#2e8b57;font-size:18px;font-family:American Typewriter}.count-text-1[_ngcontent-%COMP%]{text-align:center;color:#b22222;font-size:18px;font-family:"cursive";padding-bottom:15px}.hall-of-fame-text[_ngcontent-%COMP%]{text-align:center;color:#8b008b;font-size:36px;font-family:American Typewriter;padding:25px}.trophy-icon[_ngcontent-%COMP%]{text-align:center;color:#ff8c00}.first-text[_ngcontent-%COMP%]{color:brown;font-size:40px;padding-bottom:25px}.first-text[_ngcontent-%COMP%], .second-text[_ngcontent-%COMP%]{text-align:center;font-family:"cursive"}.second-text[_ngcontent-%COMP%]{color:#b22222;font-size:30px;padding-bottom:20px}.third-text[_ngcontent-%COMP%]{color:#dc143c;font-size:27px;padding-bottom:18px}.forth-text[_ngcontent-%COMP%], .third-text[_ngcontent-%COMP%]{text-align:center;font-family:"cursive"}.forth-text[_ngcontent-%COMP%]{color:#ff4500;font-size:24px;padding-bottom:16px}.fifth-text[_ngcontent-%COMP%]{text-align:center;color:coral;font-size:21px;font-family:"cursive";padding-bottom:14px}.mat-card-margin[_ngcontent-%COMP%]{margin:10px}']}),e})()}];let O=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=h.Mb({type:e}),e.\u0275inj=h.Lb({imports:[[i.c.forChild(w)],i.c]}),e})();var _=o("PCNd");let G=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=h.Mb({type:e}),e.\u0275inj=h.Lb({imports:[[c.c,O,n.k,_.a]]}),e})()}}]);
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["comment-comment-module"],{

/***/ "D2Ud":
/*!***************************************************!*\
  !*** ./src/app/comment/shared/comment.service.ts ***!
  \***************************************************/
/*! exports provided: CommentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentService", function() { return CommentService; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-socket-io */ "7JkF");



class CommentService {
    constructor(socket) {
        this.socket = socket;
    }
    postComment(commentDto) {
        this.socket.emit('postComment', commentDto);
    }
    listenForNewComment() {
        return this.socket
            .fromEvent('newComment');
    }
    requestHighscoreComments(highscoreId) {
        console.log('requestHighscoreComments called');
        this.socket.emit('requestHighscoreComments', highscoreId);
    }
    listenForHighscoreComments() {
        return this.socket
            .fromEvent('highscoreComments');
    }
    listenForClients() {
        return this.socket
            .fromEvent('clients');
    }
    listenForCommentWelcome() {
        return this.socket
            .fromEvent('welcome');
    }
    listenForErrors() {
        return this.socket
            .fromEvent('error');
    }
    listenForConnect() {
        return this.socket
            .fromEvent('connect')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(() => {
            return this.socket.ioSocket.id;
        }));
    }
    listenForDisconnect() {
        return this.socket
            .fromEvent('disconnect')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(() => {
            return this.socket.ioSocket.id;
        }));
    }
    sendLogin(dto) {
        console.log(dto.nickname);
        this.socket.emit('login', dto);
    }
    disconnect() {
        this.socket.disconnect();
    }
    connect() {
        this.socket.connect();
    }
}
CommentService.??fac = function CommentService_Factory(t) { return new (t || CommentService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["????inject"](ngx_socket_io__WEBPACK_IMPORTED_MODULE_2__["Socket"])); };
CommentService.??prov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["????defineInjectable"]({ token: CommentService, factory: CommentService.??fac, providedIn: 'root' });


/***/ }),

/***/ "ErIi":
/*!*******************************************!*\
  !*** ./src/app/comment/comment.module.ts ***!
  \*******************************************/
/*! exports provided: CommentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentModule", function() { return CommentModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _comment_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment-routing.module */ "yO5z");
/* harmony import */ var _comment_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comment.component */ "Uf94");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "PCNd");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");






class CommentModule {
}
CommentModule.??fac = function CommentModule_Factory(t) { return new (t || CommentModule)(); };
CommentModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_5__["????defineNgModule"]({ type: CommentModule });
CommentModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_5__["????defineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _comment_routing_module__WEBPACK_IMPORTED_MODULE_1__["CommentRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["????setNgModuleScope"](CommentModule, { declarations: [_comment_component__WEBPACK_IMPORTED_MODULE_2__["CommentComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _comment_routing_module__WEBPACK_IMPORTED_MODULE_1__["CommentRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]] }); })();


/***/ }),

/***/ "Uf94":
/*!**********************************************!*\
  !*** ./src/app/comment/comment.component.ts ***!
  \**********************************************/
/*! exports provided: CommentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentComponent", function() { return CommentComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_comment_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/comment.service */ "D2Ud");
/* harmony import */ var _shared_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/storage.service */ "DTUA");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "Wp6s");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button */ "bTqV");

















function CommentComponent_div_7_li_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
} if (rf & 2) {
    const client_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????textInterpolate1"](" ", client_r8.nickname, " ");
} }
function CommentComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](1, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????template"](2, CommentComponent_div_7_li_2_Template, 2, 1, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
} if (rf & 2) {
    const clients_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????property"]("ngForOf", clients_r6);
} }
function CommentComponent_mat_list_item_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](1, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](2, "face");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????element"](7, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
} if (rf & 2) {
    const comment_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????textInterpolate2"]("", comment_r9 == null ? null : comment_r9.text, " --- ", comment_r9 == null ? null : comment_r9.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????textInterpolate2"]("", comment_r9 == null ? null : comment_r9.sender, " - ", comment_r9 == null ? null : comment_r9.posted, "");
} }
function CommentComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["????getCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](1, "mat-form-field", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](3, "Write Comment");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????element"](4, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](5, "button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????listener"]("click", function CommentComponent_div_18_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["????restoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["????nextContext"](); return ctx_r10.postComment(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](7, "send");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["????nextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????property"]("formControl", ctx_r2.commentFC);
} }
function CommentComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](1, " You need to log in to post a comment ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
} }
function CommentComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
} if (rf & 2) {
    const error_r12 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????textInterpolate1"](" ", error_r12, " ");
} }
function CommentComponent_div_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](1, " connecting... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
} }
class CommentComponent {
    constructor(commentService, storageService) {
        this.commentService = commentService;
        this.storageService = storageService;
        this.commentFC = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('');
        this.comments = [];
        this.unsubscribe$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.loginFC = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('');
        this.highscoreId = 'mock'; // MOCK
        this.isLoggedIn = localStorage.length;
    }
    ngOnInit() {
        var _a, _b, _c;
        console.log('Comment Component Initialised');
        console.log('Logged in as: ', (_a = this.storageService.loadClient()) === null || _a === void 0 ? void 0 : _a.nickname); //
        this.commentService.connect(); // MUY IMPORTANTE!!
        this.userNickname = (_b = this.storageService.loadClient()) === null || _b === void 0 ? void 0 : _b.nickname;
        console.log('comment userNickname: ', (_c = this.storageService.loadClient()) === null || _c === void 0 ? void 0 : _c.nickname);
        this.commentService.requestHighscoreComments(this.highscoreId); // MOCK gameId
        this.error$ = this.commentService.listenForErrors(); // move to app.component for global errors
        this.clients$ = this.commentService.listenForClients(); //
        this.commentService.listenForNewComment()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.unsubscribe$))
            .subscribe(comment => {
            console.log('comment received');
            this.comments.push(comment);
        });
        this.commentService.listenForHighscoreComments() // MOCK gameId
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1))
            .subscribe(comments => {
            console.log(comments.length, ' comments received');
            this.comments = comments;
        });
        this.commentService.listenForConnect()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.unsubscribe$))
            .subscribe((id) => {
            // console.log('connect id', id);
            this.socketId = id;
        });
        this.commentService.listenForDisconnect()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.unsubscribe$))
            .subscribe((id) => {
            // console.log('disconnect id', id);
            this.socketId = id;
        });
    }
    ngOnDestroy() {
        console.log('CommentModel Component Destroyed');
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        this.commentService.disconnect(); // Removed to stay connected between routes
    }
    postComment() {
        var _a, _b, _c;
        console.log('dto nickname: ', (_a = this.storageService.loadClient()) === null || _a === void 0 ? void 0 : _a.nickname);
        // loggedInUser = this.storageService.loadCommentClient();
        if ((_b = this.storageService.loadClient()) === null || _b === void 0 ? void 0 : _b.nickname) {
            if (this.commentFC.value) {
                const commentDto = {
                    highscoreId: '1',
                    text: this.commentFC.value,
                    sender: (_c = this.storageService.loadClient()) === null || _c === void 0 ? void 0 : _c.nickname,
                };
                this.commentService.postComment(commentDto);
                this.commentFC.patchValue('');
            }
        }
    }
}
CommentComponent.??fac = function CommentComponent_Factory(t) { return new (t || CommentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["????directiveInject"](_shared_comment_service__WEBPACK_IMPORTED_MODULE_4__["CommentService"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["????directiveInject"](_shared_storage_service__WEBPACK_IMPORTED_MODULE_5__["StorageService"])); };
CommentComponent.??cmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["????defineComponent"]({ type: CommentComponent, selectors: [["app-comment"]], decls: 24, vars: 11, consts: [["fxLayout", "row", "fxFlex", ""], ["fxLayout", "column", "fxFlex", "30"], ["fxFlex", ""], [4, "ngIf"], ["fxLayout", "column", "fxFlex", "70"], ["fxFlex", "", "fxLayout", "column"], ["fxFlex", "", 1, "scrollable-mat-list"], [4, "ngFor", "ngForOf"], ["class", "warn-text-colour", "style", "font-family: cursive", "style", "font-size: 14px", 4, "ngIf"], ["fxFlex", "30px", 2, "padding-left", "30px"], ["mat-list-icon", ""], ["mat-line", "", 1, "comment-text"], ["mat-line", "", 1, "comment-sender-text", 2, "font-size", "x-small"], ["fxFlex", "40", 1, "primary-text-colour"], ["matInput", "", "type", "text", 3, "formControl"], ["mat-button", "", "matSuffix", "", "mat-icon-button", "", "aria-label", "Clear", 3, "click"], [1, "warn-text-colour", 2, "font-size", "14px"]], template: function CommentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](2, "mat-card", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](3, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](4, "h5");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](5, "Clients");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](6, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????template"](7, CommentComponent_div_7_Template, 3, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????pipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](10, "mat-card", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](11, "mat-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](12, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????text"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](14, "mat-card-content", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](15, "mat-list", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????template"](16, CommentComponent_mat_list_item_16_Template, 8, 4, "mat-list-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](17, "mat-card-actions");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????template"](18, CommentComponent_div_18_Template, 8, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????template"](19, CommentComponent_div_19_Template, 2, 0, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementStart"](20, "mat-card-footer", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????template"](21, CommentComponent_div_21_Template, 2, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????pipe"](22, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????template"](23, CommentComponent_div_23_Template, 2, 0, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????elementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????property"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["????pipeBind1"](8, 7, ctx.clients$));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????textInterpolate1"]("Comments for [highscore details] --- (socketId = ", ctx.socketId, ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????property"]("ngForOf", ctx.comments);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????property"]("ngIf", ctx.isLoggedIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????property"]("ngIf", !ctx.isLoggedIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????property"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["????pipeBind1"](22, 9, ctx.error$));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????advance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["????property"]("ngIf", !ctx.socketId);
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__["DefaultFlexDirective"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardHeader"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardContent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardActions"], _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardFooter"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListItem"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__["MatIcon"], _angular_material_list__WEBPACK_IMPORTED_MODULE_9__["MatListIconCssMatStyler"], _angular_material_core__WEBPACK_IMPORTED_MODULE_11__["MatLine"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__["MatDivider"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_14__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_15__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_13__["MatSuffix"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["AsyncPipe"]], styles: [".scrollable-mat-list[_ngcontent-%COMP%] {\n  overflow: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoiY29tbWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zY3JvbGxhYmxlLW1hdC1saXN0IHtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG4iXX0= */"] });


/***/ }),

/***/ "yO5z":
/*!***************************************************!*\
  !*** ./src/app/comment/comment-routing.module.ts ***!
  \***************************************************/
/*! exports provided: CommentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentRoutingModule", function() { return CommentRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _comment_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment.component */ "Uf94");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [{ path: '', component: _comment_component__WEBPACK_IMPORTED_MODULE_1__["CommentComponent"] }];
class CommentRoutingModule {
}
CommentRoutingModule.??fac = function CommentRoutingModule_Factory(t) { return new (t || CommentRoutingModule)(); };
CommentRoutingModule.??mod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["????defineNgModule"]({ type: CommentRoutingModule });
CommentRoutingModule.??inj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["????defineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["????setNgModuleScope"](CommentRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=comment-comment-module.js.map
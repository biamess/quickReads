(this.webpackJsonpquickreads=this.webpackJsonpquickreads||[]).push([[0],{11:function(e,t,a){e.exports=a(18)},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(9),i=a.n(s),o=(a(16),a(10)),l=a(7),c=a(2),d=a(3),u=a(5),p=a(4),m=a(1),h=a(6),v=(a(17),function(e){function t(e){var a;Object(c.a)(this,t),a=Object(u.a)(this,Object(p.a)(t).call(this,e));var n=[{displayName:"React",url:"https://reactjs.org/",timeStamp:new Date(2020,2,3,20,0,8,0),isFavorite:!1,isImportant:!0,isComplete:!1},{displayName:"Css Facts",url:"https://www.sitepoint.com/12-little-known-css-facts/",timeStamp:new Date(2020,0,3,18,0,0,0),isFavorite:!0,isImportant:!1,isComplete:!1},{displayName:"Area under curve",url:"https://www.youtube.com/watch?v=OaCVdzr3MjM",timeStamp:new Date(2020,0,29,20,0,8,0),isFavorite:!1,isImportant:!1,isComplete:!1},{displayName:"ColorPicker",url:"https://htmlcolorcodes.com/color-picker/",timeStamp:Date.now(),isFavorite:!1,isImportant:!1,isComplete:!0}];return a.state={reads:n},a.onAddNewRead=a.onAddNewRead.bind(Object(m.a)(a)),a.onSaveEditRead=a.onSaveEditRead.bind(Object(m.a)(a)),a.onDeleteRead=a.onDeleteRead.bind(Object(m.a)(a)),a.onCompleteRead=a.onCompleteRead.bind(Object(m.a)(a)),a.onFaveButtonPress=a.onFaveButtonPress.bind(Object(m.a)(a)),a.onImportantButtonPress=a.onImportantButtonPress.bind(Object(m.a)(a)),a.updateFlair=a.updateFlair.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"onAddNewRead",value:function(e,t){this.setState((function(a){return{initialized:!0,reads:[{displayName:t,url:e,timeStamp:new Date,isFavorite:!1,isImportant:!1,isComplete:!1}].concat(Object(l.a)(a.reads))}}))}},{key:"onSaveEditRead",value:function(e,t,a){this.setState((function(n){var r=Object(l.a)(n.reads);return r[e].url=t||r[e].url,r[e].displayName=a||r[e].displayName,{reads:r}}))}},{key:"onDeleteRead",value:function(e){this.setState((function(t){return{reads:t.reads.slice(0,e).concat(t.reads.slice(e+1))}}))}},{key:"onCompleteRead",value:function(e){this.setState((function(t){var a=Object(l.a)(t.reads);return a[e].timeStamp=new Date,a[e].isComplete=!0,a.sort((function(e,t){return t.timeStamp-e.timeStamp})),{reads:a}}))}},{key:"onFaveButtonPress",value:function(e){this.updateFlair(e,"isFavorite")}},{key:"onImportantButtonPress",value:function(e){this.updateFlair(e,"isImportant")}},{key:"updateFlair",value:function(e,t){this.setState((function(a){var n=Object(l.a)(a.reads);return n[e][t]=!n[e][t],{reads:n}}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"appContainer"},r.a.createElement("div",{className:"toolbar"},r.a.createElement(P,null),r.a.createElement(C,{animate:0===this.state.reads.length,onSave:this.onAddNewRead})),0===this.state.reads.length?r.a.createElement("div",{class:"message"},r.a.createElement("p",null," Welcome to ",r.a.createElement("span",{class:"logoSmall"},"quickReads"),", a tool to keep track of articles, tutorials, and other webpages that you'd like to visit later!"),r.a.createElement("p",null," ",r.a.createElement("span",{class:"logoSmall"},"Reads")," that you have saved will appear here. "),r.a.createElement("p",null," Add a new ",r.a.createElement("span",{class:"logoSmall"},"read")," above to get started!")):r.a.createElement(f,{onSaveEditRead:this.onSaveEditRead,onDeleteRead:this.onDeleteRead,onCompleteRead:this.onCompleteRead,onFaveButtonPress:this.onFaveButtonPress,onImportantButtonPress:this.onImportantButtonPress,reads:this.state.reads}))}}]),t}(r.a.Component)),f=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={filterActive:!1,filterCompleted:!1,filterFavorites:!1,filterImportant:!1},a.onViewActivePress=a.onViewActivePress.bind(Object(m.a)(a)),a.onViewCompletedPress=a.onViewCompletedPress.bind(Object(m.a)(a)),a.onClearFiltersPress=a.onClearFiltersPress.bind(Object(m.a)(a)),a.onFilterFavoritesPress=a.onFilterFavoritesPress.bind(Object(m.a)(a)),a.onFilterImportantPress=a.onFilterImportantPress.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"onViewActivePress",value:function(){this.setState((function(e){return{filterActive:!e.filterActive}}))}},{key:"onViewCompletedPress",value:function(){this.setState((function(e){return{filterCompleted:!e.filterCompleted}}))}},{key:"onClearFiltersPress",value:function(){this.setState({filterCompleted:!1,filterActive:!1,filterFavorites:!1,filterImportant:!1})}},{key:"onFilterFavoritesPress",value:function(){this.setState((function(e){return{filterFavorites:!e.filterFavorites}}))}},{key:"onFilterImportantPress",value:function(){this.setState((function(e){return{filterImportant:!e.filterImportant}}))}},{key:"importantFilter",value:function(e){return e.isImportant}},{key:"favoriteFilter",value:function(e){return e.isFavorite}},{key:"createReads",value:function(e){var t=this;return e.map((function(e){return r.a.createElement(b,{uniqueKey:"Read"+e.readIndex,read:e,onSaveEditRead:t.props.onSaveEditRead,onDeleteRead:t.props.onDeleteRead,onCompleteRead:t.props.onCompleteRead,onFaveButtonPress:t.props.onFaveButtonPress,onImportantButtonPress:t.props.onImportantButtonPress})}))}},{key:"render",value:function(){var e=this.props.reads.map((function(e,t){return Object(o.a)({},e,{readIndex:t})})),t=this.state.filterActive===this.state.filterCompleted,a=[],n=[],s=[];return!(this.state.filterFavorites||this.state.filterImportant)?a=e:(this.state.filterFavorites&&(a=a.concat(e.filter(this.favoriteFilter))),this.state.filterImportant&&(a=a.concat(e.filter(this.importantFilter)))),(t||this.state.filterActive)&&(n=this.createReads(a.filter((function(e){return!e.isComplete})))),(t||this.state.filterCompleted)&&(s=this.createReads(a.filter((function(e){return e.isComplete})))),r.a.createElement("div",{className:"readListContainer"},r.a.createElement(k,{onViewActivePress:this.onViewActivePress,filterActive:this.state.filterActive,onViewCompletedPress:this.onViewCompletedPress,filterCompleted:this.state.filterCompleted,onClearFiltersPress:this.onClearFiltersPress,onFilterFavoritesPress:this.onFilterFavoritesPress,onFilterImportantPress:this.onFilterImportantPress,filterFavorites:this.state.filterFavorites,filterImportant:this.state.filterImportant}),0===n.length&&0===s.length?r.a.createElement("p",{className:"message"},"Nothing to show here!"):null,n.length>0?r.a.createElement("div",{className:"readList activeReadList"},r.a.createElement("h2",null,"To Read:"),n):null,s.length>0?r.a.createElement("div",{className:"readList completedReadList"},r.a.createElement("h2",null,"Completed Reads:"),s):null)}}]),t}(r.a.Component),b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={editMode:!1},a.handleCancelEdit=a.handleCancelEdit.bind(Object(m.a)(a)),a.handleEdit=a.handleEdit.bind(Object(m.a)(a)),a.handleSaveEdit=a.handleSaveEdit.bind(Object(m.a)(a)),a.handleDelete=a.handleDelete.bind(Object(m.a)(a)),a.handleComplete=a.handleComplete.bind(Object(m.a)(a)),a.handleFaveButtonPress=a.handleFaveButtonPress.bind(Object(m.a)(a)),a.handleImportantButtonPress=a.handleImportantButtonPress.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"handleSaveEdit",value:function(e,t){this.props.onSaveEditRead(this.props.read.readIndex,e,t),this.setState({editMode:!1})}},{key:"handleCancelEdit",value:function(){this.setState({editMode:!1})}},{key:"handleEdit",value:function(){this.setState({editMode:!0})}},{key:"handleDelete",value:function(){this.props.onDeleteRead(this.props.read.readIndex)}},{key:"handleComplete",value:function(){this.props.onCompleteRead(this.props.read.readIndex)}},{key:"handleFaveButtonPress",value:function(){this.props.onFaveButtonPress(this.props.read.readIndex)}},{key:"handleImportantButtonPress",value:function(){this.props.onImportantButtonPress(this.props.read.readIndex)}},{key:"render",value:function(){return r.a.createElement("div",{className:"readItemContainer"},this.state.editMode?r.a.createElement(F,{displayName:this.props.read.displayName,url:this.props.read.url,onSave:this.handleSaveEdit,onCancel:this.handleCancelEdit}):null,r.a.createElement("div",{key:this.props.uniqueKey,className:"readItem"+(this.state.editMode?" editMode":"")},r.a.createElement("a",{href:this.props.read.url,target:"_blank",rel:"noopener noreferrer"},r.a.createElement("div",{className:"readInfo"},r.a.createElement("p",{className:"readName"},this.props.read.displayName||this.props.read.url),r.a.createElement(y,{timeStamp:this.props.read.timeStamp}))),r.a.createElement("div",{className:"readAction"},r.a.createElement("div",{className:"readFlair"},r.a.createElement(N,{buttonClass:"flairButton",iconClass:"favorite",iconName:this.props.read.isFavorite?"star":"star_border",tooltip:this.props.read.isFavorite?"Unfavorite":"Favorite",onButtonPress:this.handleFaveButtonPress}),r.a.createElement(N,{buttonClass:"flairButton",iconClass:"important",iconName:this.props.read.isImportant?"bookmark":"bookmark_border",tooltip:this.props.read.isImportant?"Make not important":"Make Important",onButtonPress:this.handleImportantButtonPress})),r.a.createElement(N,{buttonClass:"readButton",iconClass:"buttonIcon",iconName:"clear",tooltip:"Delete",onButtonPress:this.handleDelete}),r.a.createElement(N,{buttonClass:"readButton",iconClass:"buttonIcon",iconName:"edit",tooltip:"Edit",onButtonPress:this.handleEdit}),this.props.read.isComplete?null:r.a.createElement(N,{buttonClass:"readButton",iconClass:"buttonIcon",iconName:"done",tooltip:"Done",onButtonPress:this.handleComplete}))))}}]),t}(r.a.Component),y=function(e){function t(e){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).call(this,e))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"getDisplayText",value:function(e){var t,a=(Date.now()-this.props.timeStamp)/6e4;if(a<1)t="just now";else if(a<60){var n=Math.floor(a);t=n+(n>1?" minutes":" minute")+" ago"}else if(a<1440){var r=Math.floor(a/60);t=r+(r>1?" hours":" hour")+" ago"}else{var s=Math.floor(a/60/24);t=s+(s>1?" days":" day")+" ago"}return t}},{key:"render",value:function(){return r.a.createElement("div",{className:"timeStamp"},r.a.createElement("p",null,this.getDisplayText(this.props.timeStamp)))}}]),t}(r.a.Component),E=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={url:a.props.url||"",displayName:a.props.displayName||"",errorMessage:""},a.handleSubmit=a.handleSubmit.bind(Object(m.a)(a)),a.handleUrlInput=a.handleUrlInput.bind(Object(m.a)(a)),a.handleDisplayNameInput=a.handleDisplayNameInput.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.requireUrl&&!this.state.url?this.setState({errorMessage:"Url is required"}):(this.props.submitHandler(this.state.url,this.state.displayName),this.setState({url:"",displayName:"",errorMessage:""}))}},{key:"handleUrlInput",value:function(e){this.setState({url:e.target.value,errorMessage:""})}},{key:"handleDisplayNameInput",value:function(e){this.setState({displayName:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{className:this.props.styles},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("p",null,this.props.label),r.a.createElement("input",{type:"url",id:"urlInput",placeholder:"Enter url",value:this.state.url,onChange:this.handleUrlInput}),r.a.createElement("input",{type:"text",placeholder:"Enter display name",value:this.state.displayName,onChange:this.handleDisplayNameInput}),this.props.handleCancel?r.a.createElement("button",{type:"button",className:"appButton",onClick:this.props.handleCancel},"Cancel"):null,r.a.createElement("input",{type:"submit",className:"appButton",value:this.props.submitButtonName}),r.a.createElement("p",{className:"errorMessage"+(this.state.errorMessage?"":" hidden")},"! "+this.state.errorMessage)))}}]),t}(r.a.Component);function C(e){return r.a.createElement(E,{styles:"newRead"+(e.animate?" shake":""),label:"Add a new read",requireUrl:!0,submitButtonName:"Add",submitHandler:e.onSave})}function F(e){return r.a.createElement("div",{className:"lock"},r.a.createElement(E,{styles:"editRead",label:"Edit read",submitButtonName:"Save",displayName:e.displayName,url:e.url,submitHandler:e.onSave,handleCancel:e.onCancel}))}function N(e){return r.a.createElement("button",{type:"button",className:e.buttonClass+" tooltipContainer",onClick:e.onButtonPress},r.a.createElement("div",{className:"tooltip"},e.tooltip),r.a.createElement("i",{className:e.iconClass+" material-icons"},e.iconName))}function k(e){return r.a.createElement("div",null,r.a.createElement("div",{className:"filterGroup"},r.a.createElement(I,{uniqueKey:"viewActive",displayName:"View Active",isActive:e.filterActive,clickHandler:e.onViewActivePress}),r.a.createElement(I,{uniqueKey:"viewCompleted",displayName:"View Completed",isActive:e.filterCompleted,clickHandler:e.onViewCompletedPress})),r.a.createElement("div",{className:"filterGroup"},r.a.createElement(I,{uniqueKey:"filterFavorites",displayName:"Favorites",isActive:e.filterFavorites,clickHandler:e.onFilterFavoritesPress}),r.a.createElement(I,{uniqueKey:"filterImportant",displayName:"Important",isActive:e.filterImportant,clickHandler:e.onFilterImportantPress})),r.a.createElement("div",{className:"filterGroup"},r.a.createElement(I,{uniqueKey:"clearFilters",displayName:"Clear Filters",isActive:!1,clickHandler:e.onClearFiltersPress})))}function I(e){return r.a.createElement("button",{type:"button",key:e.uniqueKey,className:e.isActive?"activeFilterButton":"filterButton",onClick:e.clickHandler},e.displayName)}function P(e){return r.a.createElement("div",{className:"appLogo"},r.a.createElement("h1",null,"quickReads"))}var j=v;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.daba9c46.chunk.js.map
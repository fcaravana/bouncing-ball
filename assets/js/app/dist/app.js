app={animation:null},$(document).click(function(n){null!==app.animation&&(app.animation.stopAnimation(),delete app.animation,app.animation=null),app.animation=new app.ball,app.animation.setInitialPosition(n.pageX,n.pageY),app.animation.startAnimation()}),$(window).resize(function(){null!==app.animation&&app.animation.resizeCanvas()}),app.ball=function(){var n=$("canvas"),t=n[0].getContext("2d"),i=.1,a=.8,o=15,e="#9a0505",l=1,r=1,s=8,p=0,c=0,u=null;return _startAnimation=function(){_resizeCanvas(),_setInitialVelocity(),u=setInterval(_updatePosition,1e3/60)},_stopAnimation=function(){clearInterval(u)},_resizeCanvas=function(){n.attr("width",$(window).innerWidth()),n.attr("height",$(window).innerHeight())},_setInitialVelocity=function(){s=_randomIntFromInterval(1,30),s%2===0&&(s=-s)},_setInitialPosition=function(n,t){l=n,r=t},_updatePosition=function(){return c>60?(_stopAnimation(),!1):(p+=i,l+=s,r+=p,Math.floor(r)===n.height()-o&&c++,r>n.height()-o&&(r=n.height()-o,p*=-a,_reduceVelocity()),o>l&&(l=o,s=-s,_reduceVelocity()),l>n.width()-o&&(l=n.width()-o,_reduceVelocity(),s=-s),void _drawBall())},_drawBall=function(){t.clearRect(0,0,$("canvas").width(),$("canvas").height()),t.fillStyle=e,t.beginPath(),t.arc(l,r,o,0,2*Math.PI,!0),t.closePath(),t.fill()},_reduceVelocity=function(){s>0&&(s=parseInt(s/1.5))},_randomIntFromInterval=function(n,t){return Math.floor(Math.random()*(t-n+1)+n)},{startAnimation:_startAnimation,stopAnimation:_stopAnimation,resizeCanvas:_resizeCanvas,setInitialPosition:_setInitialPosition}};
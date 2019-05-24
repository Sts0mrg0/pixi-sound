/*!
 * pixi-sound - v3.0.1
 * https://github.com/pixijs/pixi-sound
 * Compiled Fri, 24 May 2019 20:28:31 UTC
 *
 * pixi-sound is licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI=this.PIXI||{},this.PIXI.sound=function(t,e,n,o){"use strict";var i=function(){function t(t,e){this._output=e,this._input=t}return Object.defineProperty(t.prototype,"destination",{get:function(){return this._input},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filters",{get:function(){return this._filters},set:function(t){var e=this;if(this._filters&&(this._filters.forEach(function(t){t&&t.disconnect()}),this._filters=null,this._input.connect(this._output)),t&&t.length){this._filters=t.slice(0),this._input.disconnect();var n=null;t.forEach(function(t){null===n?e._input.connect(t.destination):n.connect(t.destination),n=t}),n.connect(this._output)}},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){this.filters=null,this._input=null,this._output=null},t}(),r=function(){function t(t,e){this.init(t,e)}return t.prototype.init=function(t,e){this.destination=t,this.source=e||t},t.prototype.connect=function(t){this.source.connect(t)},t.prototype.disconnect=function(){this.source.disconnect()},t.prototype.destroy=function(){this.disconnect(),this.destination=null,this.source=null},t}(),s=function(t,e){return(s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function u(t,e){function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var a,c=function(){return(c=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function p(){return a}var h=function(){function t(){}return t.setParamValue=function(t,e){if(t.setValueAtTime){var n=p().context;t.setValueAtTime(e,n.audioContext.currentTime)}else t.value=e;return e},t}(),l=0,f=function(t){function n(e){var n=t.call(this)||this;return n.id=l++,n._media=null,n._paused=!1,n._muted=!1,n._elapsed=0,n.init(e),n}return u(n,t),n.prototype.set=function(t,e){if(void 0===this[t])throw new Error("Property with name "+t+" does not exist.");return this[t]=e,this},n.prototype.stop=function(){this._source&&(this._internalStop(),this.emit("stop"))},Object.defineProperty(n.prototype,"speed",{get:function(){return this._speed},set:function(t){this._speed=t,this.refresh(),this._update(!0)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"volume",{get:function(){return this._volume},set:function(t){this._volume=t,this.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"muted",{get:function(){return this._muted},set:function(t){this._muted=t,this.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"loop",{get:function(){return this._loop},set:function(t){this._loop=t,this.refresh()},enumerable:!0,configurable:!0}),n.prototype.refresh=function(){if(this._source){var t=this._media.context,e=this._media.parent;this._source.loop=this._loop||e.loop;var n=t.volume*(t.muted?0:1),o=e.volume*(e.muted?0:1),i=this._volume*(this._muted?0:1);h.setParamValue(this._gain.gain,i*o*n),h.setParamValue(this._source.playbackRate,this._speed*e.speed*t.speed)}},n.prototype.refreshPaused=function(){var t=this._media.context,e=this._media.parent,n=this._paused||e.paused||t.paused;n!==this._pausedReal&&(this._pausedReal=n,n?(this._internalStop(),this.emit("paused")):(this.emit("resumed"),this.play({start:this._elapsed%this._duration,end:this._end,speed:this._speed,loop:this._loop,volume:this._volume})),this.emit("pause",n))},n.prototype.play=function(t){var e=t.start,n=t.end,o=t.speed,i=t.loop,r=t.volume,s=t.muted;this._paused=!1;var u=this._media.nodes.cloneBufferSource(),a=u.source,c=u.gain;this._source=a,this._gain=c,this._speed=o,this._volume=r,this._loop=!!i,this._muted=s,this.refresh();var p=this._source.buffer.duration;this._duration=p,this._end=n,this._lastUpdate=this._now(),this._elapsed=e,this._source.onended=this._onComplete.bind(this),this._loop?(this._source.loopEnd=n,this._source.loopStart=e,this._source.start(0,e)):n?this._source.start(0,e,n-e):this._source.start(0,e),this.emit("start"),this._update(!0),this._enabled=!0},n.prototype._toSec=function(t){return t>10&&(t/=1e3),t||0},Object.defineProperty(n.prototype,"_enabled",{set:function(t){e.Ticker.shared.remove(this._updateListener,this),t&&e.Ticker.shared.add(this._updateListener,this)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"progress",{get:function(){return this._progress},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"paused",{get:function(){return this._paused},set:function(t){this._paused=t,this.refreshPaused()},enumerable:!0,configurable:!0}),n.prototype.destroy=function(){this.removeAllListeners(),this._internalStop(),this._gain&&(this._gain.disconnect(),this._gain=null),this._media&&(this._media.context.events.off("refresh",this.refresh,this),this._media.context.events.off("refreshPaused",this.refreshPaused,this),this._media=null),this._end=null,this._speed=1,this._volume=1,this._loop=!1,this._elapsed=0,this._duration=0,this._paused=!1,this._muted=!1,this._pausedReal=!1},n.prototype.toString=function(){return"[WebAudioInstance id="+this.id+"]"},n.prototype._now=function(){return this._media.context.audioContext.currentTime},n.prototype._updateListener=function(){this._update()},n.prototype._update=function(t){if(void 0===t&&(t=!1),this._source){var e=this._now(),n=e-this._lastUpdate;if(n>0||t){var o=this._source.playbackRate.value;this._elapsed+=n*o,this._lastUpdate=e;var i=this._duration,r=void 0;if(this._source.loopStart){var s=this._source.loopEnd-this._source.loopStart;r=(this._source.loopStart+this._elapsed%s)/i}else r=this._elapsed%i/i;this._progress=r,this.emit("progress",this._progress,i)}}},n.prototype.init=function(t){this._media=t,t.context.events.on("refresh",this.refresh,this),t.context.events.on("refreshPaused",this.refreshPaused,this)},n.prototype._internalStop=function(){this._source&&(this._enabled=!1,this._source.onended=null,this._source.stop(0),this._source.disconnect(),this._source=null)},n.prototype._onComplete=function(){this._source&&(this._enabled=!1,this._source.onended=null,this._source.disconnect()),this._source=null,this._progress=1,this.emit("progress",1,this._duration),this.emit("end",this)},n}(n.EventEmitter),d=function(t){function e(e){var n=this,o=e.audioContext,i=o.createBufferSource(),r=o.createGain(),s=o.createAnalyser();return i.connect(s),s.connect(r),r.connect(e.destination),(n=t.call(this,s,r)||this).context=e,n.bufferSource=i,n.gain=r,n.analyser=s,n}return u(e,t),Object.defineProperty(e.prototype,"script",{get:function(){return this._script||(this._script=this.context.audioContext.createScriptProcessor(e.BUFFER_SIZE),this._script.connect(this.context.destination)),this._script},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){t.prototype.destroy.call(this),this.bufferSource.disconnect(),this._script&&this._script.disconnect(),this.gain.disconnect(),this.analyser.disconnect(),this.bufferSource=null,this._script=null,this.gain=null,this.analyser=null,this.context=null},e.prototype.cloneBufferSource=function(){var t=this.bufferSource,e=this.context.audioContext.createBufferSource();e.buffer=t.buffer,h.setParamValue(e.playbackRate,t.playbackRate.value),e.loop=t.loop;var n=this.context.audioContext.createGain();return e.connect(n),n.connect(this.destination),{source:e,gain:n}},Object.defineProperty(e.prototype,"bufferSize",{get:function(){return this.script.bufferSize},enumerable:!0,configurable:!0}),e.BUFFER_SIZE=0,e}(i),_=function(){function t(){}return t.prototype.init=function(t){this.parent=t,this._nodes=new d(this.context),this._source=this._nodes.bufferSource,this.source=t.options.source},t.prototype.destroy=function(){this.parent=null,this._nodes.destroy(),this._nodes=null,this._source=null,this.source=null},t.prototype.create=function(){return new f(this)},Object.defineProperty(t.prototype,"context",{get:function(){return this.parent.context},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isPlayable",{get:function(){return!!this._source&&!!this._source.buffer},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filters",{get:function(){return this._nodes.filters},set:function(t){this._nodes.filters=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"duration",{get:function(){return this._source.buffer.duration},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"buffer",{get:function(){return this._source.buffer},set:function(t){this._source.buffer=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"nodes",{get:function(){return this._nodes},enumerable:!0,configurable:!0}),t.prototype.load=function(t){this.source?this._decode(this.source,t):this.parent.url?this._loadUrl(t):t&&t(new Error("sound.url or sound.source must be set"))},t.prototype._loadUrl=function(t){var e=this,n=new XMLHttpRequest,o=this.parent.url;n.open("GET",o,!0),n.responseType="arraybuffer",n.onload=function(){e.source=n.response,e._decode(n.response,t)},n.send()},t.prototype._decode=function(t,e){var n=this;this.parent.context.decode(t,function(t,o){if(t)e&&e(t);else{n.parent.isLoaded=!0,n.buffer=o;var i=n.parent.autoPlayStart();e&&e(null,n.parent,i)}})},t}(),y=function(t){function e(){var o=this,i=window,r=new e.AudioContext,s=r.createDynamicsCompressor(),u=r.createAnalyser();return u.connect(s),s.connect(r.destination),(o=t.call(this,u,s)||this)._ctx=r,o._offlineCtx=new e.OfflineAudioContext(1,2,i.OfflineAudioContext?r.sampleRate:44100),o._unlocked=!1,o.compressor=s,o.analyser=u,o.events=new n.EventEmitter,o.volume=1,o.speed=1,o.muted=!1,o.paused=!1,"running"!==r.state&&(o._unlock(),o._unlock=o._unlock.bind(o),document.addEventListener("mousedown",o._unlock,!0),document.addEventListener("touchstart",o._unlock,!0),document.addEventListener("touchend",o._unlock,!0)),o}return u(e,t),e.prototype._unlock=function(){this._unlocked||(this.playEmptySound(),"running"===this._ctx.state&&(document.removeEventListener("mousedown",this._unlock,!0),document.removeEventListener("touchend",this._unlock,!0),document.removeEventListener("touchstart",this._unlock,!0),this._unlocked=!0))},e.prototype.playEmptySound=function(){var t=this._ctx.createBufferSource();t.buffer=this._ctx.createBuffer(1,1,22050),t.connect(this._ctx.destination),t.start(0,0,0),"suspended"===t.context.state&&t.context.resume()},Object.defineProperty(e,"AudioContext",{get:function(){var t=window;return t.AudioContext||t.webkitAudioContext||null},enumerable:!0,configurable:!0}),Object.defineProperty(e,"OfflineAudioContext",{get:function(){var t=window;return t.OfflineAudioContext||t.webkitOfflineAudioContext||null},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){t.prototype.destroy.call(this);var e=this._ctx;void 0!==e.close&&e.close(),this.events.removeAllListeners(),this.analyser.disconnect(),this.compressor.disconnect(),this.analyser=null,this.compressor=null,this.events=null,this._offlineCtx=null,this._ctx=null},Object.defineProperty(e.prototype,"audioContext",{get:function(){return this._ctx},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"offlineContext",{get:function(){return this._offlineCtx},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"paused",{get:function(){return this._paused},set:function(t){t&&"running"===this._ctx.state?this._ctx.suspend():t||"suspended"!==this._ctx.state||this._ctx.resume(),this._paused=t},enumerable:!0,configurable:!0}),e.prototype.refresh=function(){this.events.emit("refresh")},e.prototype.refreshPaused=function(){this.events.emit("refreshPaused")},e.prototype.toggleMute=function(){return this.muted=!this.muted,this.refresh(),this.muted},e.prototype.togglePause=function(){return this.paused=!this.paused,this.refreshPaused(),this._paused},e.prototype.decode=function(t,e){this._offlineCtx.decodeAudioData(t,function(t){e(null,t)},function(t){e(new Error(t.message||"Unable to decode file"))})},e}(i),m={WebAudioMedia:_,WebAudioInstance:f,WebAudioNodes:d,WebAudioContext:y,WebAudioUtils:h},g={Filter:r,EqualizerFilter:function(t){function e(n,o,i,r,s,u,a,c,l,f){void 0===n&&(n=0),void 0===o&&(o=0),void 0===i&&(i=0),void 0===r&&(r=0),void 0===s&&(s=0),void 0===u&&(u=0),void 0===a&&(a=0),void 0===c&&(c=0),void 0===l&&(l=0),void 0===f&&(f=0);var d=this;if(!p().useLegacy){var _=[{f:e.F32,type:"lowshelf",gain:n},{f:e.F64,type:"peaking",gain:o},{f:e.F125,type:"peaking",gain:i},{f:e.F250,type:"peaking",gain:r},{f:e.F500,type:"peaking",gain:s},{f:e.F1K,type:"peaking",gain:u},{f:e.F2K,type:"peaking",gain:a},{f:e.F4K,type:"peaking",gain:c},{f:e.F8K,type:"peaking",gain:l},{f:e.F16K,type:"highshelf",gain:f}].map(function(t){var e=p().context.audioContext.createBiquadFilter();return e.type=t.type,h.setParamValue(e.Q,1),e.frequency.value=t.f,h.setParamValue(e.gain,t.gain),e});(d=t.call(this,_[0],_[_.length-1])||this).bands=_,d.bandsMap={};for(var y=0;y<d.bands.length;y++){var m=d.bands[y];y>0&&d.bands[y-1].connect(m),d.bandsMap[m.frequency.value]=m}return d}d=t.call(this,null)||this}return u(e,t),e.prototype.setGain=function(t,e){if(void 0===e&&(e=0),!this.bandsMap[t])throw new Error("No band found for frequency "+t);h.setParamValue(this.bandsMap[t].gain,e)},e.prototype.getGain=function(t){if(!this.bandsMap[t])throw new Error("No band found for frequency "+t);return this.bandsMap[t].gain.value},Object.defineProperty(e.prototype,"f32",{get:function(){return this.getGain(e.F32)},set:function(t){this.setGain(e.F32,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f64",{get:function(){return this.getGain(e.F64)},set:function(t){this.setGain(e.F64,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f125",{get:function(){return this.getGain(e.F125)},set:function(t){this.setGain(e.F125,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f250",{get:function(){return this.getGain(e.F250)},set:function(t){this.setGain(e.F250,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f500",{get:function(){return this.getGain(e.F500)},set:function(t){this.setGain(e.F500,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f1k",{get:function(){return this.getGain(e.F1K)},set:function(t){this.setGain(e.F1K,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f2k",{get:function(){return this.getGain(e.F2K)},set:function(t){this.setGain(e.F2K,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f4k",{get:function(){return this.getGain(e.F4K)},set:function(t){this.setGain(e.F4K,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f8k",{get:function(){return this.getGain(e.F8K)},set:function(t){this.setGain(e.F8K,t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"f16k",{get:function(){return this.getGain(e.F16K)},set:function(t){this.setGain(e.F16K,t)},enumerable:!0,configurable:!0}),e.prototype.reset=function(){this.bands.forEach(function(t){h.setParamValue(t.gain,0)})},e.prototype.destroy=function(){this.bands.forEach(function(t){t.disconnect()}),this.bands=null,this.bandsMap=null},e.F32=32,e.F64=64,e.F125=125,e.F250=250,e.F500=500,e.F1K=1e3,e.F2K=2e3,e.F4K=4e3,e.F8K=8e3,e.F16K=16e3,e}(r),DistortionFilter:function(t){function e(e){void 0===e&&(e=0);var n=this;if(!p().useLegacy){var o=p().context.audioContext.createWaveShaper();return(n=t.call(this,o)||this)._distortion=o,n.amount=e,n}n=t.call(this,null)||this}return u(e,t),Object.defineProperty(e.prototype,"amount",{get:function(){return this._amount},set:function(t){t*=1e3,this._amount=t;for(var e,n=new Float32Array(44100),o=Math.PI/180,i=0;i<44100;++i)e=2*i/44100-1,n[i]=(3+t)*e*20*o/(Math.PI+t*Math.abs(e));this._distortion.curve=n,this._distortion.oversample="4x"},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this._distortion=null,t.prototype.destroy.call(this)},e}(r),StereoFilter:function(t){function e(e){void 0===e&&(e=0);var n=this;if(!p().useLegacy){var o,i,r,s=p().context.audioContext;return s.createStereoPanner?r=o=s.createStereoPanner():((i=s.createPanner()).panningModel="equalpower",r=i),(n=t.call(this,r)||this)._stereo=o,n._panner=i,n.pan=e,n}n=t.call(this,null)||this}return u(e,t),Object.defineProperty(e.prototype,"pan",{get:function(){return this._pan},set:function(t){this._pan=t,this._stereo?h.setParamValue(this._stereo.pan,t):this._panner.setPosition(t,0,1-Math.abs(t))},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){t.prototype.destroy.call(this),this._stereo=null,this._panner=null},e}(r),ReverbFilter:function(t){function e(e,n,o){void 0===e&&(e=3),void 0===n&&(n=2),void 0===o&&(o=!1);var i=this;if(!p().useLegacy)return(i=t.call(this,null)||this)._seconds=i._clamp(e,1,50),i._decay=i._clamp(n,0,100),i._reverse=o,i._rebuild(),i;i=t.call(this,null)||this}return u(e,t),e.prototype._clamp=function(t,e,n){return Math.min(n,Math.max(e,t))},Object.defineProperty(e.prototype,"seconds",{get:function(){return this._seconds},set:function(t){this._seconds=this._clamp(t,1,50),this._rebuild()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"decay",{get:function(){return this._decay},set:function(t){this._decay=this._clamp(t,0,100),this._rebuild()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"reverse",{get:function(){return this._reverse},set:function(t){this._reverse=t,this._rebuild()},enumerable:!0,configurable:!0}),e.prototype._rebuild=function(){for(var t,e=p().context.audioContext,n=e.sampleRate,o=n*this._seconds,i=e.createBuffer(2,o,n),r=i.getChannelData(0),s=i.getChannelData(1),u=0;u<o;u++)t=this._reverse?o-u:u,r[u]=(2*Math.random()-1)*Math.pow(1-t/o,this._decay),s[u]=(2*Math.random()-1)*Math.pow(1-t/o,this._decay);var a=p().context.audioContext.createConvolver();a.buffer=i,this.init(a)},e}(r),MonoFilter:function(t){function e(){var e=this;if(!p().useLegacy){var n=p().context.audioContext,o=n.createChannelSplitter(),i=n.createChannelMerger();return i.connect(o),(e=t.call(this,i,o)||this)._merger=i,e}e=t.call(this,null)||this}return u(e,t),e.prototype.destroy=function(){this._merger.disconnect(),this._merger=null,t.prototype.destroy.call(this)},e}(r),TelephoneFilter:function(t){function e(){if(!p().useLegacy){var e=p().context.audioContext,n=e.createBiquadFilter(),o=e.createBiquadFilter(),i=e.createBiquadFilter(),r=e.createBiquadFilter();return n.type="lowpass",h.setParamValue(n.frequency,2e3),o.type="lowpass",h.setParamValue(o.frequency,2e3),i.type="highpass",h.setParamValue(i.frequency,500),r.type="highpass",h.setParamValue(r.frequency,500),n.connect(o),o.connect(i),i.connect(r),t.call(this,n,r)||this}t.call(this,null)}return u(e,t),e}(r)},b=0,v=function(t){function n(e){var n=t.call(this)||this;return n.id=b++,n.init(e),n}return u(n,t),n.prototype.set=function(t,e){if(void 0===this[t])throw new Error("Property with name "+t+" does not exist.");return this[t]=e,this},Object.defineProperty(n.prototype,"progress",{get:function(){return this._source.currentTime/this._duration},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"paused",{get:function(){return this._paused},set:function(t){this._paused=t,this.refreshPaused()},enumerable:!0,configurable:!0}),n.prototype._onPlay=function(){this._playing=!0},n.prototype._onPause=function(){this._playing=!1},n.prototype.init=function(t){this._playing=!1,this._duration=t.source.duration;var e=this._source=t.source.cloneNode(!1);e.src=t.parent.url,e.onplay=this._onPlay.bind(this),e.onpause=this._onPause.bind(this),t.context.on("refresh",this.refresh,this),t.context.on("refreshPaused",this.refreshPaused,this),this._media=t},n.prototype._internalStop=function(){this._source&&this._playing&&(this._source.onended=null,this._source.pause())},n.prototype.stop=function(){this._internalStop(),this._source&&this.emit("stop")},Object.defineProperty(n.prototype,"speed",{get:function(){return this._speed},set:function(t){this._speed=t,this.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"volume",{get:function(){return this._volume},set:function(t){this._volume=t,this.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"loop",{get:function(){return this._loop},set:function(t){this._loop=t,this.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"muted",{get:function(){return this._muted},set:function(t){this._muted=t,this.refresh()},enumerable:!0,configurable:!0}),n.prototype.refresh=function(){var t=this._media.context,e=this._media.parent;this._source.loop=this._loop||e.loop;var n=t.volume*(t.muted?0:1),o=e.volume*(e.muted?0:1),i=this._volume*(this._muted?0:1);this._source.volume=i*n*o,this._source.playbackRate=this._speed*t.speed*e.speed},n.prototype.refreshPaused=function(){var t=this._media.context,e=this._media.parent,n=this._paused||e.paused||t.paused;n!==this._pausedReal&&(this._pausedReal=n,n?(this._internalStop(),this.emit("paused")):(this.emit("resumed"),this.play({start:this._source.currentTime,end:this._end,volume:this._volume,speed:this._speed,loop:this._loop})),this.emit("pause",n))},n.prototype.play=function(t){var o=this,i=t.start,r=t.end,s=t.speed,u=t.loop,a=t.volume,c=t.muted;this._speed=s,this._volume=a,this._loop=!!u,this._muted=c,this.refresh(),this.loop&&null!==r&&(this.loop=!1),this._start=i,this._end=r||this._duration,this._start=Math.max(0,this._start-n.PADDING),this._end=Math.min(this._end+n.PADDING,this._duration),this._source.onloadedmetadata=function(){o._source&&(o._source.currentTime=i,o._source.onloadedmetadata=null,o.emit("progress",i,o._duration),e.Ticker.shared.add(o._onUpdate,o))},this._source.onended=this._onComplete.bind(this),this._source.play(),this.emit("start")},n.prototype._onUpdate=function(){this.emit("progress",this.progress,this._duration),this._source.currentTime>=this._end&&!this._source.loop&&this._onComplete()},n.prototype._onComplete=function(){e.Ticker.shared.remove(this._onUpdate,this),this._internalStop(),this.emit("progress",1,this._duration),this.emit("end",this)},n.prototype.destroy=function(){e.Ticker.shared.remove(this._onUpdate,this),this.removeAllListeners();var t=this._source;t&&(t.onended=null,t.onplay=null,t.onpause=null,this._internalStop()),this._source=null,this._speed=1,this._volume=1,this._loop=!1,this._end=null,this._start=0,this._duration=0,this._playing=!1,this._pausedReal=!1,this._paused=!1,this._muted=!1,this._media&&(this._media.context.off("refresh",this.refresh,this),this._media.context.off("refreshPaused",this.refreshPaused,this),this._media=null)},n.prototype.toString=function(){return"[HTMLAudioInstance id="+this.id+"]"},n.PADDING=.1,n}(n.EventEmitter),P=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return u(e,t),e.prototype.init=function(t){this.parent=t,this._source=t.options.source||new Audio,t.url&&(this._source.src=t.url)},e.prototype.create=function(){return new v(this)},Object.defineProperty(e.prototype,"isPlayable",{get:function(){return!!this._source&&4===this._source.readyState},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"duration",{get:function(){return this._source.duration},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"context",{get:function(){return this.parent.context},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"filters",{get:function(){return null},set:function(t){},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this.removeAllListeners(),this.parent=null,this._source&&(this._source.src="",this._source.load(),this._source=null)},Object.defineProperty(e.prototype,"source",{get:function(){return this._source},enumerable:!0,configurable:!0}),e.prototype.load=function(t){var e=this._source,n=this.parent;if(4!==e.readyState){if(!n.url)return t(new Error("sound.url or sound.source must be set"));e.src=n.url;var o=function(){e.removeEventListener("canplaythrough",i),e.removeEventListener("load",i),e.removeEventListener("abort",r),e.removeEventListener("error",s)},i=function(){o(),n.isLoaded=!0;var e=n.autoPlayStart();t&&t(null,n,e)},r=function(){o(),t&&t(new Error("Sound loading has been aborted"))},s=function(){o();var n="Failed to load audio element (code: "+e.error.code+")";t&&t(new Error(n))};e.addEventListener("canplaythrough",i,!1),e.addEventListener("load",i,!1),e.addEventListener("abort",r,!1),e.addEventListener("error",s,!1),e.load()}else{n.isLoaded=!0;var u=n.autoPlayStart();t&&setTimeout(function(){t(null,n,u)},0)}},e}(n.EventEmitter),x=function(t){function e(){var e=t.call(this)||this;return e.speed=1,e.volume=1,e.muted=!1,e.paused=!1,e}return u(e,t),e.prototype.refresh=function(){this.emit("refresh")},e.prototype.refreshPaused=function(){this.emit("refreshPaused")},Object.defineProperty(e.prototype,"filters",{get:function(){return null},set:function(t){},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"audioContext",{get:function(){return null},enumerable:!0,configurable:!0}),e.prototype.toggleMute=function(){return this.muted=!this.muted,this.refresh(),this.muted},e.prototype.togglePause=function(){return this.paused=!this.paused,this.refreshPaused(),this.paused},e.prototype.destroy=function(){this.removeAllListeners()},e}(n.EventEmitter),O={HTMLAudioMedia:P,HTMLAudioInstance:v,HTMLAudioContext:x},j=["mp3","ogg","oga","opus","mpeg","wav","m4a","aiff","wma","mid"];var E,w,A,L,F=(E={m4a:"mp4",oga:"ogg"},w=document.createElement("audio"),A={},L=/^no$/,j.forEach(function(t){var e=E[t]||t,n=w.canPlayType("audio/"+t).replace(L,""),o=w.canPlayType("audio/"+e).replace(L,"");A[t]=!!n||!!o}),Object.freeze(A)),C=/\.(\{([^\}]+)\})(\?.*)?$/;function S(t){var e=C,n="string"==typeof t?t:t.url;if(e.test(n)){for(var o=e.exec(n),i=o[2].split(","),r=i[i.length-1],s=0,u=i.length;s<u;s++){var a=i[s];if(F[a]){r=a;break}}var c=n.replace(o[1],r);return"string"!=typeof t&&(t.extension=r,t.url=c),c}return n}var I=function(){function e(){}return e.add=function(){e.legacy=p().useLegacy},Object.defineProperty(e,"legacy",{set:function(e){var n=j;e?n.forEach(function(e){t.LoaderResource.setExtensionXhrType(e,t.LoaderResource.XHR_RESPONSE_TYPE.DEFAULT),t.LoaderResource.setExtensionLoadType(e,t.LoaderResource.LOAD_TYPE.AUDIO)}):n.forEach(function(e){t.LoaderResource.setExtensionXhrType(e,t.LoaderResource.XHR_RESPONSE_TYPE.BUFFER),t.LoaderResource.setExtensionLoadType(e,t.LoaderResource.LOAD_TYPE.XHR)})},enumerable:!0,configurable:!0}),e.pre=function(t,e){S(t),e()},e.use=function(t,e){t.data&&j.indexOf(t.extension)>-1?t.sound=p().add(t.name,{loaded:e,preload:!0,url:t.url,source:t.data}):e()},e}(),k=function(){function t(t,e){this.parent=t,Object.assign(this,e),this.duration=this.end-this.start}return t.prototype.play=function(t){return this.parent.play({complete:t,speed:this.speed||this.parent.speed,end:this.end,start:this.start,loop:this.loop})},t.prototype.destroy=function(){this.parent=null},t}(),M=function(){function t(t,e){this.media=t,this.options=e,this._instances=[],this._sprites={},this.media.init(this);var n=e.complete;this._autoPlayOptions=n?{complete:n}:null,this.isLoaded=!1,this.isPlaying=!1,this.autoPlay=e.autoPlay,this.singleInstance=e.singleInstance,this.preload=e.preload||this.autoPlay,this.url=e.url,this.speed=e.speed,this.volume=e.volume,this.loop=e.loop,e.sprites&&this.addSprites(e.sprites),this.preload&&this._preload(e.loaded)}return t.from=function(e){var n={};return"string"==typeof e?n.url=e:e instanceof ArrayBuffer||e instanceof HTMLAudioElement?n.source=e:n=e,(n=c({autoPlay:!1,singleInstance:!1,url:null,source:null,preload:!1,volume:1,speed:1,complete:null,loaded:null,loop:!1},n)).url&&(n.url=S(n.url)),Object.freeze(n),new t(p().useLegacy?new P:new _,n)},Object.defineProperty(t.prototype,"context",{get:function(){return p().context},enumerable:!0,configurable:!0}),t.prototype.pause=function(){return this.isPlaying=!1,this.paused=!0,this},t.prototype.resume=function(){return this.isPlaying=this._instances.length>0,this.paused=!1,this},Object.defineProperty(t.prototype,"paused",{get:function(){return this._paused},set:function(t){this._paused=t,this.refreshPaused()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"speed",{get:function(){return this._speed},set:function(t){this._speed=t,this.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filters",{get:function(){return this.media.filters},set:function(t){this.media.filters=t},enumerable:!0,configurable:!0}),t.prototype.addSprites=function(t,e){if("object"==typeof t){var n={};for(var o in t)n[o]=this.addSprites(o,t[o]);return n}if("string"==typeof t){var i=new k(this,e);return this._sprites[t]=i,i}},t.prototype.destroy=function(){this._removeInstances(),this.removeSprites(),this.media.destroy(),this.media=null,this._sprites=null,this._instances=null},t.prototype.removeSprites=function(t){if(t){var e=this._sprites[t];void 0!==e&&(e.destroy(),delete this._sprites[t])}else for(var n in this._sprites)this.removeSprites(n);return this},Object.defineProperty(t.prototype,"isPlayable",{get:function(){return this.isLoaded&&this.media&&this.media.isPlayable},enumerable:!0,configurable:!0}),t.prototype.stop=function(){if(!this.isPlayable)return this.autoPlay=!1,this._autoPlayOptions=null,this;this.isPlaying=!1;for(var t=this._instances.length-1;t>=0;t--)this._instances[t].stop();return this},t.prototype.play=function(t,e){var n,o=this;"string"==typeof t?n={sprite:r=t,loop:this.loop,complete:e}:"function"==typeof t?(n={}).complete=t:n=t;if((n=c({complete:null,loaded:null,sprite:null,end:null,start:0,volume:1,speed:1,muted:!1,loop:!1},n||{})).sprite){var i=n.sprite,r=this._sprites[i];n.start=r.start,n.end=r.end,n.speed=r.speed||1,n.loop=r.loop||n.loop,delete n.sprite}if(n.offset&&(n.start=n.offset),!this.isLoaded)return new Promise(function(t,e){o.autoPlay=!0,o._autoPlayOptions=n,o._preload(function(o,i,r){o?e(o):(n.loaded&&n.loaded(o,i,r),t(r))})});this.singleInstance&&this._removeInstances();var s=this._createInstance();return this._instances.push(s),this.isPlaying=!0,s.once("end",function(){n.complete&&n.complete(o),o._onComplete(s)}),s.once("stop",function(){o._onComplete(s)}),s.play(n),s},t.prototype.refresh=function(){for(var t=this._instances.length,e=0;e<t;e++)this._instances[e].refresh()},t.prototype.refreshPaused=function(){for(var t=this._instances.length,e=0;e<t;e++)this._instances[e].refreshPaused()},Object.defineProperty(t.prototype,"volume",{get:function(){return this._volume},set:function(t){this._volume=t,this.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"muted",{get:function(){return this._muted},set:function(t){this._muted=t,this.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"loop",{get:function(){return this._loop},set:function(t){this._loop=t,this.refresh()},enumerable:!0,configurable:!0}),t.prototype._preload=function(t){this.media.load(t)},Object.defineProperty(t.prototype,"instances",{get:function(){return this._instances},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"sprites",{get:function(){return this._sprites},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"duration",{get:function(){return this.media.duration},enumerable:!0,configurable:!0}),t.prototype.autoPlayStart=function(){var t;return this.autoPlay&&(t=this.play(this._autoPlayOptions)),t},t.prototype._removeInstances=function(){for(var t=this._instances.length-1;t>=0;t--)this._poolInstance(this._instances[t]);this._instances.length=0},t.prototype._onComplete=function(t){if(this._instances){var e=this._instances.indexOf(t);e>-1&&this._instances.splice(e,1),this.isPlaying=this._instances.length>0}this._poolInstance(t)},t.prototype._createInstance=function(){if(t._pool.length>0){var e=t._pool.pop();return e.init(this.media),e}return this.media.create()},t.prototype._poolInstance=function(e){e.destroy(),t._pool.indexOf(e)<0&&t._pool.push(e)},t._pool=[],t}(),T=function(){function t(){this.init()}return t.prototype.init=function(){return this.supported&&(this._webAudioContext=new y),this._htmlAudioContext=new x,this._sounds={},this.useLegacy=!this.supported,this},Object.defineProperty(t.prototype,"context",{get:function(){return this._context},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filtersAll",{get:function(){return this.useLegacy?[]:this._context.filters},set:function(t){this.useLegacy||(this._context.filters=t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"supported",{get:function(){return null!==y.AudioContext},enumerable:!0,configurable:!0}),t.prototype.add=function(t,e){if("object"==typeof t){var n={};for(var o in t){var i=this._getOptions(t[o],e);n[o]=this.add(o,i)}return n}if("string"==typeof t){if(e instanceof M)return this._sounds[t]=e,e;i=this._getOptions(e);var r=M.from(i);return this._sounds[t]=r,r}},t.prototype._getOptions=function(t,e){var n;return n="string"==typeof t?{url:t}:t instanceof ArrayBuffer||t instanceof HTMLAudioElement?{source:t}:t,n=c({},n,e||{})},Object.defineProperty(t.prototype,"useLegacy",{get:function(){return this._useLegacy},set:function(t){I.legacy=t,this._useLegacy=t,this._context=!t&&this.supported?this._webAudioContext:this._htmlAudioContext},enumerable:!0,configurable:!0}),t.prototype.remove=function(t){return this.exists(t,!0),this._sounds[t].destroy(),delete this._sounds[t],this},Object.defineProperty(t.prototype,"volumeAll",{get:function(){return this._context.volume},set:function(t){this._context.volume=t,this._context.refresh()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"speedAll",{get:function(){return this._context.speed},set:function(t){this._context.speed=t,this._context.refresh()},enumerable:!0,configurable:!0}),t.prototype.togglePauseAll=function(){return this._context.togglePause()},t.prototype.pauseAll=function(){return this._context.paused=!0,this._context.refreshPaused(),this},t.prototype.resumeAll=function(){return this._context.paused=!1,this._context.refreshPaused(),this},t.prototype.toggleMuteAll=function(){return this._context.toggleMute()},t.prototype.muteAll=function(){return this._context.muted=!0,this._context.refresh(),this},t.prototype.unmuteAll=function(){return this._context.muted=!1,this._context.refresh(),this},t.prototype.removeAll=function(){for(var t in this._sounds)this._sounds[t].destroy(),delete this._sounds[t];return this},t.prototype.stopAll=function(){for(var t in this._sounds)this._sounds[t].stop();return this},t.prototype.exists=function(t,e){return void 0===e&&(e=!1),!!this._sounds[t]},t.prototype.find=function(t){return this.exists(t,!0),this._sounds[t]},t.prototype.play=function(t,e){return this.find(t).play(e)},t.prototype.stop=function(t){return this.find(t).stop()},t.prototype.pause=function(t){return this.find(t).pause()},t.prototype.resume=function(t){return this.find(t).resume()},t.prototype.volume=function(t,e){var n=this.find(t);return void 0!==e&&(n.volume=e),n.volume},t.prototype.speed=function(t,e){var n=this.find(t);return void 0!==e&&(n.speed=e),n.speed},t.prototype.duration=function(t){return this.find(t).duration},t.prototype.close=function(){return this.removeAll(),this._sounds=null,this._webAudioContext&&(this._webAudioContext.destroy(),this._webAudioContext=null),this._htmlAudioContext&&(this._htmlAudioContext.destroy(),this._htmlAudioContext=null),this._context=null,this},t}(),R=0;var G={get PLAY_ID(){return R},playOnce:function(t,e){var n="alias"+R++;return p().add(n,{url:t,preload:!0,autoPlay:!0,loaded:function(t){t&&(p().remove(n),e&&e(t))},complete:function(){p().remove(n),e&&e(null)}}),n},render:function(t,e){var n=document.createElement("canvas");e=c({width:512,height:128,fill:"black"},e||{}),n.width=e.width,n.height=e.height;var i=o.BaseTexture.from(n);if(!(t.media instanceof _))return i;var r=t.media,s=n.getContext("2d");s.fillStyle=e.fill;for(var u=r.buffer.getChannelData(0),a=Math.ceil(u.length/e.width),p=e.height/2,h=0;h<e.width;h++){for(var l=1,f=-1,d=0;d<a;d++){var y=u[h*a+d];y<l&&(l=y),y>f&&(f=y)}s.fillRect(h,(1+l)*p,1,Math.max(1,(f-l)*p))}return i},resolveUrl:S,sineTone:function(t,e){void 0===t&&(t=200),void 0===e&&(e=1);var n=M.from({singleInstance:!0});if(!(n.media instanceof _))return n;for(var o=n.media,i=n.context.audioContext.createBuffer(1,48e3*e,48e3),r=i.getChannelData(0),s=0;s<r.length;s++){var u=t*(s/i.sampleRate)*Math.PI;r[s]=2*Math.sin(u)}return o.buffer=i,n.isLoaded=!0,n},extensions:j,supported:F},K=function(t){return a=t,t}(new T);return t.Loader.registerPlugin(I),Object.defineProperties(K,{Filterable:{get:function(){return i}},filters:{get:function(){return g}},htmlaudio:{get:function(){return O}},Sound:{get:function(){return M}},SoundLibrary:{get:function(){return T}},SoundSprite:{get:function(){return k}},utils:{get:function(){return G}},webaudio:{get:function(){return m}},sound:{get:function(){return K}}}),K}(PIXI,PIXI,PIXI.utils,PIXI);
//# sourceMappingURL=pixi-sound.js.map

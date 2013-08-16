var chain=function(){

	var callback = (arguments.length%2==0)?null:
		Array.prototype.splice.call(arguments, arguments.length-1)[0];

		alert(callback)
	var serie=[];
	var c=0;

	//Build functions
	for(var i=0;i<arguments.length;i=i+2){

		serie[c]={};
		var fn=arguments[i];
		var arg=arguments[i+1];
		fn.curry=function(arg){
			var m=this;
			return function(){
				var a=arg.concat(Array.prototype.slice.call(arguments));
				return m.apply(this, a);
			}
		}

		serie[c].cb=arg.splice(arg.length-1)[0];
		serie[c].fn=fn.curry(arg);
		c++;
	}


	//Chain callbacks to next initiator
	for(var i=0;i<(serie.length);i++){
		var cb=serie[i].cb;
		serie[i].cb=(i<(serie.length-1))?(function(i, cb){
			return function(arguments){
				cb.call(arguments);
				serie[i+1].fn.call(serie[i+1].fn,serie[i+1].cb);
			}
		})(i, cb)
		:(function(i, cb){
			return function(arguments){
				cb.call(arguments);
				callback.call();
			}
		})(callback,cb);
	}
	serie[0].fn.call(serie[0].fn,serie[0].cb);
}
